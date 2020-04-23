const Koa = require('koa')
const staticCache = require('koa-static-cache')
const Router = require('koa-router')
const BodyParser = require('koa-bodyparser')
const fs = require('fs')
/**
 * 通过服务器请求拿到一个基础页面，后续的内容就不要在通过浏览器发请求
 * 因为通过浏览器发请求会导致浏览器重新渲染
 * 
 * 首先通过浏览器拿到一个基础页面
 * 然后在基础页面中写入js,通过js的ajax来发送请求，ajax发送请求并不会直接渲染页面
 * 而是会把获取到的数据存储到ajax对象
 */
let datas = JSON.parse(fs.readFileSync('./data/data.json'))

const app = new Koa()

//静态
app.use(staticCache('./static',{
    prefix:'/static',
    gzip:true
}))
//body解析
app.use(BodyParser())

const router = new Router()

router.get('/',async ctx =>{
    ctx.body = 'hello'
})  

router.get('/todos',async ctx =>{
    //ctx.body = datas.todos     //koa会自动转成json格式
    ctx.body = {
        code:0,
        data:datas.todos
    }
})

router.post("/toggle",async ctx=>{
    let id  =  ctx.request.body.id || 0
    if(!id){
        ctx.body={
            code :1,
            data:'请传入id'
        }
        return
    }
    let todo = datas.todos.find(todo=> todo.id ==id)
    todo.done = !todo.done

    ctx.body = {
        code:0,
        data:todo
    }

    fs.writeFileSync('./data/data.json',JSON.stringify(datas))
})

router.post("/remove",async ctx=>{
    let id  =  ctx.request.body.id || 0
    if(!id){
        ctx.body={
            code :1,
            data:'请传入id'
        }
        return
    }
    datas.todos = datas.todos.filter( todo => todo.id != id)

    ctx.body ={
        code:0,
        data:'删除成功'
    }

    fs.writeFileSync('./data/data.json',JSON.stringify(datas))

})

router.post('/add',async ctx =>{
    let title  =  ctx.request.body.title || ''
    if(!title){
        ctx.body={
            code :1,
            data:'请传入任务标题'
        }
        return
    }
    let newTask={
        id:++datas.id,
        title,
        done:false
    }
    datas.todos.push(newTask)

    ctx.body = {
        code:0,
        data:newTask
    }

    fs.writeFileSync('./data/data.json',JSON.stringify(datas))

})

app.use(router.routes())

app.listen(8888)