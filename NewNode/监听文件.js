const fs = require('fs')

//当文件发生改变的时候，触发回调
// fs.watchFile('./data.txt',()=>{
//     console.log('change')
// })

//监听文件或目录
fs.watch('./',(eventType,filename)=>{
    //eventType:change rename
    //filename:当前发生改变的具体文件
    console.log(eventType,filename)
})