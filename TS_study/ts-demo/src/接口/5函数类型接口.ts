/**
 * 这个接口描述的是一个包含有fn并且值的类型为函数的结构体,并不是描述函数
 * 结构，而是一个包含函数的对象结构
 */
interface Options3{
    fn:Function
}

let o:Options3 ={
    fn:function(){}
}

/**
 * 定义一个事件函数，那么这个函数必须有一定的规则
 * 我们不能随便的吧一个函数复制给事件
 */

 function fn5(x:MouseEvent){
     console.log(x.clientX)
 }
 document.onclick = fn5

 /**
  * 我们也可以使用interface来约定定义函数的结构
  */

  //定义的是函数接口
  interface IFn{
      (x:number,y:number):number
  }

let fn6:IFn = function(x:number,y:number):number{
    return x+y
}

//定义了一个接受一个mouseevent类型参数的函数结构
interface MouseEventCallBack{
    (e:MouseEvent):any
}

let fn7:MouseEventCallBack = function(a:MouseEvent){

}

document.onclick = fn7

fetch('url').then((a:Response)=>{
    a.json()
})