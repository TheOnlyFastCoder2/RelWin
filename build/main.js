
const {
    app, 
    BrowserWindow, 
    Tray,
} = require('electron');

const { exec } = require('child_process');
const { ipcMain } = require('electron/main');



const path = require("path")
const trayIcon = path.join(__dirname,"/icon.png");


function  createWindow() {
    const win = new BrowserWindow({
        width: 500,
        height: 387,
        frame: false,
        transparent: true, 
        autoHideMenuBar: true,
        resizable:false,
        webPreferences: {
            devTools: false,
            nodeIntegration: true,
            contextIsolation: false,
            icon: path.join(__dirname,"/icon.png"),
        }
    })  

    win.loadFile("./build/index.html")
    
    return win
}


let tray = null
app.on("ready", () => {
    const win = createWindow();


    tray = new Tray(trayIcon)
    tray.setToolTip('RelSys')
    tray.on("click", () => {
        win.isVisible() ? win.hide() : win.show()
    })


    ipcMain.on("closeApp" , (_,data) => {
        if(data === "default") {
            win.close()
        }
        if(data === "exit") {
            exec("shutdown /s /t 0")
            win.close()
        }

        if ( data === "reload" ) {            
            exec("shutdown /r /t 0")
            win.close()
            
        }
    })
    
    ipcMain.on("cancelApp", () => {
        exec("shutdown /a")
    })

    ipcMain.on("turnOFF" , () => {
        win.hide()
    })
    
})


app.on("window-all-closed", () => {
    if(process.platform !== "darwin") 
        app.quit()
})

