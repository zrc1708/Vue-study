/**
 * 能发送异步ajax请求的函数模块
 * 封装axios
 * 函数的返回值是promise对象
 * 1.优化：统一处理请求异常,在外层包一个自己创建的promise，出错时不去reject
 * 2.优化：异步直接打到response.data
 */
import axios from 'axios'
import {message} from 'antd'

export default function ajax(url,data={},type="GET"){
    let promise
    return new Promise((resolve,reject)=>{
        // 1.执行异步ajax请求
        if(type==="GET"){
            promise = axios.get(url,{
                params:data
            })
        }else{
            promise = axios.post(url,data)
        }
        // 2.如果成功了，调用resolve
        promise.then(response=>{
            resolve(response.data)
        }).catch(error=>{
            // 3.如果失败了，不调用reject，而是提示异常信息
            // reject(error)
            message.error('请求出错了:'+error.message)
        })
    })
}