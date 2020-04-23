const http = require('http')

 const server = http.createServer()

 /**
  * request:客户端请求对象，保存了当前这次请求的客户端相关的信息
  * response:服务端输出对象，提供了服务端输出（响应）有关的一些方法
  */
server.on('request',(request,response)=>{
    console.log('接收到了请求')

    //向客户端返回数据
    //request本质是net.socket+http协议增加的一些内容
    //request.socket=>net.socket
    console.log(request.socket.remoteAddress)
})

 //80 默认，约定 给http使用
server.listen(8866,'0.0.0.0')