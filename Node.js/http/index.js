require('http').createServer(function(req,res){
    res.writeHead(200)
    res.end('hello word')
}).listen(3000)