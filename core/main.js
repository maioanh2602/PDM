const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
const remote = require('electron').remote;
let windows;

//this function will create window
function createWindow() {
  // create BrowserWindow
  windows = new BrowserWindow({
        width: 1366,
        height: 768,
        icon:__dirname+'/img/book.png',
        frame: false,
        show: false,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        }});
  windows.setMenu(null);
  // load index.html
  windows.loadURL(url.format({
    pathname: path.join(__dirname, '../src/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  windows.once('ready-to-show', () => {
    windows.show()
  })
  // Show devtools
  windows.webContents.openDevTools();

  windows.on('close', () => {
    win = null;
  });
}
  //allow renderer process reuse
  app.allowRendererProcessReuse = true;

  // run create windows function
  app.on('ready', createWindow);

  // quit when all windows are close
  app.on('window-all-closed', () => {
    if(process.platform != 'darwin') {
      app.quit();
    }})

  //activate
  app.on('activate',() =>{
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  })
