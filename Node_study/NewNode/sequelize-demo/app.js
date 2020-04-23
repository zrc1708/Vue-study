const Sequelize = require('sequelize')

const sequelize = new Sequelize('todos','root','password',{
    host:'127.0.0.1',
    dialect:'mysql'
})

sequelize.authenticate().then(()=>{
    console.log('连接成功')
}).catch(err=>{
    console.log('连接失败')
})

//定义模型
const todos = sequelize.define('nico',{
    id:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        autoIncrement:true,     //自动增长
        primaryKey:true
    },
    title:{
        type:Sequelize.STRING(255),
        allowNull:false,
    },
    done:{
        type:Sequelize.TINYINT(1),
        allowNull:false,
    }
},{
    timestamps:false,    //自动添加时间
    tableName:'todos'
});

// console.log(todos.findAll())
// todos.findAll().then(nicos =>{
//     nicos.forEach(element => {
//         console.log(element.dataValues)
//     });
// })

// let zhangsan = todos.build({
//     title:'学习遛狗',
//     done:'1'
// })

// zhangsan.set('title','学习遛鸟')

// zhangsan.save()

todos.findOne({
    where: {id: '5'},
  }).then(project => {
    console.log(project.dataValues)
  })