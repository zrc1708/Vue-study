// product的添加和更新的子路由组件+
import React, { Component } from 'react'
import {Card,Form,Input,Cascader,Upload,Button} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import LinkButton from '../../components/link-button/link-button'
import {reqCategorys} from '../../api/index'

const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 8 },
};

export default class ProductAddUpdate extends Component {
    formRef = React.createRef();

    state = {
        options:[],
    };

    submit =(values)=>{
        console.log('Success:', values);
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

    initOptions =(categorys)=>{
        // 根据categorys生成options数组
        const options = categorys.map(c=>({
            value: c._id,
            label: c.name,
            isLeaf: false,  //不是叶子
        }))
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

    componentDidMount(){
        this.getCategorys(0)
    }

    render() {

        const title=(
            <span>
                <LinkButton>
                    <ArrowLeftOutlined style={{fontSize:20}}/>
                </LinkButton>
                <span>添加商品</span>
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
                    initialValue='' 
                    rules={[
                        {required: true,message: '必须输入商品名称',},
                    ]}>
                        <Input placeholder="请输入商品名称" />
                    </Form.Item>
                    <Form.Item 
                    label="商品描述"
                    name="desc"
                    rules={[
                        {required: true,message: '必须输入商品描述',},
                    ]}>
                        <Input.TextArea placeholder="请输入商品描述" autoSize={{ minRows:2, maxRows: 6 }}/>
                    </Form.Item>
                    <Form.Item 
                    label="商品价格"
                    name="price"
                    validateFirst
                    rules={[
                        {required: true,message: '必须输入商品价格',},
                        {validator:this.validatorPrice}
                    ]}>
                        <Input type='number' placeholder="请输入商品价格" addonAfter='元'/>
                    </Form.Item>
                    <Form.Item label="商品分类">
                        <Cascader
                        options={this.state.options}
                        loadData={this.loadData}/>
                    </Form.Item>
                    <Form.Item label="商品图片">
                        <div>商品图片</div>
                    </Form.Item>
                    <Form.Item label="商品详情">
                        <div>商品详情</div>
                    </Form.Item>
                    <Form.Item >
                        <Button type='primary' htmlType="submit">提交</Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}
