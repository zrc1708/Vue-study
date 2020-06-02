// 添加分类的form组件
import React, { Component } from 'react'

import {Form,Select,Input} from 'antd'

export default class AddForm extends Component {


    render() {
        return (
            <Form 
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}>
                <Form.Item>
                    <Select defaultValue='一级分类'>
                        <Select.Option value='1'>1</Select.Option>
                        <Select.Option value='2'>2</Select.Option>
                        <Select.Option value='3'>3</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Input placeholder="请输入分类名称"/>
                </Form.Item>
            </Form>
        )
    }
}
