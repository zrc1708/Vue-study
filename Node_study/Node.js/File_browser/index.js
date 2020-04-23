var fs = require('fs')
fs.readdir(__dirname,function(err,files){
    console.log(files)  
})

fs.readdir(__dirname,function(err,files){
    console.log('')

    if(!files.length){
        return console.log('No files to show!\n')
    }

    console.log('   Select which file or dictionary you want to see\n')

    function file(i){
        var filename = files[i]

        fs.stat(__dirname+'/'+filename,function(err,stat){

            if(stat.isDirectory()){
                console.log('   '+i+'   '+filename+'/')
            }else{
                console.log('   '+i+'   '+filename+'')
            }

        if(++i ==files.length){
            read()
        }else{
            file(i)
        }

            // i++
            // if(i==files.length){
            //     console.log(' ')
            //     process.stdout.write('   Enter your choice: ')
            //     process.stdin.resume()
            //     process.stdin.setEncoding('utf8')
            // }else{
            //     file(i)
            // }
        });
    }

    function read(){
        console.log('')
        process.stdout.write('   Enter your choice: ')
        process.stdin.resume()
        process.stdin.setEncoding('utf8')
        process.stdin.on('data',option)
    }

    function option(data){
        var filename = files[Number(data)]
        if(!filename){
            process.stdout.write('Enter your choice: ')
        }else{
            process.stdin.pause()
            fs.readFile(__dirname+'/'+filename,'utf8',function(err,data){

                console.log('')
                console.log(data.replace(/(.*)/g,'     $1'))
            })
        }

        
    }
    file(0)
   
})