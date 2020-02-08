/**
 * 单例
 */

//  class Mysql{

//     host:string 
//     port:number 
//     username:string 
//     password:string 
//     dbname:string 

//      constructor(host='127.0.0.1',port=3306,username='root',password='',dbname=''){
//         this.host = host
//         this.port = port
//         this.username = username
//         this.password = password
//         this.dbname = dbname
//      }

//      query(){}
//      insert(){}
//      update(){}
//  }

 /**
  * 创建一个mysql对象，通过这个对象来操作数据库
  * 如果我们不加以限制的话，这个mysql可以new出来多个对象
  * 每一个mysql对象都会占用资源
  */
//  let db = new Mysql()
//  db.query()
//  db.insert()

//  let db1 = new Mysql()
//  db1.query()
//  db1.insert()

/**
 * 通过口头约定是不靠谱的
 */


class Mysql{

    //静态属性，不需要通过new出来的对象访问，直接通过mysql类来访问
    public static instance

    host:string 
    port:number 
    username:string 
    password:string 
    dbname:string 

    private constructor(host='127.0.0.1',port=3306,username='root',password='',dbname=''){
        this.host = host
        this.port = port
        this.username = username
        this.password = password
        this.dbname = dbname
     }

     public static getInstance(){
         if(!Mysql.instance){
            Mysql.instance = new Mysql()
         }
         return Mysql.instance
     }

     query(){}
     insert(){}
     update(){}
 }

//  let db = new Mysql()
// console.log(Mysql.instance)
let db = Mysql.getInstance()
db.query()