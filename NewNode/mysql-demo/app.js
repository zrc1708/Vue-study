/**
 * 要使用await,就要定义一个异步函数
 *  async async function  run() {
 *      ...
    }
    run()
 */

(async function  run() {

    const Koa = require('koa')
    const Static = require('koa-static-cache')
    const Router = require('koa-router')

    const app = new Koa()

    app.use(Static('./static',{
        prefix:'/static',
        gzip:true
    }))

    app.listen(8888)

})()


