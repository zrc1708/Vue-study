// js打包入口文件
import React from 'react'
import ReactDOM from 'react-dom'

// 全局antd样式
// 一般第三方的样式都是css，最好不要为css配置webpack模块化
// 这样太大，建议按需导入
// import 'antd/dist/antd.css'

import App from './App.jsx'

ReactDOM.render(<App></App>,document.getElementById('app')) 