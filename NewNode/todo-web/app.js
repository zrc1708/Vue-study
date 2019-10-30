const Koa = require('koa')
const koaStaticCache = require('koa-static-cache')
const Router = require('koa-router')
const Swig = require('koa-swig')
const co = require('co')
const bodyParser = require('koa-bodyparser')

const app = new Koa()

/**
 * 处理静态文件
 */
app.use(koaStaticCache('./static',{
    prefix:'/static',
    gzip:true
}))

/**
 *处理请求正文中的数据 
 */
app.use( bodyParser({
    //默认数据
}))

const router = new Router()

/**
 * 存储所有的任务数据
 *      当前这个数据是存储在服务器内存中的
 */
let datas = {
    maxid:3,
    appName:'Tolist',
    tasks:[
        {id:1,title:'测试任务1',done:true},
        {id:2,title:'学习koa',done:false},
        {id:3,title:'学习数据库',done:false}
    ]
}

/**
 *设置模板引擎 
 */
app.context.render = co.wrap(Swig({
    root:__dirname+'/views',
    autoescape:true,    // 是否html编码，为了安全起见，一般不开启,设置为true
    cache:false,        //'memory'  把解析后的结果保存在内存中，避免每次访问都要去解析模板
    ext:'html'
}))


/**
 * 首页,用于展示任务清单
 */
router.get('/',async ctx=>{
    ctx.body = await ctx.render('index.html',{
       datas
    })
})
/**
 * 添加，添加新的任务,用来展示添加任务的页面
 */
router.get('/add',async ctx=>{
    ctx.body = await ctx.render('add.html',{
        datas:{
            appName:datas.appName
        }
     })
})
/**
 * 添加，处理通过添加页面提交的数据
 */
// router.get('/posttask',ctx =>{
//     let title = ctx.query.title
//     ctx.body = '接收提交的新任务'+title
// })
router.post('/posttask',async ctx =>{
    //quertstring与当前请求的方式是没有关系的，无论get post
    // get方式请求不能操作正文
    let title = ctx.request.body.title || ''
    // ctx.body = '接收提交的新任务'+title
    if(!title){
        ctx.body=await ctx.render('message.html',{
            msg:'请输入任务标题',
            href:'javascript:history.back()'
        })
        return
    }
    datas.tasks.push({
        id:++datas.maxid,
        title:title,
        done:false
    })
    ctx.body=await ctx.render('message.html',{
        msg:'添加成功',
        href:'/'
    })
})
/**
 * 改变，修改任务的状态
 */
router.get('/change/:id',async ctx=>{
    // ctx.body='change'+ctx.params.id

   let id = ctx.params.id

   datas.tasks.forEach( task =>{
       if(task.id==id){
           task.done = !task.done
       }
   })

   ctx.response.redirect('/')
})
/**
 * 删除任务
 */
router.get('/remove/:id',async ctx=>{
    // ctx.body='remove'+ctx.params.id
    let id = ctx.params.id

   datas.tasks = datas.tasks.filter( task => task.id != id)

   ctx.body=await ctx.render('message.html',{
    msg:'删除成功',
    href:'/'
})

})

app.use(router.routes())
app.listen(8888)