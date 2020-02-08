/**
 * 希望规则是：一组由数字进行key命名的对象
 * 我们可以使用索引签名
 *  为数据定义一组具有某种特征的key的数据
 *  索引key的类型只能为number或者string 
 */

 interface Options2{
    [attr:number]:any, //数据key是number值是any
    length:number
 }
 interface Options2{
    [attr:string]:any, //key可以是number，也可以是string
 }

 function fn4(opt:Options2){}

 fn4({
    0:100,
    1:'div',
    a:'dd',
    length:100
 })