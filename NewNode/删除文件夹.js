const fs = require('fs')

rmdir('./a')

function rmdir(dirpath){
    //获取目录下所有文件
    let files = fs.readdirSync(dirpath)

    files.forEach(child=>{
        let childpath = dirpath +'/' +child

        //当前child可能是文件也可能是文件夹
        if(fs.statSync(childpath).isDirectory()){
            // fs.rmdirSync()
            rmdir(childpath)
        }else{
            fs.unlinkSync(childpath)
        }
    })
    fs.rmdirSync(dirpath)
}