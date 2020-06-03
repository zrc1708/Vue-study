// 添加分类的form组件
import React, { Component } from 'react'

import {Form,Select,Input} from 'antd'

export default class AddForm extends Component {

    changes=(changedValues, allValues)=>{
        this.props.setForm(allValues)
    }

    render() {
        const {categorys,parentId} = this.props

        
        return (
            <Form 
            onValuesChange={this.changes}>
                <Form.Item name="category" initialValue={parentId}>
                    <Select>
                        <Select.Option value='0'>一级分类</Select.Option>
                        {categorys.map(c=>{
                            return <Select.Option value={c._id}>{c.name}</Select.Option>
                        })}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Input placeholder="请输入分类名称"/>
                </Form.Item>
            </Form>
        )
    }
}
