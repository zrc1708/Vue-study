interface Person3{
    [arrt:string]:any
}

class Person3{
    constructor(public username:string,public age:number){

    }
}

//Person =>一个拥有Perosn类型对应特阵的对象
let p10:Person3  =  new Person3('nico',30)


function Superman1(obj:Person3){
    obj.fly = function(){
        console.log('fly')
    }
}

Superman1(p10)

//person类的对象
let aaa:Person
let fn12:{new():Person}

//这样就可以给对象添加属性
// interface Window {
//     [attr:string]:any
// }

// window.nico = 1


// function getPersonObj(constructor:Person3){ //我想约束传入的必须是一个构造函数
//     //Person 表示的是这个类型对应的对象,我们这里要的是person的构造函数,不是他的对象
//     // return  new  constructor()
// }

// getPersonObj('abc')

function getArray(constructor:{new():Array<string>}){  //{new()}接收一个可以产生对象的构造函数
    return  new  constructor()
}

getArray(Array)