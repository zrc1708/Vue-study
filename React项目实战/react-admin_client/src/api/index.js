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

// 获取商品分页列表
export const reqProducts = (pageNum,pageSize)=>ajax(BASE + '/manage/product/list',{pageNum,pageSize})

// 搜索商品分页列表(根据商品名称/描述)
export const reqSearchProducts =({pageNum,pageSize,searchName,searchType}) => ajax(BASE + '/manage/product/search',{
    pageNum,
    pageSize,
    [searchType]:searchName
})

// 获取一个分类
export const reqCategory = (categoryId) =>ajax(BASE+'/manage/category/info',{categoryId})

// 更新商品的状态（上架，下架）
export const reqUpdateStatus = (productId,status) => ajax(BASE+'/manage/product/updateStatus',{productId,status},'POST')

//删除已上传的图片
export const reqDeleteImg = (name)=> ajax(BASE+'/manage/img/delete',{name},'POST')

// 添加/修改商品
export const reqAddOrUpdateProduct = (product)=> ajax(BASE+'/manage/product/'+(product._id?'update':'add'),product,'POST')

// 获取所有角色列表
export const reqRoles =()=> ajax(BASE+'/manage/role/list')

// 添加角色
export const reqAddRole =(roleName)=> ajax(BASE+'/manage/role/add',{roleName},'POST')

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