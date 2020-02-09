(async function run() {
    //加载依赖
    const Koa = require('koa'); //引入koa框架
    const Static = require('koa-static-cache'); //引入koa静态资源依赖
    const Router = require('koa-router'); //引入koa路由
    const Mysql = require('mysql2/promise'); //引入mysql,mysql依赖
    const Bodyparser = require('koa-bodyparser');//加载body解析依赖
    const cors = require('koa2-cors')//引入跨域依赖
    const session = require('koa-session');


    

    const router2 = require('./alipay.js')
    const router3 = require('./code.js')

    const app = new Koa(); //类似于实例化

    app.keys = ['niconiconi'];
    const CONFIG = {
        key: 'koa:sess', //cookie key (default is koa:sess)
        maxAge: 86400000, // cookie的过期时间 maxAge in ms (default is 1 days)
        overwrite: true, //是否可以overwrite    (默认default true)
        httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
        signed: true, //签名默认true
        rolling: false, //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
        renew: false, //(boolean) renew session when session is nearly expired,
    };
    app.use(session(CONFIG, app));

    
    app.use(Bodyparser());//解析body,也就是post传参
    app.use(cors());//解决跨域问题

    //加载静态资源
    app.use(Static('./static', {
        prefix: '/static',
        gzip: true
    }));

    
        const connection = await Mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        port: '3306',
        database: 'hotel'})

    const router = new Router();//路由

    //查询所有用户信息接口
    router.post('/check', async ctx => {

        const sql = "SELECT * FROM users";
        const [rs] = await connection.query(sql);

        //把数据传到前端
        ctx.body = {
            rs
        }
    });


    //根据用户名和密码查询用户信息接口
    router.post('/checkuser', async ctx => {
        const username = ctx.request.body.username;        
        const password = ctx.request.body.password;        

        const sql = `SELECT * FROM users where username = '${username}' and userpassword= '${password}'`;
        const [rs] = await connection.query(sql);

        //把数据传到前端
        ctx.body = {
            rs
        }
    });

    //根据用户名查询用户信息接口
    router.post('/checkusername', async ctx => {
        const username = ctx.request.body.username;        

        const sql = `SELECT * FROM users where username = '${username}'`;
        const [rs] = await connection.query(sql);

        //把数据传到前端
        ctx.body = {
            rs
        }
    });

     //根据用户id查询用户信息接口
     router.post('/checkuserbyid', async ctx => {
        const id = ctx.request.body.id;        

        const sql = `SELECT * FROM users where ID = '${id}'`;
        const [rs] = await connection.query(sql);

        //把数据传到前端
        ctx.body = {
            rs
        }
    });

    //查询所有订单信息接口
    router.post('/ordersearch', async ctx => {

        const sql = "SELECT * FROM orders";
        const [rs] = await connection.query(sql);

        //把数据传到前端
        ctx.body = {
            rs
        }
    });

    //查询用户旗下订单信息接口
    router.post('/ordersearchbyuserid', async ctx => {
        const userid = ctx.request.body.userid;  

        const sql = `SELECT * FROM orders where userID = '${userid}'`;
        const [rs] = await connection.query(sql);

        //把数据传到前端
        ctx.body = {
            rs
        }
    });

    

    //查询所有房间信息接口
    router.post('/roomsearch', async ctx => {

        const sql = "SELECT * FROM rooms";
        const [rs] = await connection.query(sql);

        //把数据传到前端
        ctx.body = {
            rs
        }
    });

    //根据userid查询房间信息接口
    router.post('/roomsearchbyuserid', async ctx => {
        const userid = ctx.request.body.userid;  

        const sql = `SELECT * FROM rooms,orders where rooms.roomID = orders.roomID and orders.userID=${userid}`;

        
        const [rs] = await connection.query(sql);

        //把数据传到前端
        ctx.body = {
            rs
        }
    });

    //插入用户数据信息接口
    router.post('/insert', async ctx => {
        const insert = ctx.request.body.userdata;        
        const [rs] = await connection.query("INSERT INTO users (id,username,userpassword) VALUE ('" + insert.id + "','" + insert.username + "','" + insert.userpassword + "')");

        if (rs.affectedRows > 0) {
            ctx.body = {
                code: 0,
                data: '添加成功'
            }
        } else {
            ctx.body = {
                code: 2,
                data: '添加失败'
            }
        }
    });

    //根据用户名更新用户数据接口
    router.post('/update', async ctx => {

        const update = ctx.request.body.userdata;
        const name = ctx.request.body.name;
        // console.log(name);
        let sql =
            `UPDATE users SET phone=${update.phone} , address='${update.address}', userID=${update.userid} , userlevel=${update.userlevel} ,
             sex=${update.sex} WHERE username='${name}';`

        let [rs] = await connection.query(sql);

        if (rs.affectedRows > 0) {
            ctx.body = {
                code: 0,
                data: '修改成功'
            }
        } else {
            ctx.body = {
                code: 2,
                data: '修改失败'
            }
        }

    });

     //根据用户id更新用户数据接口
     router.post('/updateuserbyid', async ctx => {

        const update = ctx.request.body.userdata;

        let sql =
            `UPDATE users SET phone='${update.phone}' , address='${update.address}', userID='${update.userID}' , userlevel='${update.userlevel}' ,
             sex='${update.sex}' WHERE ID='${update.ID}';`


        let [rs] = await connection.query(sql);

        if (rs.affectedRows > 0) {
            ctx.body = {
                code: 0,
                data: '修改成功'
            }
        } else {
            ctx.body = {
                code: 2,
                data: '修改失败'
            }
        }

    });

    //用户发卡数据接口
    router.post('/faka', async ctx => {

        const userid = ctx.request.body.userid;
        // console.log(name);
        let sql =
            `UPDATE users SET userlevel=2 
             WHERE ID=${userid};`

        let [rs] = await connection.query(sql);

        if (rs.affectedRows > 0) {
            ctx.body = {
                code: 0,
                data: '修改成功'
            }
        } else {
            ctx.body = {
                code: 2,
                data: '修改失败'
            }
        }

    });

    //修改用户密码接口
    router.post('/updateuser', async ctx => {
        const username = ctx.request.body.username;
        const password = ctx.request.body.password;
        // console.log(name);
        let sql =
            `UPDATE users SET userpassword = '${password}' WHERE username='${username}';`

        let [rs] = await connection.query(sql);

        if (rs.affectedRows > 0) {
            ctx.body = {
                code: 0,
                data: '修改成功'
            }
        } else {
            ctx.body = {
                code: 2,
                data: '修改失败'
            }
        }

    });

    //更新房间状态接口
    router.post('/updateroom', async ctx => {

        const updateroomid = ctx.request.body.updateroomid;
        const roomstatus= ctx.request.body.roomstatus;
        
        let sql =
            `UPDATE rooms SET roomstatus='${roomstatus}' WHERE ID=${updateroomid};`
        let [rs] = await connection.query(sql);
        if (rs.affectedRows > 0) {
            ctx.body = {
                code: 0,
                data: '修改成功'
            }
        } else {
            ctx.body = {
                code: 2,
                data: '修改失败'
            }
        }

    });
    //通过门牌号更新房间状态接口
    router.post('/updateroombyroomID', async ctx => {

        const updateroomid = ctx.request.body.updateroomid;
        const roomstatus= ctx.request.body.roomstatus;
        
        let sql =
            `UPDATE rooms SET roomstatus='${roomstatus}' WHERE roomID=${updateroomid};`
        let [rs] = await connection.query(sql);
        if (rs.affectedRows > 0) {
            ctx.body = {
                code: 0,
                data: '修改成功'
            }
        } else {
            ctx.body = {
                code: 2,
                data: '修改失败'
            }
        }

    });

    //删除订单信息接口
    router.post('/orderdelete', async ctx => {
        let id = ctx.request.body.id;
        // console.log(id)
        let sql = "DELETE FROM orders WHERE ??=?";
        let [rs] = await connection.query(sql, ['ID', id]);

        if (rs.affectedRows > 0) {
            ctx.body = {
                code: 0,
                data: '修改成功'
            }
        } else {
            ctx.body = {
                code: 2,
                data: '修改失败'
            }
        }

    });

     //删除用户接口
     router.post('/userdelete', async ctx => {
        let id = ctx.request.body.id;
        // console.log(id)
        let sql = "DELETE FROM users WHERE ??=?";
        let [rs] = await connection.query(sql, ['ID', id]);

        if (rs.affectedRows > 0) {
            ctx.body = {
                code: 0,
                data: '修改成功'
            }
        } else {
            ctx.body = {
                code: 2,
                data: '修改失败'
            }
        }

    });

    //插入订单数据接口
    router.post('/insertdata', async ctx => {
        const insert = ctx.request.body.insertdata;
        const [rs] = await connection.query("INSERT INTO orders (ID,userID,roomID,paymoney,paystatus,ordertime,orderstatus) VALUE ('" + insert.ID + "','" + insert.userID + "','" + insert.roomID + "','" + insert.paymoney + "','" + insert.paystatus + "','" + insert.ordertime + "','" + insert.orderstatus + "')");

        if (rs.affectedRows > 0) {
            ctx.body = {
                code: 0,
                data: '添加成功'
            }
        } else {
            ctx.body = {
                code: 2,
                data: '添加失败'
            }
        }
    });

    //修改订单支付状态接口
    router.post('/updatepay', async ctx => {
        const id = ctx.request.body.orderid;
        const [rs] = await connection.query(`
        UPDATE orders SET paystatus = '1' WHERE ID = ${id} ;
        `);

        if (rs.affectedRows > 0) {
            ctx.body = {
                code: 0,
                data: '添加成功'
            }
        } else {
            ctx.body = {
                code: 2,
                data: '添加失败'
            }
        }
    });


    app.use(router.routes());//挂载路由
    app.use(router2.routes());
    app.use(router3.routes());

    app.listen(8888, () => {
        console.log('服务器成功启动');
    });

})();