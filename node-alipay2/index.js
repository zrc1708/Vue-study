(async function () {
    const Koa = require('koa2')
    const staticCache = require('koa-static-cache')
    const Router = require('koa-router')
    const BodyParser = require('koa-bodyparser')
    const cors = require('koa2-cors')
    const fs = require('fs')
    const path = require('path')

    var request = require('request');

    const app = new Koa()

    // app.use(async (ctx, next) => {
    //     ctx.set('Access-Control-Allow-Origin', '*');
    //     await next();
    // });
    // app.use(async (ctx, next) => {
    //     ctx.set('Access-Control-Allow-Origin', '*');
    //     ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    //     ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    //     if (ctx.method == 'OPTIONS') {
    //         ctx.body = 200;
    //     } else {
    //         await next();
    //     }
    // });


    const AlipaySdk = require('alipay-sdk').default
    const AlipayFormData = require('alipay-sdk/lib/form').default


    //静态
    app.use(staticCache('./static', {
        prefix: '/static',
        gzip: true
    }))

    //body解析
    app.use(BodyParser())

    const router = new Router()



    router.get('/pay', async (ctx) => {
        let orderid = ctx.query.orderid
        let orderprice = ctx.query.orderprice
        let title = ctx.query.title

        const alipaySdk = new AlipaySdk({
            appId: '2016101600698525',
            privateKey: fs.readFileSync(path.join(__dirname, './config/app_private_key.pem'), 'ascii'),
            signType: 'RSA2',
            alipayPublicKey: fs.readFileSync(path.join(__dirname, './config/alipay_public_key.pem'), 'ascii'),
            gateway: 'https://openapi.alipaydev.com/gateway.do',
            timeout: 15000,
            camelcase: true
        });

        // console.log(fs.readFileSync(path.join(__dirname,'./config/alipay_public_key.pem'), 'ascii'))

        const formData = new AlipayFormData();

        formData.setMethod('get')

        formData.addField('appId', '2016101600698525');
        formData.addField('charset', 'utf-8');
        formData.addField('signType', 'RSA2');
        // formData.addField('returnUrl', 'http://127.0.0.1:8888/static/success.html'); 
        // formData.addField('notifyUrl', 'http://127.0.0.1:8888/return'); 
        formData.addField('bizContent', {
            outTradeNo: orderid, //商品单号64字符以内
            productCode: 'FAST_INSTANT_TRADE_PAY', //销售码
            totalAmount: orderprice, //订单总金额，单位为元，精确到小数点后两位
            subject: title, //订单标题
            body: '商品详情', //可选，订单描述
        });

        const result = await alipaySdk.exec(
            'alipay.trade.page.pay', {}, {
                formData: formData
            },
        );

        // result 为 form 表单
        // console.log(result);

        ctx.body = {
            status: 200,
            info: '成功',
            result
        }
    })

    router.get('/inquire', async (ctx) => {
        let orderid = ctx.query.orderid

        const alipaySdk = new AlipaySdk({
            appId: '2016101600698525',
            privateKey: fs.readFileSync(path.join(__dirname, './config/app_private_key.pem'), 'ascii'),
            signType: 'RSA2',
            alipayPublicKey: fs.readFileSync(path.join(__dirname, './config/alipay_public_key.pem'), 'ascii'),
            gateway: 'https://openapi.alipaydev.com/gateway.do',
            timeout: 5000,
            camelcase: true
        });

        const formData = new AlipayFormData();

        formData.setMethod('get')
        formData.addField('appId', '2016101600698525');
        formData.addField('charset', 'utf-8');
        formData.addField('signType', 'RSA2');
        formData.addField('bizContent', {
            outTradeNo: orderid,
        });

        await alipaySdk.exec(
            'alipay.trade.query', {}, {
                formData: formData
            },
        ).then(result=>{
            if(result){
                let nn =  request(result, function (error, response, body) {
  
                })
                ctx.body = nn
            }
        })

    })

    router.post("/return", async ctx => {

        // let id = ctx.request.body.ID
        // let username = ctx.request.body.username 
        // let address = ctx.request.body.address 
        // let phone = ctx.request.body.phone 
        // let sex = ctx.request.body.sex
        console.log(111)
        ctx.body = 'success'
    })

    app.use(cors({
        // maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        // credentials: true, //是否允许发送Cookie
        // allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
        // allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
        // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
    }))

    app.use(router.routes())

    app.listen(8888)
})()