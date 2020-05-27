import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux'

import NewApp from './containers/app'

import store from './redux/store'


  ReactDOM.render((
    <Provider store = {store}>
      <NewApp></NewApp>
    </Provider>
  ),document.getElementById('root'));


