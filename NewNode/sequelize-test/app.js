(async function () {
    /**
     * ORM 对象关系映射
     *  把js中的对象与数据库进行关联（映射），后期通过操作对象来操作数据库
     *  sequelize依赖了mysql2，需要手动安装mysql2
     */
    const Sequelize = require('sequelize') //类

    /**
     * 连接数据库
     */

    const sequelize = new Sequelize('contect', 'root', 'password', {
        //其他数据库连接配置
        host: '127.0.0.1',
        port: 3306,
        dialect: 'mysql',
        timezone: 'Asia/Shanghai' //当我们向数据库写入时间时，默认会根据系统当前所在时区进行设置
    })

    //测试:如果promise有可能抛出错误，name一定要捕获错误
    try {
        sequelize.authenticate()        
        console.log('连接成功')
    } catch (error) {
        console.log('连接失败')
    }
    /**
     * 数据库连接完成以后，需要确定操作的表
     * 使用orm，不需要通过sql来操作表，而是通过对象来操作
     * 给每一个要操作的表定义一个对象 - 模型 Model
     */
    const userModel = sequelize.define('123',{
        //描述表中对应的字段信息
        //对象的key默认对应着表的column，字段
        id:{
            //每一个字段的信息
            type:Sequelize.INTEGER(10),
            allowNull:false,
            primaryKey:true,
            autoIncrement:true      //自增
        },
        username:{
            //每一个字段的信息
            type:Sequelize.STRING(10),
            allowNull:false,
            defaultValue:''        //默认值为空
        },
        phone:{
            //每一个字段的信息
            type:Sequelize.STRING(20),
            allowNull:false,
            defaultValue:''        
        },
        address:{
            //每一个字段的信息
            type:Sequelize.STRING(50),
            allowNull:false,
            defaultValue:''        
        },
        sex:{
            //每一个字段的信息
            type:Sequelize.STRING(10),
            allowNull:false,
            defaultValue:''        
        }
    },{
        //用来设置字段以外的其他信息
        timestamps:false
    });
})()