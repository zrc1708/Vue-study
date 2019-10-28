//后端入口文件
/**
 * web-server
 * 提供web浏览器服务的工具
 */

const http = require('http')

/**
 * 创建HTTP服务器
 */

const app = http.createServer((req, res) => {
    //接收到用户请求
    console.log('有人请求了')
    /**
     * req:IncomingMessage类的实例的对象，保存和提供了当前请求的客户端信息
     * res:Response类的实例对象，保存和提供了响应的相关方法
     */

    //向客户端发送数据需要使用res对象
    //    res.write()
    //    res.end('hello')

    /**
     * 我们需要根据不同的URL返给客户端对应的数据
     * 
     * http://127.0.0.1
     *      /   :首页
     *      /list:列表界面
     *      /view:内容界面
     * 
     * 我们如何知道当前用户访问的URL地址：req.url
     */
    // console.log(req.url)


    /**
     * 设置并写入头信息
     *  res.writeHead(状态码，状态码描述，头信息)
     * 设置头信息
     * res.setHeader(头信息名称，值)
     * 
     * 头信息设置的时候需要注意的问题：
     *      头信息的写入与设置必须在res的write，end之前 
     *      头信息的设置必须早于内容的发送
     */
    res.writeHead(200, http.STATUS_CODES[200], {
        'Content-Type': 'text/html;charset=utf-8'
    })
/**
 * 服务端必须对客户端的每一个请求做对应的处理，否则就会有问题
 *   下面的处理方式是有问题的
 *      把要输出的内容写在了node.js代码中 代码不方便编写
 *      每一个请求都单独的处理，会特别繁琐
 */
    switch (req.url) {
        case '/':
            res.end(`
<html>
    <head>
        <link rel="stylesheet" href="/index.css"/>
    </head>
    <body>
        <h1>首页</h1>
    </body>
</html>
            `)
            break
        case '/list':
            res.end('列表页面')
            break
        case '/view':
            res.end('内容页面')
            break
        case '/index.css':
            res.writeHead(200, http.STATUS_CODES[200], {
                'Content-Type': 'text/css;charset=utf-8'
            })
            res.end('body{color:red}')
            break
        default:
            res.writeHead(404, http.STATUS_CODES[404], {
                'Content-Type': 'text/html;charset=utf-8'
            })
            res.end('页面丢失')
            break
    }

})

//指定APP监听的端口以及网络

app.listen(8888, '127.0.0.1', () => {
    console.log('服务器启动成功了')
})