// 添加分类的form组件
import React, { Component } from 'react'

import {Form,Select,Input} from 'antd'

export default class AddForm extends Component {
    formRef = React.createRef();

    changes=(changedValues, allValues)=>{
        this.formRef.current.validateFields().catch(err => {
            // console.log(err.values.categoryName)
            if(err.errorFields.length!==0||err.values.categoryName===''){
                // 有验证错误
                this.props.setForm({error:true})
            }else{
                this.props.setForm(allValues)
            }
        })
    }

    componentWillMount(){
        this.props.setForm({error:true})
    }

    render() {
        const {categorys,parentId,modalVisible} = this.props
        
        return (
            modalVisible&&<Form 
            onValuesChange={this.changes}
            ref={this.formRef}>
                <Form.Item name="parentId" initialValue={parentId}>
                    <Select>
                        <Select.Option value='0'>一级分类</Select.Option>
                        {categorys.map(c=>{
                            return <Select.Option value={c._id} key={c._id}>{c.name}</Select.Option>
                        })}
                    </Select>
                </Form.Item>

                <Form.Item name="categoryName"
                rules={[
                    { required: true, message: '分类名称必须输入' }
                ]}>
                    <Input placeholder="请输入分类名称"/>
                </Form.Item>
            </Form>
        )
    }
}
