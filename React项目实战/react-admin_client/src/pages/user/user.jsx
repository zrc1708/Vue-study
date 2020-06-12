// 用户路由
import React, { Component } from 'react'
import {Card,Button,Table,Modal,message} from 'antd'
import {formateDate} from '../../utils/dateUtils'
import LinkButton from '../../components/link-button/link-button'
import {PAGE_SIZE} from '../../utils/constants'
import {reqUsers,reqDeleteUser,reqAddOrUpdateUser} from '../../api/index'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import UserForm from './userform'

export default class User extends Component {
    state ={
        users:[],   //所有用户列表
        roles:[],   //所有角色列表
        isShow:false,
    }

    initColumns =()=>{
        this.columns =[
            {
                title:'用户名',
                dataIndex:'username'
            },
            {
                title:'邮箱',
                dataIndex:'email'
            },
            {
                title:'电话',
                dataIndex:'phone'
            },
            {
                title:'注册时间',
                dataIndex:'create_time',
                render:(create_time)=>formateDate(create_time)
            },
            {
                title:'所属角色',
                dataIndex:'role_id',
                render:(role_id)=>this.roleNames[role_id]
            },
            {
                title:'操作',
                render:(user)=>(
                    <span>
                        <LinkButton onClick={()=>this.showUpdate(user)}>修改</LinkButton>
                        <LinkButton onClick={()=>this.deleteUser(user)}>删除</LinkButton>
                    </span>
                )
            },
        ]
    }

    // 删除指定用户
    deleteUser=(user)=>{
        Modal.confirm({
            title: `确认删除${user.username}吗?`,
            icon: <ExclamationCircleOutlined />,
            onOk:async ()=> {
                const result = await reqDeleteUser(user._id)
                if(result.status===0){
                    message.success('删除用户成功')
                    this.getUsers()
                }
            }
        });
    }

    addOrUpdate=()=>{
        this.form.validateFields().then(async data=>{
            // 隐藏确认框
            this.setState({
                isShow:false
            })
            // 收集输入的数据,如果是更新，需要给user指定_id属性
            if(this.user){
                data._id = this.user._id
            }

            const result = await reqAddOrUpdateUser(data)

            // console.log(result)

            if(result.status===0){
                message.success(`${this.user?'修改':'添加'}用户成功`)
                this.getUsers()
            }
            this.form.resetFields()
            
        }).catch(err=>{
            console.log(err)
        })
    }

    close=()=>{
        // this.user = null
        this.form.resetFields()
        this.setState({isShow:false})
    }

    // 根据role数组，生成包含所有角色名的对象
    initRoleNames=(roles)=>{
        const roleNames =  roles.reduce((pre,role)=>{
            pre[role._id] = role.name
            return pre
        },{})
        this.roleNames = roleNames
    }

    getUsers=async ()=>{
        const result = await reqUsers()
        if(result.status===0){
            const {users,roles} = result.data
            this.initRoleNames(roles)
            this.setState({users,roles})
        }
    }

    // 显示修改界面
    showUpdate=(user)=>{
        this.user = user    //保存user
        this.setState({
            isShow:true
        })
    }

    // 显示添加页面
    showAdd=()=>{
        this.user = null    //去除保存的user
        this.setState({
            isShow:true
        })
    }

    componentWillMount(){
        this.initColumns()
    }

    componentDidMount(){
        this.getUsers()
    }

    render() {
        const title = <Button type="primary" onClick={this.showAdd}>创建用户</Button>
        const user = this.user || {}
        const {users,isShow,roles} = this.state

        return (
            <Card title={title}>
                <Table
                rowKey='_id'
                bordered
                dataSource={users} 
                columns={this.columns}
                onRow={this.onRow}
                // rowSelection={{type:'radio',selectedRowKeys:[role._id]}}
                pagination={{
                    defaultPageSize:PAGE_SIZE,
                }}>
                </Table>

                <Modal
                title={user._id?'修改用户':'添加用户'}
                visible={isShow}
                onOk={this.addOrUpdate}
                onCancel={this.close}
                >
                    <UserForm 
                    setForm={form=>{this.form = form}}
                    roles={roles}
                    user={user}
                    visible={isShow}
                    ></UserForm>
                </Modal>
            </Card>
        )
    }
}
