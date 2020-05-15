// js打包入口文件
import React from 'react'
import ReactDOM from 'react-dom'

import Hello from './components/Hello.jsx'
import Hello2 from './components/Hello2.jsx'
// 以上两种方式创建组件的方式有区别，function创建的组件没有state私有属性，只有props来接收传过来的数据
// 使用function创建的组件，叫做无状态组件
// 使用class创建的组件，叫做有状态组件
// 最本质的区别，是有误state属性，同时，class创建的组件，有自己的生命周期函数，function创建的没有

// 如何选择？
// 如果一个组件需要存放自己的私有数据，或者需要组件在不同的阶段执行阿不同的业务逻辑，此时用class
// 如果一个组件只需要根据文杰传递过来的props渲染固定的页面结构，适合用function（剔除了生命周期，运行速度会快一丢丢）

ReactDOM.render(<div>
  <Hello name="zs"></Hello>
  <Hello2 address="北京"></Hello2>
</div>,document.getElementById('app')) 