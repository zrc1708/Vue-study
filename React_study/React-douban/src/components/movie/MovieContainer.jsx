import React  from 'react'

// 布局相关的组件
import { Layout, Menu } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

// 路由相关的组件
import {Route,Link} from 'react-router-dom'

import MovieList from './MovieList.jsx'

export default class MovieContainer extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render() {
        return (
        <Layout style={{height:'100%'}}>
            <Sider width={200} className="site-layout-background">
                <Menu
                mode="inline"
                defaultSelectedKeys={window.location.hash.split('#')[1]}
                style={{ height: '100%', borderRight: 0 }}>
                    <Menu.Item key="/movie/in_theaters">
                        <Link to="/movie/in_theaters/1">正在热映</Link>
                    </Menu.Item>
                    <Menu.Item key="/movie/coming_soon">
                        <Link to="/movie/coming_soon/1">即将上映</Link>
                    </Menu.Item>
                    <Menu.Item key="/movie/top250">
                        <Link to="/movie/top250/1">Top250</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{ paddingLeft:1}}>
                <Content 
                style={{
                    padding: 10,
                    margin: 0,
                    minHeight: 280,
                    background:'#fff'
                }}>
                <Route path="/movie/:type/:page" component={MovieList}></Route>
                </Content>
            </Layout>
        </Layout>
        )
    }
}
