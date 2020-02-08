abstract class Person2{  //抽象类是不能实例化的
    username:string

        constructor(username:string){
            this.username = username
        }

        say(){
            console.log('123')
        }

        //      索然子类都会有这样的特性，但是子类的学习过程不一样，父类中确定不了，
        //      父类只能抽象约定，接收什么参数，返回什么内容
        //      如果一个雷有抽象方法，呢么这个类也必须是抽象的
        abstract study():void  //抽象方法没有具体代码
}

//如果一个雷继承了抽象类的父类，就必须实现所有抽象方法
class Student1 extends Person2{
    study(){
        console.log('456')
    }
}

class Teacher extends Person2{
    study(){
        console.log('789')
    }
}