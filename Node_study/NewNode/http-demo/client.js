const http = require('http')
const fs = require('fs')

/**
 * http.ClientRequenst类
 *      new http.ClientRequset
 *      http.request
 */

 //创建一个客户端（能发HTTP请求）的对象
 //请求行:  get http://127.0.0.1:8888/
 const client = http.request({
     //tcp
     host:'www.baidu.com',
     port:'80',

     //http
     protocol:'http:',
     method:'get',

    path:'/img/bd_logo1.png'
 },(res)=>{
    //这个函数会在服务器响应的时候触发

    // let content = ''
    let content = Buffer.alloc(0)

    //res=>data
    res.on('data',(data)=>{
        // console.log(data.toString())
        // content+=data.toString()
        content = Buffer.concat([content,data],content.length+data.length)
    })

    res.on('end',()=>{
        fs.writeFileSync('./baidu.png',content)
    })
 })


 //请求的发送需要调用下面的方法
 client.write('')
 client.end()