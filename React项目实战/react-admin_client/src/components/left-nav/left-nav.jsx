/**
 * 左侧导航的组件
 */
import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import './left-nav.less'
import {connect} from 'react-redux'
import {setHeadTitle} from '../../redux/actions'

// antd菜单相关组件
import { Menu } from 'antd';
import * as Icon from '@ant-design/icons';
import menuList from '../../config/menuConfig'
// import memoryUtils from '../../utils/memoryUtils'

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
        let path = this.props.location.pathname
        if(path.indexOf('/product')===0){
            path = '/product'
        }
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

    // 判断当前登录用户对item是否有权限
    hasAuth=(item)=>{
        const key = item.key
        const menus = this.props.user.role.menus
        // 如果当前用户是admin,直接通过
        const username = this.props.user.username
        if(username==='admin'||item.isPublic||menus.indexOf(key)!==-1){
            return true
        }else if(item.children){
            return !!item.children.find(child=> menus.indexOf(child.key)!==-1)
        }
        return false
    }

    // 根据menu对应的数组生成对应的标签数组(map递归法)
    getMenuNodes =(menuList)=>{
        const path = this.props.location.pathname
        return menuList.map(item=>{
            // 如果当前用户有item对应的权限，才需要展示对应的菜单项
            if(this.hasAuth(item)){
                if(!item.children){
                    //判断item是否是当前对应的item
                    if(item.key===path || path.indexOf(item.key)===0){
                        // 更新redux中的headertitle状态
                        this.props.setHeadTitle(item.title)
                    }

                    return (
                        <Menu.Item key={item.key} icon={React.createElement(Icon[item.icon])}>
                            <Link 
                            to={item.key}
                            onClick={()=>this.props.setHeadTitle(item.title)}>{item.title}</Link>
                        </Menu.Item>
                    )
                }else{
                    // 查找一个域当前请求路径匹配的子item
                    const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
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
export default connect(
    state => ({user:state.user}),
    {setHeadTitle}
)(withRouter(Leftnav))
