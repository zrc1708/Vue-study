/**
 * ls
 *      输出当前运行命令所在的目录下的文件和文件夹
 * ls  -p d:\    Mac:(/Users)
 *      还可以指定要显示的目录
 */


//加载commander模块
const commander = require('commander')
//加载fs模块
const fs = require('fs')
//美化
const chalk = require('chalk')
// const subCommander = commander.command(' <path>')


//设置当前命令工具的版本
commander.version('v1.0.0','-v --version')

//设置命令选项
commander.option('-p, --path [path]','设置要显示的目录',__dirname)

commander.option('-l, --list [path]','以列表的形式显示',__dirname)

  
//实现命令的具体逻辑
commander.action(()=>{  //这里的path就是在命令中定义的path
    //把当前命令指定目录下的文件以及文件夹显示在控制台中
    try{
        const files = fs.readdirSync(commander.path)

        //如果commander.list为真，就以列表的形式显示
        if(commander.list){

            let output = files.map(file => {
                let stat =  fs.statSync(commander.path+'/'+file)                
                return stat.isDirectory()?chalk.red.bgGreen(`[目录]  ${file}\n`):chalk.blue(`[文件]  ${file}\n`)

            }).join('')
            console.log(output)
        }else{
            console.log(files)
        }

    }catch(e){
        console.log(e)
    }

})

if(process.argv.length<3){
    process.argv.push(__dirname)
}

commander.parse(process.argv)