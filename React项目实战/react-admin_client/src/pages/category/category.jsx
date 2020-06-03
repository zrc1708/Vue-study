// 商品分类路由
import React, { Component } from 'react'

import { Table, Card, Button, message, Modal } from 'antd';

import { ArrowRightOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button/link-button'

import {reqCategorys,reqUpdateCategory,reqAddCategory} from '../../api/index'
import AddForm from './add-Form'
import UpdateForm from './update-Form'

export default class Category extends Component {
    state ={
        categorys:[],   //一级分类列表
        subcategorys:[],  //二级分类列表
        loading:false,  //是否正在获取数据
        parentId:'0',
        parentName:'',
        showStatus:0,   // 标识确认框是否显示，0：都不显示，1：显示添加，2：显示更新
    }

    componentWillMount(){
        this.initColumns()
    }

    componentDidMount(){
        // 获取一级分类列表
        this.getCategorys()
    }

    // 初始化table所有列
    initColumns = ()=>{
        this.columns = [
            {
              title: '分类的名称',
              dataIndex: 'name',
            },
            {
              title: '操作',
              width:300,
              render:(category)=>(
                <span>
                    <LinkButton onClick = {()=>this.showUpdate(category)}>修改分类</LinkButton>
                    {this.state.parentId==='0'?<LinkButton onClick={()=>{this.showSubCategorys(category)}}>查看子分类</LinkButton>:null}
                </span>
              )
            }
          ];
    }

    // 获取一级分类列表
    getCategorys= async ()=>{
        // 发出请求前，显示loading
        this.setState({loading:true})
        const result = await reqCategorys(this.state.parentId)
        // 请求完成后，隐藏loading
        this.setState({loading:false})
        // console.log(result)
        if(result.status===0){
            // 取出分类数组，可能是一级的也可能是二级的
            const categorys = result.data
            if(this.state.parentId==='0'){
                this.setState({categorys})
            }else{
                this.setState({subcategorys:categorys})
            }
        }else{
            message.error('获取分类列表失败')
        }
    }

    // 显示指定一级分类对象的二级子列表
    showSubCategorys=(category)=>{
        // 更新状态
        this.setState({
            parentId:category._id,
            parentName:category.name
        },()=>{
            this.getCategorys()  
        })
    }

    // 显示指定一级分类列表
    showCategorys=()=>{
        // 更新为显示一级列表的状态
        this.setState({
            parentId:'0',
            parentName:'',
            subcategorys:[]
        })

    }

    // 显示添加的对话框
    showadd=()=>{
        this.setState({
            showStatus:1
        })
    }
    showUpdate=(category)=>{
        // 保存分类对象
        this.category = category
        // 更新状态
        this.setState({
            showStatus:2
        })
    }

    // 对话框取消
    handleCancel=()=>{
        this.setState({
            showStatus:0
        })
    }

    // 添加分类
    addCategory=()=>{

    }

    // 更新分类
    updateCategory=async ()=>{
        // 隐藏确定框
        this.setState({
            showStatus:0
        })
        const categoryId = this.category._id
        const categoryName = this.form.categoryName
        // 清除输入

        // 发请求更新分类
        const result = await reqUpdateCategory(categoryId,categoryName)
        console.log(result)
        if(result.status===0){
            // 重新渲染列表
            this.getCategorys()
        }
    }

    render() {
        // 读取状态数据
        const {categorys,loading,subcategorys,parentId,parentName,showStatus} = this.state
        // 读取指定的分类
        const category = this.category || {}

        const title = parentId==='0'?'一级分类列表':(
            <span>
                <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
                <ArrowRightOutlined style={{marginRight:10}}/>
                <span>{parentName}</span>
            </span>
        )
        const extra = (
            <Button type='primary' onClick={this.showadd}>
                <ArrowRightOutlined />添加
            </Button>
        )

        return (
            <div>
                <Card title={title} extra={extra}>
                    <Table 
                    dataSource={parentId==='0'?categorys:subcategorys}
                    columns={this.columns} 
                    pagination={{defaultPageSize:5,showQuickJumper:true}}
                    rowKey='_id'
                    loading={loading}
                    bordered/>
                </Card>

                <Modal
                title="添加分类"
                visible={showStatus===1}
                onOk={this.addCategory}
                onCancel={this.handleCancel}
                >
                    <AddForm 
                    categorys={categorys} 
                    parentId={parentId}
                    setForm={(form)=>{this.form = form}}></AddForm>
                </Modal>

                <Modal
                title="更新分类"
                visible={showStatus===2}
                onOk={this.updateCategory}
                onCancel={this.handleCancel}
                >
                    <UpdateForm 
                    categoryName={category.name} 
                    modalVisible={showStatus===2?true:false} 
                    setForm={(form)=>{this.form = form}}
                    ></UpdateForm>
                </Modal>
            </div>
        )
    }
}
