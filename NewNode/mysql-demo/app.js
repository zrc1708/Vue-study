/**
 * 要使用await,就要定义一个异步函数
 *  async async function  run() {
 *      ...
    }
    run()
 */

(async function  run() {

    const Koa = require('koa')
    const Static = require('koa-static-cache')
    const Router = require('koa-router')
    const Bodyparser = require('koa-bodyparser')
    const fs = require('fs')
    const Mysql = require('mysql2/promise')

    const app = new Koa()

    app.use(Static('./static',{
        prefix:'/static',
        gzip:true
    }))

    const connection = await Mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        port: '3306',
        database: 'todos'
    })

    app.use(Bodyparser())
    const router = new Router()

    /**
     * order by 排序
     *      desc 降序    asc 升序（默认）
     * 查询数量限制
     *      limit top-10
     * 查询偏移
     *      offset
     * 分页：
     *      把一定数量的数据按照每页固定的条数去显示，我们需要首先定义每页显示多少
     * 
     *      每页显示三条
     *      1:0-2
     *      2:3-5
     *      3:6-8
     *      每页显示   limit 
     *      当前的页码   offset
     * 
     * 如果页码从1开始算，name对应的记录应该  limit 3 offset 1(页码-1*3)
     * 
     * 总页码
     */

    router.get('/todos',async ctx => {
        const prepage = 4
        let page = ctx.query.page || 1    //这个page由前端来决定是多少
        page = Number(page)
        //查询总的记录条数
        const sql1 = `select * from todos`
        const [dataAll] = await connection.query(sql1)
        //总的数据量/每页显示条数，注意小数
        const pages = Math.ceil(dataAll.length/prepage)   //向上取整

        const sql2 =`
        select * from todos 
        order by done desc,id asc limit ${prepage} offset ${(page-1)*prepage}
        `
        const [data] = await connection.query(sql2)
        ctx.body = {
            code:0,
            data:{
                page,
                pages,
                prepage,
                data
            }
        }
    })

    router.post('/add',async ctx =>{
        let title = ctx.request.body.title || ''
        if(title==''){
            ctx.body={
                code:1,
                data:'title不能为空'
            }
            return
        }
        // console.log(ctx.request.body.title)
        // console.log(title)
        const [rs] = await connection.query(`
            insert into todos (title) values ('${title}')
        `)
        if(rs.affectedRows>0){
            ctx.body={
                code:0,
                data:'添加成功'
            }
        }else{
            ctx.body={
                code:2,
                data:'添加失败'
            }
        }
    })

    const content = fs.readFileSync('./static/index.html')
    router.get('/',ctx => {
        ctx.body = content.toString()
    })

    app.use(router.routes())
    app.listen(8888)

})()


