/**
 * 进行local数据管理的工具模块
 */
import store from 'store'
// 此模块可以适配所有浏览器，并且语法更简洁

const   USER_KEY = 'user_key'
export default {
    //保存
    saveUser(user){
        // localStorage.setItem(USER_KEY,JSON.stringify(user))
        return store.set(USER_KEY,user)
    },

    //读取
    getUser(){
        // return JSON.parse(localStorage.getItem(USER_KEY)||'{}')
        return store.get(USER_KEY) || {}
    },

    //删除
    removeUser(){
        // localStorage.removeItem(USER_KEY)
        return store.remove(USER_KEY)
    }
}