/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';


// 当使用AppRegistry注册项目的时候，方法中的第一个参数不要改，否则项目就废了
// 第二个参数，表示要把那个页面注册为项目的首页
// AppRegistry.registerComponent(appName, () => MyHomePage);
AppRegistry.registerComponent(appName, () => App);
