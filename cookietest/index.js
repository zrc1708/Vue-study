(async function run() {
        var fs = require('fs')
        //加载依赖
        const Koa = require('koa'); //引入koa框架
        const Static = require('koa-static-cache'); //引入koa静态资源依赖
        const Router = require('koa-router'); //引入koa路由
        const Bodyparser = require('koa-bodyparser'); //加载body解析依赖
        const cors = require('koa2-cors') //引入跨域依赖

        const app = new Koa(); //类似于实例化

        app.use(cors()); //解决跨域问题

        app.use(Bodyparser())


        //加载静态资源
        app.use(Static('./static', {
            prefix: '/static',
            gzip: true
        }));

        const testrouter = new Router()

        testrouter.get('/', async ctx => {
            ctx.type = 'html';
            ctx.body = fs.createReadStream('./static/index.html');
        });

        testrouter.get('/read', async ctx => {
            let username = ctx.cookies.get('username');
            ctx.body = {
                code: 200,
                username
            }
        })

        testrouter.post('/login', async ctx => {
            const username = ctx.request.body.username
            // const password = ctx.request.body.password

            ctx.cookies.set('username', username, {
                maxAge: 1000 * 60 * 60 * 1,
                httpOnly: true,
                overwrite: true
            })

            ctx.body = {
                code: 200
            }
        })

        app.use(testrouter.routes())

        app.listen(8877, () => {
            console.log('服务器启动成功')
        });

    })();