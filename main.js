'use strict';

const {app} = require('electron');
const {BrowserWindow} = require('electron');

/**
 * Keep a global reference of the window object, if you don't, the window will
 * be closed automatically when the javascript object is GCed
 */

var win = null;

/**
 * Quit when all windows are closed
 */

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

/**
 * On ready
 */

app.on('ready', function () {
	win = new BrowserWindow({
		icon: './media/icon.png'
	});

	win.setSize(475, 400);
	win.center();
	win.loadURL('file://' + __dirname + '/index.html');
	win.webContents.on('did-finish-load',() => {
		win.setTitle('Imagemin ' + app.getVersion());
	});
	//win.toggleDevTools();

	win.on('closed', function () {
		win = null;
	});
});
