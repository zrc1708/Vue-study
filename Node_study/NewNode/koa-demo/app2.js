const Koa = require('koa')  
const koaStaticCache = require('koa-static-cache')
const Router = require('koa-router')

const app = new Koa()

// 只要有请求，则通过koastaticcache进行处理
app.use(koaStaticCache(__dirname+'/static',{
    // root:__dirname+'/static',   //与上面第一个参数效果一样
    prefix:'/public'  //如果当前请求的URL是以/public开始，则作为静态资源请求
}))

// app.use((ctx,next)=>{
//     //使用switch也是一种路由，知识特别的简单，还需要处理很多其他一些问题，所以改用一些已有的模板
//     // switch(ctx.URL){
//     //     case '/user':
//     //         break
//     //     .....
//     // }
// })

const router = new Router()

//通过get方式发送
router.get('/',(ctx,next)=>{
    ctx.body = 'hello'
})

//子路由
const userRouter = new Router()

userRouter.get('/',(ctx,next)=>{
    ctx.body='用户首页'
})

userRouter.get('/address',(ctx,next)=>{
    ctx.body='用户地址'
})

router.use('/user',userRouter.routes())

//动态路由   127.0.0.1:8888/goods/123
const goodsRouter = new Router()
goodsRouter.get('/goods/:id',(ctx,next)=>{
    ctx.body='添加物品:' + ctx.params.id
})

//路由重定向
router.redirect('/admin','/user',301)

//动态路由  /list/1?order=desc
// Router.url('/list',{page:1},{query:{order:'desc'}})


//把路由对象挂在到app对象中
app.use(router.routes())
app.use(goodsRouter.routes())

app.listen(8888)
