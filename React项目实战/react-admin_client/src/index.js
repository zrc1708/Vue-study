import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import store from './redux/store'

// import memoryUtils from './utils/memoryUtils'
// import storageUtils from './utils/storageUtils.js'

// 读取local中保存的user，保存到内存中
// const user = storageUtils.getUser()
// memoryUtils.user = user

ReactDOM.render((
  <Provider store={store}>
    <App></App>
  </Provider>
  ),document.getElementById('root')
);
