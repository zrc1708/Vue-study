// 添加分类的form组件
import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import {Form,Input} from 'antd'

export default class UpdateForm extends Component {

    // static PropTypes={
    //     categoryName: PropTypes.string.isRequired
    //     setForm:PropTypes.func.isRequired
    // }

    // componentWillMount(){
    //     // 将表单通过setForm传递给父组件
    //     this.props.setForm(123)
    // }
    state={
        Visible:true
    }

    changes=(changedValues, allValues)=>{
        this.props.setForm(allValues)
    }

    render() {
        const {categoryName} = this.props
        // 控制表单动态更新
        const {modalVisible} = this.props
        return (
            modalVisible&&<Form
            onValuesChange={this.changes}
            >
                <Form.Item name="categoryName" initialValue={categoryName}>
                    <Input placeholder="请输入分类名称"/>
                </Form.Item>
            </Form>
        )
    }
}