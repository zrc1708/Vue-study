const http = require('http')
const fs = require('fs')
const zlib = require('zlib')
const { log } = require('console')

http.createServer((request,response)=>{
    console.log('request come',request.url)

        const html = fs.readFileSync('test.html','utf8')
        response.writeHead(200,{
            'Content-Type':'text/html',
            // 让浏览器不要猜测返回的内容
            // 'X-Content-Type-Options':'nosniff'
            'Content-Encoding':'gzip'
        })
        response.end(zlib.gzipSync(html))
    //     const html = fs.readFileSync('test.html','utf8')
    //     response.writeHead(200,{
    //         'Content-Type':'text/html',
    //     })
    //     response.end(html)
}).listen(8888)

