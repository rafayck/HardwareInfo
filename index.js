//Import dependencies
const { app, BrowserWindow, globalShortcut } = require("electron");
var log = require('electron-log');
var path = require('path');
var url = require('url')
//var server = require('./bin/www');

//Initialize the ejs parser
//var ejs = new electronEjs({ key: 'my value' }, {});
 let win = null;
//Now you can read EJS files
app.on('ready', function()
{
      console.log('on ready')
  //Create the new window
  mainWindow = new BrowserWindow({ width: 700, height: 1000 });
  mainWindow.loadURL('http://localhost:3000');

});
app.on("activate", function() {
  if (mainWindow === null) {
    createWindow();
  }
});