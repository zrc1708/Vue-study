// 添加分类的form组件
import React, { Component } from 'react'
import {Form,Input,Tree} from 'antd'
import menuList from '../../config/menuConfig'

const { TreeNode } = Tree;

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 15 },
};


export default class AuthForm extends Component {
    formRef = React.createRef();

    constructor(props){
        super(props)

        const {role} = this.props

        for (let index = 0; index < role.menus.length; index++) {
            if(role.menus[index].split('/').length===3 && !/^\/graph/.test(role.menus[index])){
                role.menus[index] = '/'+role.menus[index].split('/')[2]
            }
            if(/^\/pro$/.test(role.menus[index])){
                role.menus[index] = '/product'
            }else if(/^\/graph/.test(role.menus[index])){
                role.menus[index] = role.menus[index].replace('/graph','/charts')
            }
        }

        this.state = {
            checkedKeys:role.menus
        }
    }

    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };
    
    onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
        this.setState({checkedKeys})
    };

    // 为父组件获取menus
    getMenus=()=>{
        return this.state.checkedKeys
    }

    // 根据新传入的role来更新checkkeys状态
    componentWillReceiveProps(nextProps){
        const {role} = nextProps
        for (let index = 0; index < role.menus.length; index++) {
            if(role.menus[index].split('/').length===3 && !/^\/graph/.test(role.menus[index])){
                role.menus[index] = '/'+role.menus[index].split('/')[2]
            }
            if(/^\/pro$/.test(role.menus[index])){
                role.menus[index] = '/product'
            }else if(/^\/graph/.test(role.menus[index])){
                role.menus[index] = role.menus[index].replace('/graph','/charts')
            }
        }
        this.setState({
            checkedKeys : role.menus
        })
    }

    render() {
        const {role} = this.props
        const {checkedKeys} = this.state

        const menuData = [{
            title: '平台权限',
            key: '/nico',
            children:menuList
        }]


        return (
            <div>
                <Form.Item 
                label='角色名称'
                {...layout}>
                    <Input value={role.name} disabled/>
                </Form.Item>

                <Tree
                checkable
                defaultExpandAll
                checkedKeys={checkedKeys}
                onSelect={this.onSelect}
                onCheck={this.onCheck}
                treeData={menuData}
                />
            </div>
        )
    }
}
