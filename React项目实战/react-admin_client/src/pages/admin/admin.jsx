/**
 * 后台管理的路由组件
 */
import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

import memoryUtils from '../../utils/memoryUtils'

export default class Admin extends Component {
    render() {
        const user = memoryUtils.user 
        // 如果内存中没哟存储user=>当前没有登录

        if(!user || !user._id){
            //跳转到登录
            return <Redirect to="/login"/>
        }
        return (
            <div>
                hello {user.username}
            </div>
        )
    }
}
