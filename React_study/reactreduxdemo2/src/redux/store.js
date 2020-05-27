import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

// 引入浏览器redux调试插件
import {composeWithDevTools} from 'redux-devtools-extension'

import {counter} from './reducers'


// 生成一个store对象
const store = createStore(
    counter,
    composeWithDevTools(applyMiddleware(thunk))  //运用上异步中间件
)
// console.log(store)

export default store 