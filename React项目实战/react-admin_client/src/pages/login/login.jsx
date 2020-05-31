import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import './login.less'
import logo from '../../assets/images/logo.png'

import { Form, Input, Button, message } from 'antd';
import { UserOutlined ,LockOutlined} from '@ant-design/icons';

import {reqLogin} from '../../api/index.js'

import memoryUtils from '../../utils/memoryUtils.js'
import storageUtils from '../../utils/storageUtils.js'

/**
 * 登录的路由组件
 */
export default class Login extends Component {
    render() {
        // r如果用户已经登录，自动跳转到管理页面
        const user = memoryUtils.user
        if(user&&user._id){
            return <Redirect to="/" />
        }

        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt=""/>
                    <h1>妮可后台管理项目</h1>
                </header>
                <section className="login-container">
                    <h2>用户登录</h2>
                    <Form onFinish={this.handleSubmit} onFinishFailed={this.handleSubmitErr} className="login-form">
                        <Form.Item name="username" rules={[
                            {required: true,message: '用户名必须输入'},
                            {min: 4,message: '用户名至少4位'},
                            {max: 12,message: '用户名最多12位'},
                            {pattern: /^[a-zA-Z0-9_]+$/,message: '用户名必须由英文、数字或下划线组成'},
                        ]}>
                            <Input  prefix={<UserOutlined style={{color:"rgba(0.0.0..25)"}}/>} placeholder="用户名"/>
                        </Form.Item>

                        <Form.Item name="password" rules={[{validator:this.validatorPwd}]}>
                            <Input.Password prefix={<LockOutlined  style={{color:"rgba(0.0.0..25)"}}/>} placeholder="密码"/>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }

    handleSubmit= async (values)=>{
        const {username,password} = values
        const result =await reqLogin(username,password)
        if(result.status===0){
            message.success('登录成功')
            // 保存user
            let user = result.data
            memoryUtils.user = user //保存到内存中
            storageUtils.saveUser(user) //保存到local中

            // 跳转到管理界面，不需要回退，所以用replace
            this.props.history.replace('/')
        }else{
            message.error(result.msg)
        }
    }

    handleSubmitErr=()=>{
        console.log('信息有误，登录失败')
    }

    // 自定义密码校验
    validatorPwd =(rule,value,callback)=>{
        if(!value){
            // callback('密码必须输入')
            return Promise.reject('密码必须输入')
        }else if(value.length<4){
            // callback('密码长度不能小于4')
            return Promise.reject('密码长度不能小于4')
        }else if(value.length>12){
            // callback('密码长度不能大于12')
            return Promise.reject('密码长度不能大于12')
        }else{
            return Promise.resolve();
        }
        // else if(/^[a-zA-Z0-9_]+$/.test(value)){
        //     callback('密码必须由英文、数字或下划线组成')
        // }
    }
}