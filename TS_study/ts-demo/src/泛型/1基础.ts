/**
 * x 只能是数字类型，如果需要接收任意类型的参数，需要使用any或者函数重载
 * @param x 
 */
// function fn8(x:number):number{
//     return x*10
// }

// fn8(10)
// fn8('10')


/**
 * 泛型
 *  参数很多时候类型是写死的，不利于复用
 * 
 *  给类型这种值也可以设施之变量
 *  <类型变量名>，一般习惯使用单字母大写比如  T，E
 *  写在函数名，参数列表之间，这是函数的
 */
function fn8<T>(x:T):number{
    return Number(x)*10
}

//fn8(1)     //在调用fn函数的时候，同时给T赋值number
fn8<number>(1)
// fn8<string>(1)   //有问题的

// function fn9(...arguments){
//     let arr:number[] = []
//     for (let index = 0; index < arguments.length; index++) {
//         arr[index] = arguments[index]        
//     }
//     return arr
// }
// let arr3 = fn9('b',1)

// function fn9<T,S>(arg1:T,arg2:S):[T,S]{
//     return [arg1,arg2]
// }
// fn9<string,number>("nico",4)

function fn9<T>(arg:T[]):T[]{
    return arg
}
fn9<string>(['a','b'])