const {app,BrowserWindow,Menu ,MenuItem} = require('electron')

app.on('ready',()=>{
    let bw1 = new BrowserWindow();

    //创建菜单对象
    let m1 = new Menu()

    //创建菜单项
    let mi1 = new MenuItem({
        type:'normal',
        label:'文件'
    })
    let mi2 = new MenuItem({
        type:'submenu',
        label:'查看',
        submenu:[
            {
                type:'normal',
                label:'文件'
            },
            {
                type:'normal',
                label:'文件夹'
            },
            {
                type:'checkbox',
                label:'选项一',
                checked:true
            },
            {
                type:'separator'//分隔符
            },
            {
                type:'radio',
                label:'多选一',
                checked:true
            },
            {
                type:'radio',
                label:'多选二',
            },
            {
                role:'close'
            }
        ]
    })
    //把菜单项添加到指定菜单对象中
    m1.append(mi1)
    m1.append(mi2)

    //指定菜单显示的主体，（具体哪个窗口，右键-上下文）
    /** 
     *菜单位置：
     应用程序的顶层菜单
     上下文菜单
     */ 

     //把程序添加到应用程序窗口最顶层
    Menu.setApplicationMenu(m1)
})