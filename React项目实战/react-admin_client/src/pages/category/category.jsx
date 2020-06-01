// 商品分类路由
import React, { Component } from 'react'

import { Table, Card, Button, message } from 'antd';

import { ArrowRightOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button/link-button'

import {reqCategorys} from '../../api/index'

export default class Category extends Component {
    state ={
        categorys:[],   //一级分类列表
        loading:false,  //是否正在获取数据
    }

    componentWillMount(){
        this.initColumns()
    }

    componentDidMount(){
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
              render:()=>(
                <span>
                    <LinkButton>修改分类</LinkButton>
                    <LinkButton>查看子分类</LinkButton>
                </span>
              )
            }
          ];
    }

    // 获取一级分类列表
    getCategorys= async ()=>{
        // 发出请求前，显示loading
        this.setState({loading:true})
        const result = await reqCategorys('0')
        // 请求完成后，隐藏loading
        this.setState({loading:false})
        console.log(result)
        if(result.status===0){
            const categorys = result.data
            this.setState({categorys})
        }else{
            message.error('获取分类列表失败')
        }
    }

    render() {
        // 读取状态数据
        const {categorys,loading} = this.state

        const title = '一级分类列表'
        const extra = (
            <Button type='primary'>
                <ArrowRightOutlined />添加
            </Button>
        )

        return (
            <div>
                <Card title={title} extra={extra}>
                    <Table 
                    dataSource={categorys}
                    columns={this.columns} 
                    pagination={{defaultPageSize:5,showQuickJumper:true}}
                    rowKey='_id'
                    loading={loading}
                    bordered/>
                </Card>
            </div>
        )
    }
}
