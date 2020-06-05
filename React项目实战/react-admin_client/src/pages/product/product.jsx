// 商品路由
import React, { Component } from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'

import ProductHome from './producthome'
import ProductAddUpdate from './addupdate'
import ProductDetail from './detail'

export default class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path="/product" exact component={ProductHome}></Route>
                <Route path="/product/addupdate" exact component={ProductAddUpdate}></Route>
                <Route path="/product/detail" exact component={ProductDetail}></Route>
                <Redirect to="/product"></Redirect>
            </Switch>
        )
    }
}
