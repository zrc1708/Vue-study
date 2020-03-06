import $ from 'jquery'
import './css/1.css'
import './css/1.less'
import './css/1.scss'

import Vue from 'vue'
// 导入单位件组件
import App from './components/app.vue'

$(function(){
    $('li:odd').css('backgroundColor','yellow')
    $('li:even').css('backgroundColor','lightblue')
})

class Person{
    static info = "aaa"
}
console.log(Person.info)

const vm = new Vue({
    el:"#app",
    render:h=>h(App)
})