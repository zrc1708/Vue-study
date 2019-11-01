const {app,BrowserWindow,Menu} = require('electron')

app.on('ready',()=>{
    const win = new BrowserWindow({
        width:1080,
        height:720,
        resizable:false,
        webPreferences: {
            nodeIntegration: true
         }
    })

    Menu.setApplicationMenu(null)

    // win.webContents.openDevTools()

    win.loadFile('./member-del.html')
})