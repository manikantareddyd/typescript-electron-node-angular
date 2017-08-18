import * as electron from 'electron';
import * as path from 'path';
import * as url from 'url';
var server = require("../server/app");
class App {
    public app: Electron.App;
    public mainWindow;
    constructor() {
        this.app = electron.app;
        
        this.app.on('ready', this.createWindow);
    }

    createWindow() {
        
        this.mainWindow = new electron.BrowserWindow({
            titleBarStyle: "hidden"
        });

        // this.mainWindow.loadURL(url.format({
        //     pathname: path.join(__dirname, "..", 'ui', 'index.html'),
        //     protocol: 'file:',
        //     slashes: true
        // }))
        this.mainWindow.loadURL('http://localhost:3000/');
    }
}

export default new App().app;