const ws = require('nodejs-websocket')

const TYPE_ENTER = 0
const TYPE_LEAVE = 1
const TYPE_MSG = 2

// 用户数量
let count = 0

const server =  ws.createServer(connect => {
    console.log('新的连接')
    count++
    connect.userName = `用户${count}`
    // 告诉所有用户，有人加入了
    broadcast({
        type:TYPE_ENTER,
        msg:`${connect.userName}进入了聊天室`,
        time:new Date().toLocaleTimeString()
    })

    connect.on('text',data=>{
        // 收到某个用户的消息，广播给所有用户
        broadcast({
            type:TYPE_MSG,
            msg:`${connect.userName}:${data}`,
            time:new Date().toLocaleTimeString()
        })
    })
    connect.on('close',()=>{
        // 告诉所有用户有人离开
        broadcast({
            type:TYPE_LEAVE,
            msg:`${connect.userName}离开了聊天室`,
            time:new Date().toLocaleTimeString()
        })
        count--
    })
    connect.on('error',()=>{
        console.log('连接异常')
    })
})

function broadcast(msg){
    server.connections.forEach(item=>{
        item.send(JSON.stringify(msg))
    })
}

server.listen(3000,()=>{
    console.log('websocket启动成功')
})