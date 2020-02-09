class Person7{
    username :string
    age:number

    constructor(username:string,age:number){
        this.username = username
        this.age = age
    }

    say(){
        console.log('say')
    }

}

class Baby extends Person7{
    wawa(){
        console.log('wawa')
    }
}

class student extends Person7{
    study(){
        console.log('study')
    }
}

class teacher extends Person7{
    study(){
        console.log('study')
    }

    teach(){
        console.log('teach')
    }
}

class superman extends Person7{

}