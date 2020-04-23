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
        // timezone: 'Asia/Shanghai' //当我们向数据库写入时间时，默认会根据系统当前所在时区进行设置
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
    const userModel = sequelize.define('user',{
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
        timestamps:false,
        paranoid:true,       //真删除
        freezeTableName:true,
        tableName:'users'
    });

    /**
     * 模型类->表
     * 模型创建出来的对象->表中某条记录
     */
    // let nico = new userModel()     创建了一个user的记录
    // let nico = userModel.build({
    //     //字段对应的值
    //     username:'Nico',
    //     phone:'123',
    //     address:'音乃木阪',
    //     sex:'女'
    // })    //和上面的new是一样的
    //通过new或者build出来的对象不会立即同步到数据库，需要后续的方法
    // await nico.save()    
    // console.log(nico.get('id'))

    //修改
    // let nico = await userModel.findOne({
    //     where:{id:5}
    // })
    // console.log(nico)
    // nico.set('address','长坂坡')
    // await  nico.save()
    // await nico.update({
    //     'address':'三国'
    // })


    // nico.destroy()  //删除

    /**
     * findAll
     */
    // let rs = await userModel.findAll()
    // console.log(rs.map(r=>r.get('username')))

    /**
     * 条件查询
     */
    // let rs = await userModel.findAll({
    //     where:{
    //         // username:{
    //         //     [Sequelize.Op.eq]:'妮可'    //username:'妮可'
    //         // }
    //         // phone:{
    //         //     [Sequelize.Op.gt]:120       //phone>120   gte  >=
    //         // }


    //         //多条件
    //         [Sequelize.Op.and]:[            //or
    //             {
    //                 phone:{
    //                     [Sequelize.Op.gt]:150
    //                 }
    //             },
    //             {
    //                 sex:'女'
    //             }
    //         ]
    //     }
    // })
    // console.log(rs.map(r=>r.get('username')))

    //分页
    // let rs = await userModel.findAll({
    //     limit:2,
    //     offset:1
    // })
    // console.log(rs.map(r=>r.get('username')))

    //排序
    // let rs = await userModel.findAll({
    //     order:[
    //         ['phone','desc']
    //     ]
    // })
    // console.log(rs.map(r=>r.get('username')))

    //count
    // let rs = await userModel.count()
    // console.log(rs)

    // let rs = await userModel.findAndCountAll({
    //     limit:2
    // })
    // console.log(rs)

    // let rs = await userModel.sum('phone',{
    //     where:{
    //         sex:'女'
    //     }
    // })
    // console.log(rs)


    /**
     * 关联查询
     */
    const MessageModel = sequelize.define('message',{
        id:{
            type:Sequelize.INTEGER(10),
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        uid:{       //其他表的字段，可以吧当前字段定义为外键
            type:Sequelize.INTEGER(10),
            allowNull:false,
            defaultValue:0,
            references:{
                model:userModel,
                key:'id'
            }
        },
        content:{
            type:Sequelize.STRING(255),
            allowNull:true,
            defaultValue:''
        }
    },{
        timestamps:false,
        freezeTableName:true,
        tableName:'message'
    })

    //获取某跳留言的所有数据：留言本身的数据+该留言用户的数据
    let data = {}

    //较烦的方法
    // let message = await MessageModel.findOne({
    //     where:{
    //         id:1
    //     }
    // })
    // let user = await userModel.findOne({
    //     where:{
    //         id:message.get('uid')
    //     }
    // })
    // Object.assign(data,{
    //     id:message.get('id'),
    //     uid:message.get('uid'),
    //     username:user.get('username'),
    //     age:user.get('phone'),
    //     gender:user.get('address'),
    //     content:message.get('content')
    // })
    // console.log(data)


    // MessageModel.belongsTo(userModel,{
    //     foreignKey:'uid'
    // })
    // let data2 =await MessageModel.findOne({
    //     where:{
    //         id:1
    //     },
    //     include:[userModel]
    // })
    // console.log(`
    //     留言id:${data2.get('id')}
    //     留言人名称:${data2.user.username}
    // `)


    userModel.hasMany(MessageModel,{
        foreignKey:'uid'
    })
    let data3 = await userModel.findOne({
        where:{
            id:4
        },
        include:[MessageModel]
    })

    console.log(data3)

})()