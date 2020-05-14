// js打包入口文件
import $ from 'jquery'
// 发布思路：bundle.js中只存放自己的代码，第三方包的代码全部抽离到另外的js中

import './css/index.scss'

$(function(){
    $('li:odd').css('backgroundColor','pink')
    $('li:even').css('backgroundColor','lightblue')
})

class Person{
    static info = {name:'zs'}
}

console.log(Person.info)