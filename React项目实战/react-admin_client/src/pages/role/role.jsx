// 角色路由
import React, { Component } from 'react'
import {Card,Button,Table,Modal,message} from 'antd'
import {PAGE_SIZE} from '../../utils/constants'
import {reqRoles, reqAddRole} from '../../api/index'
import AddForm from './addform'

export default class Role extends Component {
    state ={
        roles:[],    //所有角色的列表
        role:{},
        isShowAdd:false,    //是否显示添加界面
        current:1       //初始的页码
    }

    initColumn =() =>{
        this.columns =[
            {
                title:'角色名称',
                dataIndex:'name'
            },
            {
                title:'创建时间',
                dataIndex:'create_time'
            },
            {
                title:'授权时间',
                dataIndex:'auth_time'
            },
            {
                title:'授权人',
                dataIndex:'auth_name'
            },
        ]
    }

    onRow=(role)=>{
        return {
            onClick:event=>{
                this.setState({role})
            }
        }
    }

    getRoles =async () => {
        const result = await reqRoles()
        if(result.status===0){
            const roles = result.data
            this.setState({
                roles
            })
        }
    }

    // 添加角色
    addRole=()=>{
        this.form.validateFields().then(async data=>{
            // 隐藏确认框
            this.setState({
                isShowAdd:false
            })
            // 收集输入的数据
            const {roleName} = data
            this.form.resetFields()
            const result = await reqAddRole(roleName)
            if(result.status===0){
                message.success('添加角色成功')
                // 新产生的角色
                const role = result.data
                // 更新roles的状态
                // const roles = [...this.state.roles]
                // roles.push(role)
                // this.setState({roles})
                this.setState(state =>({
                    roles:[...state.roles,role]
                }),()=>{
                    if(this.state.roles.length%3===1){
                        this.setState({
                            current:++this.state.current
                        })
                    }
                })
            }else{
                message.error('添加角色失败')
            }
        }).catch(err=>{
            console.log(err)
        })
        
    }
    // 关闭添加角色
    closeAddRole=()=>{
        this.setState({isShowAdd:false})
        if(this.form){
            this.form.resetFields()
        }
    }

    // 改变分页页码
    onChange = page => {
        this.setState({
          current: page,
        });
    };

    componentWillMount(){
        this.initColumn()
    }

    componentDidMount(){
        this.getRoles()
    }

    render() {
        const {roles,role,isShowAdd,current} = this.state

        const title =(
            <span>
                <Button type='primary' onClick={()=>{this.setState({isShowAdd:true})}}>创建角色</Button>&nbsp;&nbsp;
                <Button type='primary' disabled={!role._id}>设置角色权限</Button>
            </span>
        )

        return (
            <Card title={title}>
                <Table
                rowKey='_id'
                bordered
                dataSource={roles} 
                columns={this.columns}
                onRow={this.onRow}
                rowSelection={{type:'radio',selectedRowKeys:[role._id]}}
                pagination={{
                    current:current,
                    defaultPageSize:PAGE_SIZE,
                    onChange:this.onChange
                }}>
                </Table>

                <Modal
                title="添加角色"
                visible={isShowAdd}
                onOk={this.addRole}
                onCancel={this.closeAddRole}
                >
                    <AddForm 
                    modalVisible={isShowAdd}
                    setForm={(form)=>{this.form = form}}></AddForm>
                </Modal>
            </Card>
        )
    }
}

