(async function () {
    const Koa = require('koa')
    const KoaStaticCache = require('koa-static-cache')
    const KoaBodyParser = require('koa-bodyparser')
    const Session = require('koa-session')

    const router = require('./routers/main')
    const cors = require('koa2-cors')

    const app = new Koa()

    app.keys=['dajiahaowoshinico']

    app.use(Session({
        key:'koa:sess',
        maxAge:1000*60*60*24,
        autoCommit: true,
        overwrite: true,
        httpOnly: true,
        signed: true,
        rolling: false,
        renew: false,
    },app))

    // app.use(async (ctx, next) => {
    //     ctx.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
    //     ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    //     ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    //     ctx.set('Access-Control-Allow-Credentials',true);  //允许跨域设置cookie
    //     if (ctx.method == 'OPTIONS') {
    //         ctx.body = 200;
    //     } else {
    //         await next();
    //     }
    // })
     app.use(cors({
        credentials:true
    }))

    app.use(KoaStaticCache('./public', {
        prefixL: 'public',
        gzip: true
    }))


    app.use(KoaBodyParser())

    app.use(router.routes())
    app.listen(8888)
})()