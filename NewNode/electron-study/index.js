const {app,BrowserWindow} = require('electron')

app.on('ready',()=>{
    // console.log('ok')
    let bw1 =  new BrowserWindow({
        width:800,
        height:600,
        center:true,
        resizable:true,  //允许改变窗口尺寸
        title:'测试'
        
    })

    // bw1.webContents.openDevTools()     //开始调试窗口

     bw1.loadFile('./layout/index.html')   //加载指定页面到窗口中，支持绝对路径，推荐使用相对路径，相对路径默认指向应用程序的根目录

    //支持加载远程文件，支持HTTP协议，也只支持file协议
    // bw1.loadURL('https://www.baidu.com')
})