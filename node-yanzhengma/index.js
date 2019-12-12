(async function () {
    const Koa = require('koa2')
    const staticCache = require('koa-static-cache')
    const Router = require('koa-router')
    const BodyParser = require('koa-bodyparser')
    const cors = require('koa2-cors')
    const session = require('koa-session');

    const app = new Koa()

    app.keys = ['niconiconi'];
    const CONFIG = {
        key: 'koa:sess', //cookie key (default is koa:sess)
        maxAge: 86400000, // cookie的过期时间 maxAge in ms (default is 1 days)
        overwrite: true, //是否可以overwrite    (默认default true)
        httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
        signed: true, //签名默认true
        rolling: false, //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
        renew: false, //(boolean) renew session when session is nearly expired,
    };
    app.use(session(CONFIG, app));

    //静态
    app.use(staticCache('./static', {
        prefix: '/static',
        gzip: true
    }))

    //body解析
    app.use(BodyParser())

    const router = new Router()

    var svgCaptcha = require('svg-captcha');

    router.get('/code', async (ctx) => {
        var captcha = svgCaptcha.create({ //这种生成的是随机数验证码
            size: 4, //验证码长度
            fontSize: 50, //字体大小
            ignoreChars: '0o1i', // 验证码字符中排除 0o1i
            noise: 2, // 干扰线条的数量
            background: '#f5f5f5', // 验证码图片背景颜色
            width: 100,
            height: 40,
        });
        ctx.body = captcha;
        ctx.session.code = captcha.text.toLowerCase()
    });

    router.get('/confirmcode', async (ctx) => {
        
        
        ctx.body = ctx.session.code 

    });

    app.use(cors({
        credentials: true
    }))

    app.use(router.routes())

    app.listen(8888)
})()