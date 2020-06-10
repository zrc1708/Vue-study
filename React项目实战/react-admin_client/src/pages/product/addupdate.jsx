// product的添加和更新的子路由组件+
import React, { Component } from 'react'
import {Card,Form,Input,Cascader,Upload,Button,message} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import LinkButton from '../../components/link-button/link-button'
import {reqCategorys,reqAddOrUpdateProduct} from '../../api/index'
import PicturesWall from './pictures-wall'
import RichTextEditor from './rich-text-edit'

const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 8 },
};

export default class ProductAddUpdate extends Component {

    constructor(props){
        super(props)

        this.state = {
            options:[],
        };

        this.pw=React.createRef()
        this.editor = React.createRef()
    }

    formRef = React.createRef();


    submit = async (values)=>{
        // 收集数据，并封装成product对象
        const {name,desc,price,categoryIds} = values
        let pCategoryId,categoryId
        if(categoryIds.length ===1){
            pCategoryId = '0'
            categoryId = categoryIds[0]
        }else{
            pCategoryId = categoryIds[0]
            categoryId = categoryIds[1]
        }
        const imgs = this.pw.current.getImgs()
        const detail = this.editor.current.getDetail()
        const product = {name,desc,price,imgs,detail,pCategoryId,categoryId}
        // 如果是更新，需要添加id
        if(this.isUpdate){
            product._id=this.product._id
        }
        // 调用接口请求函数去添加、更新
        const result = await reqAddOrUpdateProduct(product)

        if(result.status === 0){
            message.success(`${this.isUpdate?'更新':'添加'}商品成功`)
            this.props.history.goBack()
        }else{
            message.error(`${this.isUpdate?'更新':'添加'}商品失败`)
        }
    }
    error=()=>{
        console.log('输入的信息有误')       
    }

    // 验证价格的自定义验证函数
    validatorPrice=(rule, value)=>{
        if(value*1>0){
            return Promise.resolve()
        }else{
            return Promise.reject('数字不合法')
        }
    }

    initOptions = async (categorys)=>{
        // 根据categorys生成options数组
        const options = categorys.map(c=>({
            value: c._id,
            label: c.name,
            isLeaf: false,  //不是叶子
        }))
        // 如果是一个二级分类的商品的更新
        const {isUpdate,product} = this
        const {pCategoryId,categoryId} = product
        if(isUpdate && pCategoryId!=="0"){
            // 获取对应的二级分类列表
            const subCategorys = await this.getCategorys(pCategoryId)
            // 生成二级下拉列表
            const childOptions = subCategorys.map(c=>({
                value: c._id,
                label: c.name,
                isLeaf: true
            }))
            // 找到当前商品对应的一级option对象
            const targetOption =  options.find(option => option.value === pCategoryId)
            // 关联到对应的一级option上
            targetOption.children = childOptions
        }

        this.setState({
            options
        })
    }

    // 获取一级、二级分类列表
    getCategorys =async (parentId)=>{
        const result = await reqCategorys(parentId)
        if(result.status===0){
            const categorys = result.data
            if(parentId===0){ 
                // 如果是一级分类
                this.initOptions(categorys)
            }else{
                return categorys
            }
        }
    }

    // 加载下一级列表
    loadData =  async selectedOptions => {
        // 得到选择的option对象
        const targetOption = selectedOptions[0];
        // 显示loading
        targetOption.loading = true;
        // 根据选中的分类，请求获取二级分类列表
        const subCategorys = await this.getCategorys(targetOption.value)
        // 隐藏loading
        targetOption.loading = false;
        if(subCategorys&&subCategorys.length>0){
            // 生成一个二级列表的options
            const childOptions = subCategorys.map(c=>({
                value: c._id,
                label: c.name,
                isLeaf: true
            }))
            // 关联到当前option上
            targetOption.children = childOptions
        }else{  
            //当前选中的分类没有二级分类
            targetOption.isLeaf = true
        }
        this.setState({
            options:[...this.state.options]
        })
    };

    componentWillMount(){
        // 取出携带的state
        const product = this.props.location.state
        // 保存是否是更新的标识
        this.isUpdate = !!product    //强制转换布尔类型
        this.product = product || {}
    }

    componentDidMount(){
        this.getCategorys(0)
    }

    render() {
        const {isUpdate,product} = this
        const {pCategoryId,categoryId,imgs,detail} = product
        // 用来接收级联分类ID的数组
        const categoryIds = []
        if(isUpdate){
            // 商品是一个一级分类商品
            if(pCategoryId===0){
                categoryIds.push(categoryId)
            }else{
                categoryIds.push(pCategoryId)
                categoryIds.push(categoryId)
            }
        }

        const title=(
            <span>
                <LinkButton onClick={()=>{this.props.history.goBack()}}>
                    <ArrowLeftOutlined style={{fontSize:20}}/>
                </LinkButton>
                <span>{isUpdate?'修改商品':'添加商品'}</span>
            </span>
        )

        return (
            <Card title={title}>
                <Form {...layout} 
                ref={this.formRef}
                onFinish={this.submit}
                onFinishFailed={this.error}>
                    <Form.Item 
                    label="商品名称" 
                    name='name' 
                    initialValue={product.name} 
                    rules={[
                        {required: true,message: '必须输入商品名称',},
                    ]}>
                        <Input placeholder="请输入商品名称" />
                    </Form.Item>
                    <Form.Item 
                    label="商品描述"
                    name="desc"
                    initialValue={product.desc} 
                    rules={[
                        {required: true,message: '必须输入商品描述',},
                    ]}>
                        <Input.TextArea placeholder="请输入商品描述" autoSize={{ minRows:2, maxRows: 6 }}/>
                    </Form.Item>
                    <Form.Item 
                    label="商品价格"
                    name="price"
                    initialValue={product.price} 
                    validateFirst
                    rules={[
                        {required: true,message: '必须输入商品价格',},
                        {validator:this.validatorPrice}
                    ]}>
                        <Input type='number' placeholder="请输入商品价格" addonAfter='元'/>
                    </Form.Item>
                    <Form.Item 
                    label="商品分类"
                    name="categoryIds"
                    initialValue={categoryIds}
                    rules={[
                        {required: true,message: '必须选择商品分类',},
                    ]}>
                        <Cascader
                        placeholder="请指定商品分类"
                        options={this.state.options}
                        loadData={this.loadData}/>
                    </Form.Item>
                    <Form.Item label="商品图片">
                        <PicturesWall ref={this.pw} imgs={imgs}></PicturesWall>
                    </Form.Item>
                    <Form.Item label="商品详情" labelCol={{span: 2}} wrapperCol={{span:20}}>
                        <RichTextEditor ref={this.editor} detail={detail}></RichTextEditor>
                    </Form.Item>
                    <Form.Item >
                        <Button type='primary' htmlType="submit">提交</Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}
