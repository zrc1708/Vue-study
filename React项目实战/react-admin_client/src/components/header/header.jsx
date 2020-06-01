import React, { Component } from 'react'
import './header.less'
import {formateDate} from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import {reqWeather} from '../../api/index'
import {withRouter} from 'react-router-dom'
import menuList from '../../config/menuConfig'
import { Modal } from 'antd';
import LinkButton from '../link-button/link-button'

class Header extends Component {

    state ={
        currentTime:formateDate(Date.now()),
        weather:''
    }

    // 第一次render之后执行，一般在此执行异步操作
    componentDidMount(){
        this.getTime()
        this.getWeather()
    }

    getTime=()=>{
        this.intervalId = setInterval(()=>{
            const currentTime = formateDate(Date.now())
            this.setState({currentTime})
        },1000)
    }
    getWeather =async ()=>{
        const weather =await reqWeather()
        this.setState({weather})
    }

    getTitle = ()=>{
        // console.log(menuList)
        const path = this.props.location.pathname
        let title
        menuList.forEach(item=>{
            if(item.key===path){
                title = item.title
            }else if(item.children){
                const cItem = item.children.find(cItem => cItem.key ===path)
                if(cItem){
                    title = cItem.title
                }
            }
        })
        return title
    }

    // 退出登录
    logout = ()=>{
        Modal.confirm({
            content: '确定退出吗',
            onOk:()=> {
                // 删除保存的user,跳转到登录
                storageUtils.removeUser()
                memoryUtils.user = {}
                this.props.history.replace('/login')
            },
          })
    }

    render() {
        const {currentTime,weather} = this.state
        const {username} = memoryUtils.user
        const title = this.getTitle()

        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎，{username}</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="heade-bottom-left">{title}</div>
                    <div className="heade-bottom-right">
                        <span>{currentTime}</span>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }

    // 当前组件卸载之前
    componentWillUnmount(){
        // 清除定时器
        clearInterval(this.intervalId)
    }
}

export default withRouter(Header)