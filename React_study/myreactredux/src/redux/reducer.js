/*
用来根据老的state和指定的action生成并返回新的state的函数
*/
import {combineReducers} from 'redux'
import {
    Add_Num,
    Reduce_Num,
    Set_Weather
} from './action-types'

// 用来控制number的reducer函数
function NumberRedux(state=1,action){        
    switch(action.type){
        case Add_Num:
            return ++action.data
        case Reduce_Num:
            return --action.data
        default:
            return state
    }
}

// 用来控制天气信息的reducer函数
function WeatherRedux(state='天气信息未获取',action){
    switch(action.type){
        case Set_Weather:
            return action.data
        default:
            return state
    }
}



// 向外默认暴露的是合并产生的总的reduce函数
export default combineReducers({
    NumberRedux,
    WeatherRedux
})