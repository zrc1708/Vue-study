class People{
    username:string = 'nico'
    private _age:number = 10

    // getAge():number{
    //     return this._age
    // }
    // setAge(age:number):void{
    //     if(age>0&&age<150){
    //         this._age = age
    //     }
    // }

    //存取器，这个a并不会作为方法，而是属性去访问
    get age():number{
        return this._age
    }
    set age(age:number){
        if(age>0&&age<150){
            this._age = age
        }
    }
}

let p2:People = new People()

/**
 * 允许在外部获取和修改age的值，但不允许修改成非法的
 */
// p2.setAge(20)
// p2.setAge(200)
// console.log(p2.getAge())
p2.age = 20
console.log(p2.age)