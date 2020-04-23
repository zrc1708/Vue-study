const Koa = require('koa')
const staticCache = require('koa-static-cache')
const Router = require('koa-router')
const BodyParser = require('koa-bodyparser')
const mysql = require('mysql2/promise')

const app = new Koa()

// 跨域设置 
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    await next();
});
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200;
    } else {
        await next();
    }
});

//静态
app.use(staticCache('./static',{
    prefix:'/static',
    gzip:true
}))

//body解析
app.use(BodyParser())

const router = new Router()


router.get('/selectAll', async ctx => {

    let connection = await mysql.createConnection({host: 'localhost',user: 'root',password: 'password',port: '3306',database: 'contect'})

    let [users] = await connection.query("select * from users;")

    ctx.body = users

})

router.post('/selectbyID', async ctx => {

    let connection = await mysql.createConnection({host: 'localhost',user: 'root',password: 'password',port: '3306',database: 'contect'})

    let id = ctx.request.body.id

    let [users] = await connection.query(`select * from users where id = ${id};`)

    ctx.body = users

})

router.post("/add", async ctx => {

    let connection = await mysql.createConnection({host: 'localhost',user: 'root',password: 'password',port: '3306',database: 'contect'})

    let id = ctx.request.body.ID
    let username = ctx.request.body.username
    let address = ctx.request.body.address
    let phone = ctx.request.body.phone
    let sex = ctx.request.body.sex

    // console.log(`INSERT INTO users VALUES (${id},'${username}','${phone}','${address}','${sex}');`)

    await connection.query(`
    INSERT INTO users VALUES (${id},'${username}','${phone}','${address}','${sex}');
    `)

    ctx.body = '1'
})

router.post("/delete", async ctx => {

    let connection = await mysql.createConnection({host: 'localhost',user: 'root',password: 'password',port: '3306',database: 'contect'})

    let id = ctx.request.body.id

    await connection.query(`
    delete from users where id = ${id};
    `)

    ctx.body = '1'
})

router.post("/update", async ctx => {

    let connection = await mysql.createConnection({host: 'localhost',user: 'root',password: 'password',port: '3306',database: 'contect'})

    let id = ctx.request.body.ID
    let username = ctx.request.body.username 
    let address = ctx.request.body.address 
    let phone = ctx.request.body.phone 
    let sex = ctx.request.body.sex

    // console.log(ctx.request.body)

    await connection.query(`
    UPDATE users SET username = '${username}',address = '${address}',phone = '${phone}',sex = '${sex}' WHERE ID = ${id} ;
    `)

    ctx.body = '1'
})




app.use(router.routes())

app.listen(8888)