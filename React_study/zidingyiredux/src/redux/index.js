/*
redux库的主要模块
1) redux 库向外暴露下面几个函数 
createStore(): 接收的参数为 reducer 函数, 返回为 store 对象 
combineReducers(): 接收包含 n 个 reducer 方法的对象, 返回一个新的 reducer 函数 
applyMiddleware() // 暂不实现 
2) store 对象的内部结构 
getState(): 返回值为内部保存的 state 数据 
dispatch(): 参数为 action 对象 
subscribe(): 参数为监听内部 state 更新的回调函数
*/

// 根据指定的reducer函数创建一个store对象并返回
export function  createStore (reducer){

    // 返回当前内部的state
    function getState(){

    }

    // 分发action，触发reducer调用，产生新的state
    function getpath(action){
        
    }

    // 绑定内部state改变的监听回调
    function subscribe(listener){
        
    }

    // 返回store
    return {
        getState,
        getpath,
        subscribe
    }
}

// 整合传入参数对象中的多个reducer函数，返回一个新的reducer
// 新的reducer管理的总状态：{r1:state1,r2:state2}
export function combineReducers(reducers){
    return (state,action)=>{

    }
}