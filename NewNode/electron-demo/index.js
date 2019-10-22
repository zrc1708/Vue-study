const {app,BrowserWindow,ipcMain} = require("electron")

//主线程
let username = 'nico'

global.username = username

let datas = {
    username:'妮可',
    gender:'男'
}

app.on('ready',()=>{
    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
         }
    })

    win.webContents.openDevTools()    //开启检查

    win.loadFile('./layout/index.html')

    //监听渲染进程ipcRenderer 发送的消息
    ipcMain.on('getData',function(e,key){
        // console.log(data)

        //e.render   通过这份对象返回消息给渲染进程
        e.sender.send('sendData',datas[key])
    })

    //主进程主动发送消息给渲染进程
    setTimeout(()=>{
        win.webContents.send('hello','hello......',10,20,30)        
    },2000)



    const win2 = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
         }
    })
    win2.webContents.openDevTools()    //开启检查
    win2.loadFile('./layout/index2.html')
})