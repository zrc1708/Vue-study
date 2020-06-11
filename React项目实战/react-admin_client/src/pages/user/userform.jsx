// 添加、修改用户的form组件
import React, { PureComponent } from 'react'

import {Form,Input, Select} from 'antd'

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 15 },
};

export default class UserForm extends PureComponent {
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
                name="username"
                label='用户名'
                {...layout}
                rules={[
                    { required: true, message: '用户名称必须输入' }
                ]}>
                    <Input placeholder="用户名"/>
                </Form.Item>
                <Form.Item 
                name="password"
                label='密码'
                {...layout}
                rules={[
                    { required: true, message: '密码必须输入' }
                ]}>
                    <Input type='password' placeholder="请输入密码"/>
                </Form.Item>
                <Form.Item 
                name="phone"
                label='手机号'
                {...layout}
                rules={[
                    { required: true, message: '请输入手机号' }
                ]}>
                    <Input placeholder="用户名"/>
                </Form.Item>
                <Form.Item 
                name="email"
                label='邮箱'
                {...layout}
                rules={[
                    { required: true, message: '请输入邮箱' }
                ]}>
                    <Input placeholder="用户名"/>
                </Form.Item>
                <Form.Item 
                name="role_id"
                label='角色'
                initialValue='2'
                {...layout}
                rules={[
                    { required: true, message: '角色称必须选择' }
                ]}>
                    <Select>
                        <Select.Option value='1'>a</Select.Option>
                        <Select.Option value='2'>b</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        )
    }
}
