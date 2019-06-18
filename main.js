const {app, BrowserWindow, ipcMain, dialog} = require('electron');
const AppStore = require('./src/store.js');
const fileStore = new AppStore({name: 'ImgDate'});

class AppWindow extends BrowserWindow {
    constructor(config, fileLocation) {
        const baseConfig = {
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true //使用node api；
            }
        };
        const finalConfig = {...baseConfig, ...config};
        super(finalConfig);
        this.loadFile(fileLocation);
    }
}

app.on('ready', () => {
    const mainWindow = new AppWindow({}, './src/index.html');
    mainWindow.webContents.on('did-finish-load', () => {
        //加载渲染仓库数据
        mainWindow.send('massage', fileStore.getTracks());
    });
    ipcMain.on('btn-upload', (event, item) => {
        let uploadWindow = new AppWindow(
            {
                width: 600,
                height: 400,
                parent: mainWindow
            },
            './src/upload.html'
        );

        uploadWindow.on('closed', () => {
            console.log('closed  window');
            uploadWindow = null;
        });
        ipcMain.on('btn-choose', (event, item) => {
            dialog.showOpenDialog(
                {
                    browserWindow: {
                        title: '图片选择'
                    },
                    properties: ['openFile', 'multiSelections'],
                    filters: [{name: 'Images', extensions: ['jpg', 'png', 'gif']}]
                },
                path => {
                    if (Array.isArray(path)) {
                        let updateFile = fileStore.addTracks(path).getTracks();
                        uploadWindow = null;
                        console.log('success');
                        mainWindow.send('massage', updateFile);
                    }
                }
            );
        });
    });
});
