import React, { Component } from 'react'
import './login.less'
import logo from './images/logo.png'

import { Form, Input, Button } from 'antd';

/**
 * 登录的路由组件
 */
export default class Login extends Component {
    render() {
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt=""/>
                    <h1>妮可后台管理项目</h1>
                </header>
                <section className="login-container">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            <Input />
                        </Form.Item>

                        <Form.Item>
                            <Input.Password />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" className="login-form-button">
                            登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }

    handleSubmit=(event)=>{
        
    }
}
