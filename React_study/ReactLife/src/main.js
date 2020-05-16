// js打包入口文件
import React from 'react'
import ReactDOM from 'react-dom'

// import Counter from './components/Counter.jsx'
// import Test from './components/TestReceiveProps.jsx'
import BindThis from './components/BindThis.jsx'

ReactDOM.render(<div>
    {/* 每个用户在使用组件的时候必须传递一个默认的数量值作为组件初始化的证据 */}
    {/* <Counter initcount={3}></Counter>
    <Test></Test> */}
    {/* <hr/>
    <Counter ></Counter> */}
    <BindThis></BindThis>
</div>,document.getElementById('app')) 