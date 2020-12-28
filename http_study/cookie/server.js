const http = require('http')
const fs = require('fs')

http.createServer((request,response)=>{
    console.log('request come',request.url)

    const host = request.headers.host

    if(request.url==='/'){
        const html = fs.readFileSync('test.html','utf8')
        if(host==='test.com'){
            response.writeHead(200,{
                'Content-Type':'text/html',
                'Set-Cookie':['id=123;max-age=2',
                              'name=zhangsan;HttpOnly',
                              'test=123;domain=test.com']
            })
        }
        response.end(html)
    }
}).listen(8888)

