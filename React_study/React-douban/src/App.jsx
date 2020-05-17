import React from 'react'

// 导入路由
import {HashRouter,Route,Link} from 'react-router-dom'

// 导入antd组件
import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

// 导入模块化的样式
import styles from './css/app.scss'

// 导入路由相关的样式
import HomeContainer from './components/home/HomeContainer.jsx'
import AboutContainer from './components/about/AboutContainer.jsx'
import MovieContainer from './components/movie/MovieContainer.jsx'

export default class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        return <HashRouter>
        <Layout className="layout" style={{height:'100%'}}>

            {/* 头部区域 */}
            <Header>
                <div className={styles.logo} />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={window.location.hash.split('/')[1]}>
                    <Menu.Item key="home">
                        <Link to="/home">首页</Link>
                    </Menu.Item>
                    <Menu.Item key="movie">
                        <Link to="/movie/in_theaters/1">电影</Link>
                    </Menu.Item>
                    <Menu.Item key="about">
                        <Link to="/about">关于</Link>
                    </Menu.Item>
                </Menu>
            </Header>

            {/* 主体区域 */}
            <Content style={{background:'#fff',flex:'1'}}>
                <Route path="/home" component={HomeContainer}></Route>
                <Route path="/movie" component={MovieContainer}></Route>
                <Route path="/about" component={AboutContainer}></Route>
            </Content>

            {/* 底部区域 */}
            <Footer style={{ textAlign: 'center' }}>jibei ©2020 nico</Footer>
        </Layout>
    </HashRouter>
    }

}
