const electron = require("electron"),
  app = electron.app,
  BrowserWindow = electron.BrowserWindow;
const AutoLaunch = require('auto-launch');

let mainWindow;

function createWindow() {

  let autoLaunch = new AutoLaunch({
    name: 'electron-with-express',
    path: app.getPath('exe'),
  });
  autoLaunch.isEnabled().then((isEnabled) => {
    if (!isEnabled) autoLaunch.enable();
  });
  
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 760,
    height: 960
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  //mainWindow.webContents.openDevTools();
  // mainWindow.on("close", () => {
  //   mainWindow.webContents.send("stop-server");
  // });
  // mainWindow.on("closed", () => {
  //   mainWindow = null;
  // });

}

app.on("ready", createWindow);
app.on("browser-window-created", function(e, window) {
  window.setMenu(null);
});

// app.on("window-all-closed", function() {
//   if (process.platform !== "darwin") {
//     app.quit();
//   }
// });

app.on("activate", function() {
  if (mainWindow === null) {
    createWindow();
  }
});
