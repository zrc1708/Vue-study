(async function () {
    const Koa = require('koa')
    const KoaStaticCache = require('koa-static-cache')
    const KoaBodyParser = require('koa-bodyparser')
    const router = require('./routers/main')

    const app = new Koa()

    app.use(async (ctx, next) => {
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        if (ctx.method == 'OPTIONS') {
            ctx.body = 200;
        } else {
            await next();
        }
    })

    app.use(KoaStaticCache('./public', {
        prefixL: 'public',
        gzip: true
    }))


    app.use(KoaBodyParser())

    app.use(router.routes())
    app.listen(8888)
})()