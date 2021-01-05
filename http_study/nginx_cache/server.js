const http = require('http')
const fs = require('fs')

const wait = (seconds)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve()
        }, seconds*1000);
    })
}

http.createServer((request,response)=>{
    console.log('request come',request.headers.host)

    if(request.url==='/'){
        const html = fs.readFileSync('test.html','utf8')
        response.writeHead(200,{
            'Content-Type':'text/html',
        })
        response.end(html)
    }
    if(request.url==='/data'){
        // private,只允许浏览器缓存，不允许代理服务器
        // no-store 所有地方都不缓存
        response.writeHead(200,{
            // 'Cache-Control':'max-age=2,s-maxage=20'
            'Cache-Control':'s-maxage=200',
            'Vary':'X-Test-Cache'
        })
        wait(2).then(()=>{
            response.end('success')
        })
    }

    
}).listen(8888)

