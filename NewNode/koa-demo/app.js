const Koa = require('koa')  //包装过的HTTP

/**
 * 热重载  :   supervisor
 * npm i -g supervisor
 * supervisor app
 */


//创建一个HTTP服务器，监听请求 http.createServer()
const app = new Koa()

/**
 * Koa : request->middleware->response
 * Kao帮我们做了第一第三步，我们只要做中间件
 */

//next :中间件函数->迭代器

//注册中间件函数
app.use((ctx,next)=>{
    //ctx:koa处理过的对象
    ctx.body = 'Hello '
    next()
})

app.use((ctx,next)=>{
    //ctx:koa处理过的对象
    ctx.body += 'Koa'
})



//监听当前机器的地址，端口
app.listen(8888)
