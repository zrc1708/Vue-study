/**
 * 后台管理的路由组件
 */
import React, { Component } from 'react'
import {Redirect,Route,Switch} from 'react-router-dom'

import { Layout } from 'antd';

// import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav/left-nav'
import Header from '../../components/header/header'

import {connect} from 'react-redux'

// 引入子路由
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import NotFound from '../not-found/notfound'

const { Content, Footer, Sider } = Layout;

class Admin extends Component {
    render() {
        const user = this.props.user 
        // 如果内存中没哟存储user=>当前没有登录

        if(!user || !user._id){
            //跳转到登录
            return <Redirect to="/login"/>
        }
        return (
            <Layout style={{minHeight:'100%'}}>
                <Sider>
                    <LeftNav></LeftNav>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{backgroundColor:'white',margin:'20px'}}>
                        <Switch>
                            <Redirect exact={true} from='/' to="/home"/>
                            <Route path="/home" component={Home}></Route>
                            <Route path="/category" component={Category}></Route>
                            <Route path="/product" component={Product}></Route>
                            <Route path="/Role" component={Role}></Route>
                            <Route path="/user" component={User}></Route>
                            <Route path="/charts/bar" component={Bar}></Route>
                            <Route path="/charts/line" component={Line}></Route>
                            <Route path="/charts/pie" component={Pie}></Route>
                            <Route component={NotFound}></Route>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center',color:' #ccc'}}>
                        推荐使用谷歌浏览器，可以获得更佳的页面操作体验
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {}
)(Admin)