const http = require('http')

http.createServer((request,response)=>{
    console.log('request come',request.url)

    response.writeHead(200,{
        'Access-Control-Allow-Origin':'*',
        // 'Access-Control-Allow-Origin':'http://127.0.0.1:8888'
        'Access-Control-Allow-Headers':'Test-Cors',
        'Access-Control-Allow-Methods':'POST,PUT,Delete',
        'Access-Control-Max-Age':'1000'
    })
    response.end('123')
}).listen(8887)

