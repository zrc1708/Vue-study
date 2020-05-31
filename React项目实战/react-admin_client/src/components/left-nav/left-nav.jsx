/**
 * 左侧导航的组件
 */
import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import './left-nav.less'

// antd菜单相关组件
import { Menu } from 'antd';
import * as Icon from '@ant-design/icons';
import menuList from '../../config/menuConfig'
const { SubMenu } = Menu;

class Leftnav extends Component {
    /**
     * 在第一次render之前执行一次
     * 为第一次render准备数据（必须同步的）
     */
    componentWillMount(){
        this.menuNodes = this.getMenuNodes(menuList)
    }

    render() {
        const path = this.props.location.pathname
        // 得到需要打开菜单项的key
        const openKey = this.openKey
        // console.log(openKey)
        return (
            <div>
                {/* 顶部logo */}
                <div className="left-nav">
                    <Link to="/" className="left-nav-header">
                        <img src={logo} alt=""/>
                        <h1>妮可后台</h1>
                    </Link>
                </div>
                {/* 下方菜单 */}
                <Menu
                // defaultSelectedKeys={[path]}
                selectedKeys={[path]}
                defaultOpenKeys={[openKey]}
                mode="inline"
                theme="dark"
                >
                   {this.menuNodes}
                </Menu>
            </div>
        )
    }

    // 根据menu对应的数组生成对应的标签数组(map递归法)
    getMenuNodes =(menuList)=>{
        const path = this.props.location.pathname
        return menuList.map(item=>{
            if(!item.children){
                return (
                    <Menu.Item key={item.key} icon={React.createElement(Icon[item.icon])}>
                        <Link to={item.key}>{item.title}</Link>
                    </Menu.Item>
                )
            }else{
                // 查找一个域当前请求路径匹配的子item
                const cItem = item.children.find(cItem => cItem.key ===path)
                // 如果存在，说明当前item的子列表需要打开
                if(cItem){
                    this.openKey = item.key
                }

                return (
                    <SubMenu key={item.key} icon={React.createElement(Icon[item.icon])} title={item.title}>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    // 根据menu对应的数组生成对应的标签数组(reduce递归法)
    getMenuNodesReduce =(menuList)=>{
        return menuList.reduce((pre,item)=>{
            if(!item.children){
                pre.push((
                    <Menu.Item key={item.key} icon={React.createElement(Icon[item.icon])}>
                        <Link to={item.key}>{item.title}</Link>
                    </Menu.Item>
                ))
            }else{
                pre.push((
                    <SubMenu key={item.key} icon={React.createElement(Icon[item.icon])} title={item.title}>
                        {this.getMenuNodesReduce(item.children)}
                    </SubMenu>
                ))
            }
            return pre
        },[])
    }
}

/**
 * withRouter高阶组件
 * 包装非路由组件，返回一个新的组件
 * 新的组件向非路由组件传递三个属性：history,location,match
 */
export default withRouter(Leftnav)
