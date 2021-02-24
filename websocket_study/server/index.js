const ws = require('nodejs-websocket')

const server =  ws.createServer(connect => {
    console.log('有用户连接上了')
    connect.on('text',data=>{
        console.log('接收到了用户传来的数据：'+data)
        connect.sendText(data)
    })
    connect.on('close',()=>{
        console.log('连接断开')
    })
    connect.on('error',()=>{
        console.log('连接异常')
    })
})

server.listen(3000,()=>{
    console.log('websocket启动成功')
})