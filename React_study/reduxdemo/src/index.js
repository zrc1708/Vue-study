import React from 'react';
import ReactDOM from 'react-dom';

import {createStore} from 'redux'
import {counter} from './redux/reducers'

// 这是没有使用redux的写法
// import App from './oldway/app.jsx';
// 使用了redux的写法
import NewApp from './newway/newapp.jsx'


// 生成一个store对象
const store = createStore(counter)
console.log(store)

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

// 订阅监听，store中的状态变化了，就会自动调用进行重绘
store.subscribe(function(){
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
})
