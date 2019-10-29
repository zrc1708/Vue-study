const Koa = require('koa')  
const koaStaticCache = require('koa-static-cache')
const Router = require('koa-router')
const Swig = require('koa-swig')
const co = require('co')

const app = new Koa()

let users = [
    {username:'nico'},
    {username:'zhangsan'},
    {username:'lisi'},
    {username:'wagnwu'},
]

// 只要有请求，则通过koastaticcache进行处理
app.use(koaStaticCache(__dirname+'/static',{
    prefix:'/public'  
}))

const router = new Router()

//使用模板引擎
const render = Swig({
    root:__dirname+'/views',  //文件模板
    autoescape:true,
    cache:false,      //是否启用缓存
    ext:'.html'
})
app.context.render = co.wrap(render)

//通过get方式发送
router.get('/list',async(ctx,next)=>{
    ctx.body = await ctx.render('list.html',{
        users:users
    })
})

app.use(router.routes())


app.listen(8888)
