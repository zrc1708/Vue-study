const http = require('http')
const fs = require('fs')
const Mime = require('./lib/Mine')

let users = [
    {
        name:'nico',
        gender:'女',
        skills:['产品','设计','运维','客服','前台']
    },
    {
        name:'张三',
        gender:'男',
        skills:['烹饪','门卫','保安']
    },
    {
        name:'李四',
        gender:'女',
        skills:['招财']
    }
]

// console.log(Mime.getType('txt'))    //text/plain
// console.log(Mime.getType('html'))   //text/html
// console.log(Mime.getExtension('text/html'))      //['html','html']



const app = http.createServer((req, res) => {

    res.writeHead(200,http.STATUS_CODES[200],{
        'Content-Type': 'text/html;charset=utf-8'
    })
    
    let content = ''
/**
 * 把动态与静态资源进行区分
 * 约定：以/static开头都为静态
 */
    if(req.url.startsWith('/static')){
        staticSend(__dirname + req.url)
    }else{
        //动态
        switch(req.url){
            case '/user':
                res.writeHead(200,http.STATUS_CODES[200],{
                    'Content-Type': 'application/json;charset=utf-8'
                })
                let data = users.map(user => user.name)
                res.end(JSON.stringify(data))
                break
            case '/getbaidu':
                const r = http.request({
                    host:'www.baidu.com'
                },function(baidures){
                    
                    let data = ''
                    baidures.on('data',(chunk)=>{
                        data +=chunk.toString()
                    })
                    baidures.on('end',()=>{
                        // console.log('响应中已无数据')
                        res.end(data)
                    })
                })
                r.end()
                break
        }
    }


    function staticSend(filename, headers = {
        'Content-Type': 'text/html;charset=utf-8'
    }, statusdode = 200, ) {
        if (fs.existsSync(filename)) {

            let ext = filename.substring(filename.lastIndexOf('.')+1)

            if(!ext){
                ext = 'txt'
            }

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