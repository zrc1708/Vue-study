import React from 'react';
import ReactDOM from 'react-dom';


// 这是没有使用redux的写法
// import App from './oldway/app.jsx';
// 使用了redux的写法
import NewApp from './newway/newapp.jsx'

import store from './redux/store'

function render(){
  ReactDOM.render(
    <div>
      {/* <p>没有使用redux的写法</p>
      <App></App>
      <hr/> */}
      <p>使用了redux的写法</p>
      <NewApp store={store}></NewApp>
    </div>
      ,document.getElementById('root')
  );
}

// 初始化渲染
render()

// 订阅监听，store中的状态变化了，就会自动调用进行重绘
store.subscribe(render)
