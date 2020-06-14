/*
用来根据老的state和指定的action生成并返回新的state的函数
*/
import {combineReducers} from 'redux'
import {
    Add_Num,
    Reduce_Num
} from './action-types'

// 用来控制number的reducer函数
function NumberRedux(state=1,action){        
    switch(action.type){
        case Add_Num:
            return action.num
        case Reduce_Num:
            return action.num
        default:
            return state
    }
}

export default combineReducers({
    NumberRedux
})