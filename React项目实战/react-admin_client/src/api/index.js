/**
 * 包含应用中所有接口请求函数
 */
import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'

const BASE = ''
//  登录
// export function reqLogin(username,password){
//     return ajax('/login',{username,password},'POST')
// }
export const reqLogin = (username,password) => ajax(BASE+'/login',{username,password},'POST')

// 添加用户
export const reqAddUser = (user) => ajax('/manage/user/add',user,'POST')

// 获取一级、二级分类列表
export const reqCategorys = (parentId)=> ajax(BASE+ '/manage/category/list',{parentId})

// 添加分类
export const reqAddCategory = (categoryName,parentId)=> 
    ajax(BASE+ '/manage/category/add',{categoryName,parentId},'POST')

// 更新分类
export const reqUpdateCategory = ({categoryId,categoryName})=> 
    ajax(BASE+ '/manage/category/update',{categoryId,categoryName},'POST')


// json请求的接口请求函数
export const reqWeather = () =>{
    return new Promise((resolve,reject)=>{
        const url = 'https://www.tianqiapi.com/api/?version=v1&appid=99248416&appsecret=g1fjlGJD'
        jsonp(url,{},(err,data)=>{
            if(!err){
                // 取出需要的数据
                const weather = data.data[0].wea
                resolve(weather)
            }else{
                message.error('获取天气信息失败')
            }
        })
    })
}