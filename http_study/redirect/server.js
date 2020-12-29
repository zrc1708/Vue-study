const http = require('http')
const fs = require('fs')
const zlib = require('zlib')
const { log } = require('console')

http.createServer((request,response)=>{
    console.log('request come',request.url)

    if(request.url==='/'){
        // 302临时跳转，301永久跳转
        response.writeHead(302,{
            'Location':'/new'
        })
        response.end('')
    }
    if(request.url==='/new'){
        response.writeHead(200,{
            'Content-Type':'text/html'
        })
        response.end('<div>this is content</div>')
    }
}).listen(8888)

