const http = require('http')
const fs = require('fs')
const Mime = require('./lib/Mine')

// console.log(Mime.getType('txt'))    //text/plain
// console.log(Mime.getType('html'))   //text/html
// console.log(Mime.getExtension('text/html'))      //['html','html']

const app = http.createServer((req, res) => {

    /**
     * 我们直接让用户访问/static/index.html
     * 用户在URL后面带的路径，我们直接就把他关联到服务器本地的目录文件
     */
    let content = ''

    staticSend(__dirname + req.url)

    function staticSend(filename, headers = {
        'Content-Type': 'text/html;charset=utf-8'
    }, statusdode = 200, ) {
        if (fs.existsSync(filename)) {

            let ext = filename.substring(filename.lastIndexOf('.')+1)

            if(!ext){
                ext = 'txt'
            }

            //根据所请求文件袋后缀输出对应的MIME
            headers['Content-Type'] = Mime.getType(ext)

            res.writeHead(statusdode, http.STATUS_CODES[statusdode], headers)
            content = fs.readFileSync(filename)
            res.end(content)
        } else {
            staticSend(__dirname + '/static/404.html', {
                'Content-Type': 'text/html;charset=utf-8'
            }, 404)
        }
    }
})

//指定APP监听的端口以及网络

app.listen(8888, '127.0.0.1', () => {
    console.log('服务器启动成功了')
})