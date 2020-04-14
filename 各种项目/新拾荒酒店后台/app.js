const Koa = require('koa2')
const staticCache = require('koa-static-cache')

const app = new Koa()


//静态
app.use(staticCache('./static',{
    prefix:'/static',
    // gzip:true
}))


app.listen(8877)