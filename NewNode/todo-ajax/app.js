const Koa = require('koa')
const staticCache = require('koa-static-cache')
const Router = require('koa-router')
const BodyParser = require('koa-bodyparser')

/**
 * 通过服务器请求拿到一个基础页面，后续的内容就不要在通过浏览器发请求
 * 因为通过浏览器发请求会导致浏览器重新渲染
 * 
 * 首先通过浏览器拿到一个基础页面
 * 然后在基础页面中写入js,通过js的ajax来发送请求，ajax发送请求并不会直接渲染页面
 * 而是会把获取到的数据存储到ajax对象
 */


const app = new Koa()

//静态
app.use(staticCache('./static',{
    prefix:'/static',
    gzip:true
}))

const router = new Router()

router.get('/',async ctx =>{
    ctx.body = 'hello'
})  

app.use(router.routes())

app.listen(8888)