const http = require('http')
const fs = require('fs')

const app = http.createServer((req, res) => {


    //通过fs读取对应的文件，返回给客户端
    let content = ''

    switch (req.url) {
        case '/':
            staticSend('./static/index.html')
            break
        case '/list':
            staticSend(__dirname+'/static/list.html')
            break
        case '/view':
            staticSend('./static/view.html')
            break
        case '/index.css':
            staticSend('./static/index.css',{
                'Content-Type': 'text/css;charset=utf-8'
            })
            break
        default:
            staticSend('./static/404.html',{
                'Content-Type': 'text/html;charset=utf-8'
            },404)
            break
    }

    function staticSend(filename, headers = {
        'Content-Type': 'text/html;charset=utf-8'
    }, statusdode = 200, ) {
        res.writeHead(statusdode, http.STATUS_CODES[statusdode], headers)
        content = fs.readFileSync(filename)
        res.end(content)
    }
})

//指定APP监听的端口以及网络

app.listen(8888, '127.0.0.1', () => {
    console.log('服务器启动成功了')
})