const dgram = require('dgram')

const clientSocket = dgram.createSocket('udp4')   //udp4对应ipv4


/**
 * 发送数据
 *      udp,无连接协议，不需要连接到服务器，然后在发数据
 */

 clientSocket.send('hello',12345,'127.0.0.1')    