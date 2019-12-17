

    const KoaRouter = require('koa-router')
    const router2  = new KoaRouter()
    const fs = require('fs')
    const path = require('path')

    var request = require('request');


    const AlipaySdk = require('alipay-sdk').default
    const AlipayFormData = require('alipay-sdk/lib/form').default



    router2.get('/pay', async (ctx) => {
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

    router2.get('/inquire', async (ctx) => {
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


    module.exports = router2
