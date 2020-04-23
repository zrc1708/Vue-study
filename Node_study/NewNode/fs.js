const fs = require('fs')

// fs.writeFile('./1.txt','hello',(err)=>{
//     if(err){
//         console.log('文件写入失败')
//     }else{
//         fs.appendFileSync('./1.txt','我是追加的内容')
//         console.log('文件写入成功')
//     }
// })

let content = fs.readFileSync('./1.txt')
console.log(content)

// try{
//     fs.writeFile('./123131/1.txt','hello')
//     console.log('写入成功')
// }catch(e){
//     console.log('写入失败')
// }