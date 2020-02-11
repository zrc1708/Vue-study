// import {koa} from "koa"
import Koa = require('koa')

let app = new Koa()

app.use(async ctx=>{
    ctx.body = 'hello...'
})

app.listen(8888)