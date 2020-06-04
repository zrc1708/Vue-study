// 添加分类的form组件
import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import {Form,Input} from 'antd'

export default class UpdateForm extends Component {
    formRef = React.createRef();
    // static PropTypes={
    //     categoryName: PropTypes.string.isRequired
    //     setForm:PropTypes.func.isRequired
    // }

    // componentWillMount(){
    //     // 将表单通过setForm传递给父组件
    //     this.props.setForm(123)
    // }

    changes=(changedValues, allValues)=>{
        this.formRef.current.validateFields().catch(err => {
            if(err.errorFields.length===0){
                // 没有验证错误
                this.props.setForm(allValues)
            }else{
                this.props.setForm({error:true})
            }
        })
    }

    render() {
        const {categoryName} = this.props
        // 控制表单动态更新
        const {modalVisible} = this.props
        return (
            modalVisible&&<Form
            onValuesChange={this.changes}
            onFinish={this.finish}
            onFinishFailed={this.fail}
            ref={this.formRef}
            >   
                {/* <span onClick={this.test}>123</span> */}
                <Form.Item name="categoryName"
                initialValue={categoryName}
                rules={[
                    { required: true, message: '分类名称必须输入' }
                ]}>
                    <Input placeholder="请输入分类名称"/>
                </Form.Item>
            </Form>
        )
    }
}