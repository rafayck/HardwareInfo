// const electron = require('electron');
// const path = require('path');
// const url = require('url');
// const ejse = require('ejs-electron')

// // SET ENV
// process.env.NODE_ENV = 'development';

// const {app, BrowserWindow, Menu, ipcMain} = electron;


// let mainWindow;
// let addWindow;

// // Listen for app to be ready
// app.on('ready', function(){
//   // Create new window
//   mainWindow = new BrowserWindow({});
//   // Load html in window
//   mainWindow.loadURL(url.format({
//     // pathname: path.join(__dirname, '/views/index.ejs'),
//     pathname: path.join(__dirname, '/views/index.ejs'),
//     protocol: 'file:',
//     slashes:true
//   }));
//   // Quit app when closed
//   mainWindow.on('closed', function(){
//     app.quit();
//   });

//   // Build menu from template
//   const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
//   // Insert menu
//   Menu.setApplicationMenu(mainMenu);
// });

// // Handle add item window
// function createAddWindow(){
//   addWindow = new BrowserWindow({
//     width: 300,
//     height:200,
//     title:'Add Shopping List Item'
//   });
//   addWindow.loadURL(url.format({
//     pathname: path.join(__dirname, '/views/index.ejs'),
//     protocol: 'file:',
//     slashes:true
//   }));
//   // Handle garbage collection
//   addWindow.on('close', function(){
//     addWindow = null;
//   });
// }

// // Catch item:add
// ipcMain.on('item:add', function(e, item){
//   mainWindow.webContents.send('item:add', item);
//   addWindow.close(); 
//   // Still have a reference to addWindow in memory. Need to reclaim memory (Grabage collection)
//   //addWindow = null;
// });

// // Create menu template
// const mainMenuTemplate =  [
//   // Each object is a dropdown
//   {
//     label: 'File',
//     submenu:[
//       {
//         label:'Add Item',
//         click(){
//           createAddWindow();
//         }
//       },
//       {
//         label:'Clear Items',
//         click(){
//           mainWindow.webContents.send('item:clear');
//         }
//       },
//       {
//         label: 'Quit',
//         accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
//         click(){
//           app.quit();
//         }
//       }
//     ]
//   }
// ];

// // If OSX, add empty object to menu
// if(process.platform == 'darwin'){
//   mainMenuTemplate.unshift({});
// }

// // Add developer tools option if in dev
// if(process.env.NODE_ENV !== 'production'){
//   mainMenuTemplate.push({
//     label: 'Developer Tools',
//     submenu:[
//       {
//         role: 'reload'
//       },
//       {
//         label: 'Toggle DevTools',
//         accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
//         click(item, focusedWindow){
//           focusedWindow.toggleDevTools();
//         }
//       }
//     ]
//   });
// }

// const {app, BrowserWindow} = require('electron')
// const ejse = require('ejs-electron')
// const index = require('./routes/index.js')


// let mainWindow
 

// app.on('ready', () => {
//     mainWindow = new BrowserWindow()
//     mainWindow.loadURL('file://' + __dirname + '/views/index.ejs')
// })

//Import dependencies
var electron = require('electron');
var BrowserWindow = electron.BrowserWindow;
// var electronEjs = require('electron-ejs')();
var path = require('path');
//Initialize the app
var app = electron.app;

// var rexec = require('remote-exec');
// var connection_options = {
//     port: 22,
//     username: 'dashboardefl',
//     privateKey: '',
//     passphrase: 'engro_foods'
// };

// var hosts = [
  
//     '127.0.0.1'
// ];

// var cmds = [
//     'npm start'
// ];
// console.log(cmds);
// rexec(hosts, cmds, connection_options, function(err){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('Great Success!!');
//     }
// });
//var server = require('./bin/www');

//Initialize the ejs parser
//var ejs = new electronEjs({ key: 'my value' }, {});
 
//Now you can read EJS files

app.on('ready', function()
{
  //Create the new window
  mainWindow = new BrowserWindow({ width: 700, height: 1000 });
  mainWindow.loadURL('http://localhost:3000');
  //mainWindow.openDevTools;
  //More app configuration
  // ....
 //hiddenWindow = new BrowserWindow({show: true});
  // //Load the ejs file
  // mainWindow.loadURL('file://' + __dirname + '/views/index.ejs');
  // hiddenWindow.loadURL(path.join('file://', __dirname, '/index.html'));
});
app.on("activate", function() {
  if (mainWindow === null) {
    createWindow();
  }
});