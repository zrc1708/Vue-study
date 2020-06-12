// 添加、修改用户的form组件
import React, { Component } from 'react'

import {Form,Input, Select} from 'antd'

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 15 },
};

export default class UserForm extends Component {
    formRef = React.createRef();

    componentDidMount(){
        this.props.setForm(
            this.formRef.current,
        )
    }

    render() {
        const {roles} = this.props
        const user = this.props.user

        return (
            this.props.visible&&<Form 
            ref={this.formRef}>
                
                <Form.Item 
                name="username"
                label='用户名'
                {...layout}
                initialValue={user.username}
                rules={[
                    { required: true, message: '用户名称必须输入' }
                ]}>
                    <Input placeholder="用户名"/>
                </Form.Item>

                {
                    user._id ? null:(<Form.Item 
                        name="password"
                        label='密码'
                        {...layout}
                        initialValue={user.password}
                        rules={[
                            { required: true, message: '密码必须输入' }
                        ]}>
                            <Input type='password' placeholder="请输入密码"/>
                        </Form.Item>)
                }
                
                <Form.Item 
                name="phone"
                label='手机号'
                {...layout}
                initialValue={user.phone}
                rules={[
                    { required: true, message: '请输入手机号' }
                ]}>
                    <Input placeholder="请输入手机号"/>
                </Form.Item>
                <Form.Item 
                name="email"
                label='邮箱'
                {...layout}
                initialValue={user.email}
                rules={[
                    { required: true, message: '请输入邮箱' }
                ]}>
                    <Input placeholder="请输入邮箱"/>
                </Form.Item>
                <Form.Item 
                name="role_id"
                label='角色'
                initialValue={user.role_id}
                {...layout}
                rules={[
                    { required: true, message: '角色称必须选择' }
                ]}>
                    <Select>
                        {
                            roles.map(role => <Select.Option key={role._id} value={role._id}>{role.name}</Select.Option>)
                        }
                    </Select>
                </Form.Item>
            </Form>
        )
    }
}
