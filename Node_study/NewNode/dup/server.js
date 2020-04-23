/**
 * 服务端
 *      监听当前服务器上指定的IP与端口，如果有互数据发送给IP和端口，我就进行处理
 */

 const dgram = require('dgram')

 /**
  * 创建一个scket类，就是用来处理网络数据的一个标准api对象
  * 通过socket对网络数据进行读取和输出
  */

//   const socket = new dgram.Socket()   都一样
const serverSocket = dgram.createSocket('udp4')   //udp4对应ipv4

serverSocket.on('listening',()=>{
    console.log('服务器开启成功，等待数据:')
    
})


//当接收到数据时触发
serverSocket.on('message',data=>{
    console.log('接收到了数据：',data.toString())
})

/**
 * 监听指定的地址以及端口
 */

 serverSocket.bind(12345,'127.0.0.1')


