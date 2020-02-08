/**
 * 如果我们希望检测不必要这么复杂
 *      如果我们希望某些时候，只要包含其中一些规则即可
 *          通过？来实现
 *          通过as断言
 *          通过变量转换
 */
interface Options1{
    width:number
    height:number
    color:string
}

function fn3(opts:Options1){}

//告知ts检测，我传入的一个就是options1
fn3({
    width:100,
    height:200,
}as Options1)

//先赋值给一个变量,也可以绕开检测
let obj2 = {
    width:100,
    height:200,
    color:'red',
    a:1
}
fn3(obj2)