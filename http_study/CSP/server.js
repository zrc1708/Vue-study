const http = require('http')
const fs = require('fs')
const zlib = require('zlib')
const { log } = require('console')

http.createServer((request,response)=>{
    console.log('request come',request.url)

    if(request.url==='/'){
        const html = fs.readFileSync('test.html','utf8')
        response.writeHead(200,{
            'Content-Type':'text/html',
            // 不接受内联js
            // 'Content-Security-Policy':'default-src http: https:'
            // 不接受外部网站的js(如bootcdn的js)
            // 'Content-Security-Policy':'default-src \'self\''
            // 允许bootcdn
            // 'Content-Security-Policy':'default-src \'self\' https://cdn.bootcdn.net/'
            // 还限制了表单的提交范围
            // 'Content-Security-Policy':'default-src \'self\';form-action \'self\''
            // 防止使用外部图片受阻，仅对js地址设置
            // 'Content-Security-Policy':'script-src \'self\''
            // 向服务器report情况
            // 'Content-Security-Policy':'script-src \'self\';form-action \'self\';report-uri /report'
            // 加载了不希望加载的资源，做一个report工作，仍让其加载
            // 'Content-Security-Policy-Report-Only':'script-src \'self\';form-action \'self\';report-uri /report'
        })
        response.end(html)
    }else{
        response.writeHead(200,{
            'Content-Type':'application/javascript',
        })
        response.end('console.log("loaded js")')
    }
}).listen(8888)

