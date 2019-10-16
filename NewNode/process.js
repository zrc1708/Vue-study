process.stdout.write('请输入你要创建的项目名称:')  

process.stdin.on('data',(e)=>{
    //会将回车也记录，需要剔除回车
    console.log('用户输入',e.toString().replace('\n',''))
    console.log('项目创建成功')
})