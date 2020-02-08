class Person1{
    
//在构造函数的参数中直接使用public等修饰符，则等同于同时创建了该属性
    constructor(public name:string,public age:number){
        this.name = name
        this.age = age
    }
}

class stu extends Person1{
    //如果子类没有重写构造函数，则直接父类的
    //如果子类重写了构造函数
    //需要手动调用父类构造函数
    constructor(public name:string,public age:number,public type:string){
        super(name,age)
        this.type = type
    }
}

let s1 = new stu('nico',30,'javascript')

