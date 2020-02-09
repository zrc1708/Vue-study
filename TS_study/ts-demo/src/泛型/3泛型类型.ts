

// let fn10:(x:number,y:number) => number = function(x,y){
//     return x+y
// }

// interface IFn{
//     (x:number,y:number):number
// }

// let fn10:IFn = function(x,y){
//     return x+y
// }

//泛型类型
let fn10:<T>(x:T,y:T) => number = function(x,y){
    return Number(x)+Number(y)
}


//泛型接口
interface IFn1<T>{
    (x:T,y:T):number
}

let fn11:IFn1<string> = function(x,y){
    return Number(x)+Number(y)
}