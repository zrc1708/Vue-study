var MD5 = require('md5.js')
var fs = require('fs')
const Koa = require('koa'); //引入koa框架
const Static = require('koa-static-cache'); //引入koa静态资源依赖
const Router = require('koa-router'); //引入koa路由
const mime = require('mime')
const Bodyparser = require('koa-bodyparser'); //加载body解析依赖
const cors = require('koa2-cors') //引入跨域依赖
const path = require('path')

const app = new Koa(); //类似于实例化

app.use(Bodyparser()); //解析body,也就是post传参
app.use(cors()); //解决跨域问题

//加载静态资源
app.use(Static('./static', {
    prefix: '/',
    gzip: true
}));

const router = new Router(); //路由

app.use(router.routes()); //挂载路由

router.get('/', async ctx => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('./static/index.html');
});

router.get(/\S*\.(jpe?g|png)$/, async (ctx, next) => {

    const imageName = ctx.path
    let filePath = path.join(__dirname) + imageName
    file = fs.readFileSync(filePath)

    const fileMd5 = new MD5().update(file).digest('hex');
    ctx.response.set('Etag',fileMd5)

    const lastMd5 = ctx.request.header['if-none-match']
    if (lastMd5 === fileMd5) {
        ctx.status = 304
    } else {
        ctx.body = file
    }
})

// router.get(/\S*\.(jpe?g|png)$/, async (ctx, next) => {
    
//     ctx.set('last-modified', new Date().toUTCString())

//     let lastTime = ctx.request.header['if-modified-since']

//     if (new Date(lastTime).getTime() + 60 * 1000 > Date.now()) {
//         ctx.status = 304
//     } else {
//         const imageName = ctx.path
//         let filePath = path.join(__dirname) + imageName
//         file = fs.readFileSync(filePath)
//         let mimeType = mime.getType(imageName)
//         ctx.set('content-type', mimeType)
//         ctx.body = file
//     }
// })

// router.get(/\S*\.(jpe?g|png)$/, async (ctx, next) => {
//     const imageName = ctx.path
//     // 设置文件路径
//     let filePath = path.join(__dirname) + imageName

//     file = fs.readFileSync(filePath)

//     //获取图片文件类型
//     let mimeType = mime.getType(imageName)

//     //设置返回类型
//     ctx.set('content-type', mimeType)

//     // 使用cache-control设置一分钟的缓存
//     ctx.set('cache-control','max-age=60')

//     //返回图片
//     ctx.body = file
// })

// router.get(/\S*\.(jpe?g|png)$/, async (ctx, next) => {
//     const imageName = ctx.path
//     // 设置文件路径
//     let filePath = path.join(__dirname) + imageName

//     file = fs.readFileSync(filePath)

//     //获取图片文件类型
//     let mimeType = mime.getType(imageName)

//     //设置返回类型
//     ctx.set('content-type', mimeType)

//     // 使用expires设置一个1分钟后过期的缓存
//     let date = new Date(Date.now()+1*60*1000).toString()
//     ctx.set('expires', date)

//     //返回图片
//     ctx.body = file
// })

app.listen(7699, () => {});