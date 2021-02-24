var Koa = require('koa');
var app = new Koa();
const Router = require('koa-router');
const fs = require('fs');
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);

// 首页路由
let router = new Router()
router.get('/', ctx => {
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream('./index.html')
});
app.use(router.routes())


const users = []

// socket连接
io.of('/chats').on('connection', socket => {
    console.log('新用户连接')
    socket.on('login', data => {
        let user = users.find(item=>item.username===data.username)
        if(user){
            socket.emit('loginerror',{ msg:'用户已存在' })
        }else{
            users.push(data)
            socket.emit('loginsuccess',data)
            // 广播事件
            io.of('/chats').emit('addUser',data)
        }
    })
    socket.on('send',data=>{
        io.of('/chats').emit('getmsg',data)
    })
    socket.on('sendImage',data=>{
        io.of('/chats').emit('receiveImage',data)
    })
})

// 监听端口
server.listen(3000, () => {
    console.log('listening on *:3000')
})