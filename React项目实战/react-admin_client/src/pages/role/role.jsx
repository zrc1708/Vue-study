// 角色路由
import React, { Component } from 'react'
import {Card,Button,Table,Modal,message} from 'antd'
import {PAGE_SIZE} from '../../utils/constants'
import {reqRoles, reqAddRole,reqUpdateRole} from '../../api/index'
import AddForm from './addform'
import AuthForm from './authform'
// import memoryUtils from '../../utils/memoryUtils'
import {formateDate} from '../../utils/dateUtils'
import storageUtils from '../../utils/storageUtils'

import {connect} from 'react-redux'
import {logout} from '../../redux/actions'

class Role extends Component {
    state ={
        roles:[],    //所有角色的列表
        role:{},
        isShowAdd:false,    //是否显示添加界面
        current:1,       //初始的页码
        isShowAuth:false,       //是否显示设置权限界面
    }

    constructor(props){
        super(props)

        this.auth = React.createRef()
    }

    initColumn =() =>{
        this.columns =[
            {
                title:'角色名称',
                dataIndex:'name'
            },
            {
                title:'创建时间',
                dataIndex:'create_time',
                render:(create_time)=>formateDate(create_time)
            },
            {
                title:'授权时间',
                dataIndex:'auth_time',
                render:(auth_time)=>formateDate(auth_time)
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

    // 更新角色
    updateRole=async ()=>{
        this.setState({isShowAuth:false})
        const role = this.state.role
        const menus = this.auth.current.getMenus()
        role.menus = menus
        role.auth_name = this.props.user.username
        const result = await reqUpdateRole(role)
        if(result.status===0){
            message.success('设置角色权限成功')
        }
        // 如果更新的是自己角色的权限，强制退出
        if(role._id===this.props.user.role._id){
            // memoryUtils.user = {}
            // storageUtils.removeUser()
            // this.props.history.replace('/login')
            this.props.logout()
        }else{
            this.getRoles()
        }
    }

    // 关闭更新角色权限
    closeUpdateRole=()=>{
        this.setState({
            isShowAuth:false
        })
    }

    componentWillMount(){
        this.initColumn()
    }

    componentDidMount(){
        this.getRoles()
    }

    render() {
        const {roles,role,isShowAdd,current,isShowAuth} = this.state

        const title =(
            <span>
                <Button type='primary' onClick={()=>{this.setState({isShowAdd:true})}}>创建角色</Button>&nbsp;&nbsp;
                <Button type='primary' disabled={!role._id} onClick={()=>{this.setState({isShowAuth:true})}}>设置角色权限</Button>
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
                rowSelection={{
                    type:'radio',
                    selectedRowKeys:[role._id],
                    onSelect:(role)=>{
                        // 选中radio时的回调 
                        this.setState({role})
                    }
                }}
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
                    setForm={(form)=>{this.form = form}}></AddForm>
                </Modal>

                <Modal
                title="设置角色权限"
                visible={isShowAuth}
                onOk={this.updateRole}
                onCancel={this.closeUpdateRole}
                >
                    <AuthForm 
                    ref={this.auth}
                    role={role}></AuthForm>
                </Modal>
            </Card>
        )
    }
}

export default connect(
    state=>({user:state.user}),
    {logout}
)(Role)