/* 
包含 N个action creater函数的模块
同步action：对象{type:'xxx',data:数据}
异步action：函数 dispatch => {}
*/
import {
    Add_Num,
    Reduce_Num,
    Set_Weather
} from './action-types'
import axios from 'axios'

// 数字加
export const AddNum=(num)=>({type:Add_Num,data:num})

// 数字减
export const ReduceNum = (num)=> ({type:Reduce_Num,data:num})

// 接收天气信息
export const SetWeather = (wea) => ({type:Set_Weather,data:wea})

// 调用api的异步action
export const GetWea =()=>{
    return async dispatch => {
        // 执行异步的ajax请求
        const result = await axios.get(`https://www.tianqiapi.com/api/?version=v1&appid=99248416&appsecret=g1fjlGJD`)
        if(result.status===200){
            const {wea} = result.data.data[0]
            // 分发接收用户的同步action
            dispatch(SetWeather(wea))
        }
    }
}