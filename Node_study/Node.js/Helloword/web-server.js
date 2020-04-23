// 访问http://localhost:3000
var http = require('http');

http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/html'})
    res.end('<h1>hello word</h1>')
}).listen(3000)