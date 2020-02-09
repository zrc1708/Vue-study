// function Age<T extends {new(...args:any[]):{}}>(constructor:T):T{
//     class Person9 extends constructor{
//         age:number = 0
//     }
//     return Person9
// }

//age是一个装饰器函数，该函数会自动调用，不需要（），调用的时候会传入下面的
//这个对应的class的构造函数


//我希望装饰出来的age属性的值不是固定的
//装饰器函数不是我们主动调用的
//如果我们希望传入构造器，那么就使用闭包
//age就不能直接作为装饰器函数
//该函数执行完成以后需要返回一个函数，这个返回的函数作为实际的装饰器函数
function Age(v: number) {
    //这个返回的函数才是真正的装饰器需要执行的函数
    return function Age < T extends {new(...args: any[]): {}} > (constructor: T): T {
        class Person9 extends constructor {
            age: number = v
        }
        return Person9
    }
}

@Age(18)
class Person8 {
    username = 'Kimoo'
}

@Age(10)
class cat {
    username = '小猫咪'
}

let p3 = new Person8()
console.log(p3)

let c1 = new cat()
console.log(c1)

// function fnn(e,a,b){
//     return a+b+e.clientX
// }
// document.onclick = function(e){
//     fnn(e,10,20)
// }