class Person{
    /**
     * ts中的类，成员属性必须要声明后使用
     * ts中类的成员属性不是在构造函数中声明的，在class内，方法外
     * 
     * puclic
     *      公开的，所有地方都能访问
     * protected
     *      受保护的，在类的内部和子类中才能访问
     * private
     *      私有的，只能在该对象（类）的内部才可以访问
     * readonly
     *      只读
     */
    public username:string=''

    constructor(name:string){
        this.username = name
    }
}

class Student extends Person{
    say(){
        this.username
    }
}

let p1:Person = new Person('nico')
p1.username
p1.username = 'niconiconi'