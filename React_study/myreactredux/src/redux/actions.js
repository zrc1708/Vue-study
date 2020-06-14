/* 
包含 N个action creater函数的模块
同步action：对象{type:'xxx',data:数据}
异步action：函数 dispatch => {}
*/
import {
    Add_Num,
    Reduce_Num
} from './action-types'

// 数字加
export const AddNum=(num)=>({type:Add_Num,data:num})

// 数字减
export const ReduceNum = (num)=> ({type:Reduce_Num,num})
