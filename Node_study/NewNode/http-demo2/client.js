const http = require('http')
const fs = require('fs')

 const client = http.request({
     //tcp
     host:'127.0.0.1',
     port:'8866',

     //http
     protocol:'http:',
     method:'get',

    path:'/'
 },(res)=>{
    
 })



 client.write('')
 client.end()