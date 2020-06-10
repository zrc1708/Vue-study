// 添加分类的form组件
import React, { Component } from 'react'

import {Form,Input} from 'antd'

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 15 },
};

export default class AddForm extends Component {
    formRef = React.createRef();

    componentDidMount(){
        this.props.setForm(
            this.formRef.current,
        )
    }

    render() {
        
        return (
            <Form 
            onValuesChange={this.changes}
            ref={this.formRef}>
                
                <Form.Item 
                name="roleName"
                label='角色名称'
                {...layout}
                rules={[
                    { required: true, message: '角色名称必须输入' }
                ]}>
                    <Input placeholder="请输入角色名称"/>
                </Form.Item>
            </Form>
        )
    }
}
