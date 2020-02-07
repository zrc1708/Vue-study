/**
 * ts中默认情况下函数中的this默认指向：any
 */

let obj={
    a:10,
    fn(){
        //因为默认情况下，this是any类型，any类型ts不能提示任何属性方法
        // let document:any
        // any的值，ts不能提示或者进行任何类型属性检测（知识不进行提示）

        // 使用noImplicitThis选项可以取消默认this的any
        this
        console.log(this.a)

    }
} 
obj.fn()

//ts会自动推导事件函数中的this
document.onclick=function(){
    this
}

let obj1={
    a:1,
    fn(this:Element|Document){ //ts中函数的第一个this参数是用来设置this类型的
        //这个this是一个假参数，运行过程中是不存在的，是给ts检测用的
        this;
        
    }
}
// document.onclick  =  obj1.fn
// document.body.onclick = obj1.fn