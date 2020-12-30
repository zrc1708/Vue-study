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
        wait(2).then(()=>{
            response.end('success')
        })
    }

    
}).listen(8888)

