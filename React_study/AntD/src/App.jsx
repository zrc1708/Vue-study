import React from 'react'

// 导入路由模块
// HashRouter表示一个路由的根容器，将来所有的路由相关的容器，都要包裹在其中，而且，一个网站，只需要使用一次HashRouter就好了
// Route表示一个路由规则，在Route上，有两个比较重要的属性，path,compnent
// Link表示一个路由的链接，好比Vue中的<router-link to=""></router-link>
import {HashRouter,Route,Link} from 'react-router-dom'

// 导入日期选择组件
import { DatePicker } from 'antd';

import Home from './components/Home.jsx'
import Movie from './components/Movie.jsx'
import About from './components/About.jsx'

export default class Parent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            msg:'这是父组件中的msg'
        }
    }
    render(){
        // 当使用hashrouter把app根组件包裹起来之后，网站就已经启用路由了
        // 在一个HashRouter，只能有唯一的根元素
        // 一个网站中，只需要使用唯一的一次HashRouter就行了
        return <HashRouter>
            <div>
                <h1>这是网站的根组件</h1>
                <DatePicker></DatePicker>
                <hr/>
                <Link to="/home">首页</Link>&nbsp;&nbsp;
                <Link to="/movie/top250/10">电影</Link>&nbsp;&nbsp;
                <Link to="/about">关于</Link>
                <hr/>
                {/* Route创建的标签，就是路由规则 */}
                {/* 既是路由匹配规则，也是路由占位符 */}
                {/* exact 可以让路由规则进行精确匹配 */}
                <Route path="/home" component={Home}></Route>
                <hr/>
                {/* 如果要匹配参数，可以再匹配规则中，使用：修饰符，表示这个位置匹配到的是参数 */}
                <Route path="/movie/:type/:id" component={Movie} exact></Route>
                <hr/>
                <Route path="/about" component={About}></Route>
            </div>
        </HashRouter>
    }

}
