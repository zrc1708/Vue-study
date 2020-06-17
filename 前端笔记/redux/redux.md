# 1.安装依赖
> yarn add redux react-redux redux-thunk redux-devtools-extension 

最后一个为redux的浏览器调试工具，可以不安装

# 2.建立文件结构
在项目中建立一个redux文件夹，文件夹内建立四个文件

+ store.js  
此处的代码可以直接使用，如果没有安装调试工具的话需要去除composeWithDevTools
```js
/*
redux最核心的管理对象store 
*/
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import reducer from './reducer'

// 向外默认暴露store
export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))
```

+ action-types.js  
仿照样例编写名称即可
```js
/* 
包含N个action的type称量表示名称的模块 
*/
export const Add_Num = 'add_num'  //数字加
```
+ action.js  
仿照样例编写方法即可
```js
/* 
包含 N个action creater函数的模块
同步action：对象{type:'xxx',data:数据}
异步action：函数 dispatch => {}
*/
import {
    Add_Num
} from './action-types'

// 数字加
export const AddNum=(num)=>({type:Add_Num,data:num})
```

+ reducer.js  
在switch中的case中，编写逻辑  
state=1设置了此redux变量的默认值为1
```js
/*
用来根据老的state和指定的action生成并返回新的state的函数
*/
import {combineReducers} from 'redux'
import {
    Add_Num
} from './action-types'
// 用来控制number的reducer函数
function NumberRedux(state=1,action){        
    switch(action.type){
        case Add_Num:
            return ++action.data
        default:
            return state
    }
}
// 向外默认暴露的是合并产生的总的reduce函数
export default combineReducers({
    NumberRedux,
    WeatherRedux
})
```
# 3.修改index.js
在index.js中引入redux相关模块
```js
import {Provider} from 'react-redux'
import store from './redux/store'
```
用provider包装根组件
```js
ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```
# 4.开始使用redux(同步)
编写一个样例：将一个数存入redux，能使用redux将其增加/减少，能在多个组件中读取这个数
## 4.1编写action-types.js
```js
export const Add_Num = 'add_num'  //数字加
export const Reduce_Num  = 'reduce_num'  //数字减
```
## 4.2编写actions.js
```js
import {
    Add_Num,
    Reduce_Num
} from './action-types'
// 数字加
export const AddNum=(num)=>({type:Add_Num,data:num})
// 数字减
export const ReduceNum = (num)=> ({type:Reduce_Num,data:num})
```
## 4.3编写reducer.js
```js
import {combineReducers} from 'redux'
import {
    Add_Num,
    Reduce_Num
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
// 向外默认暴露的是合并产生的总的reduce函数
export default combineReducers({
    NumberRedux
})
```
## 4.4在需要的组件中引入redux
+ 需要先使用connect将组件包装，connect中的写法非常固定，记忆即可
+ 取出redux中的值：connect中state=>({参数名:state.reducer中的方法名})
+ 改变redux中的值：将方法从actions中取出，并写在connect中
+ 通过this.props来使用redux中的资源  

这是一个同时具有展示/更改redux功能的组件
```js
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {AddNum,ReduceNum,GetWea} from '../redux/actions'
class NumberControl extends Component {
    add=()=>{
        const num = this.props.NumberRedux
        this.props.AddNum(num)
    }
    reduce=()=>{
        const num = this.props.NumberRedux
        this.props.ReduceNum(num)
    }
    Wea=()=>{
        this.props.GetWea()
    }
    render() {
        return (
            <div style={{border:'1px solid black',padding:20}}>
                <h2>Control组件</h2>
                <p>{this.props.NumberRedux}</p>
                <button onClick={this.add}>+1</button>
                <button onClick={this.reduce}>-1</button>
                <br/>
                <button onClick={this.Wea}>获取天气</button>
            </div>  
        )       
    }
}
export default connect(
    state=>({NumberRedux:state.NumberRedux}),
    {AddNum,ReduceNum}
)(NumberControl)

```
这是一个仅展示redux的组件
```js
import React, { Component } from 'react'
import {connect} from 'react-redux'
class ShowNumber extends Component {
    render() {
        return (
            <div style={{border:'1px solid black',padding:20}}>
                <h2>Show组件</h2>
                <h1>redux中的num：{this.props.NumberRedux}</h1>
            </div>
        )
    }
}
export default connect(
    state=>({NumberRedux:state.NumberRedux}),
    {}
)(ShowNumber)
```

# 5.异步redux
增加一个功能：通过api获取天气信息并存入redux，能在其他组件中读取存入的天气  
要使用异步的redux，需要确保拥有模块redux-thunk（之前已经安装）
## 5.1编写action-types.js
```js
...
export const Set_Weather = 'set_weather'    //设置天气
```
## 5.2编写actions.js
仍需编写同步action，在异步的action中调用同步action
```js
import {
    ...
    Set_Weather
} from './action-types'
import axios from 'axios'
...
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
```
## 5.3编写reducer.js
```js
import {
    ...
    Set_Weather
} from './action-types'
...
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
    ...
    WeatherRedux
})
```
## 5.4在组件中引入
获取天气，控制数字组件的完整代码
```js
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {AddNum,ReduceNum,GetWea} from '../redux/actions'
class NumberControl extends Component {
    add=()=>{
        const num = this.props.NumberRedux
        this.props.AddNum(num)
    }
    reduce=()=>{
        const num = this.props.NumberRedux
        this.props.ReduceNum(num)
    }
    Wea=()=>{
        this.props.GetWea()
    }
    render() {
        return (
            <div style={{border:'1px solid black',padding:20}}>
                <h2>Control组件</h2>
                <p>{this.props.NumberRedux}</p>
                <button onClick={this.add}>+1</button>
                <button onClick={this.reduce}>-1</button>
                <br/>
                <button onClick={this.Wea}>获取天气</button>
            </div>  
        )       
    }
}

export default connect(
    state=>({NumberRedux:state.NumberRedux}),
    {AddNum,ReduceNum,GetWea}
)(NumberControl)
```
展示天气、数字的组件完整代码
```js
import React, { Component } from 'react'
import {connect} from 'react-redux'
class ShowNumber extends Component {
    render() {
        return (
            <div style={{border:'1px solid black',padding:20}}>
                <h2>Show组件</h2>
                <h1>redux中的num：{this.props.NumberRedux}</h1>
                <h1>redux中的weather：{this.props.WeatherRedux}</h1>
            </div>
        )
    }
}
export default connect(
    state=>({NumberRedux:state.NumberRedux,WeatherRedux:state.WeatherRedux}),
    {}
)(ShowNumber)
```
# 本demo源码
[github地址](https://github.com/zrc1708/Html_study/tree/master/React_study/myreactredux)
![效果图](https://s1.ax1x.com/2020/06/15/NPir0U.png)