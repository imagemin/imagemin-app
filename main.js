'use strict';

const {app, BrowserWindow} = require('electron');

/**
 * Keep a global reference of the window object, if you don't, the window will
 * be closed automatically when the javascript object is GCed
 */

let win = null;

/**
 * Quit when all windows are closed
 */

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

/**
 * On ready
 */

app.on('ready', () => {
	win = new BrowserWindow({
		icon: './media/icon.png'
	});

	win.setSize(475, 400);
	win.center();
	win.loadFile('index.html');
	win.webContents.on('did-finish-load', () => {
		win.setTitle('Imagemin ' + app.getVersion());
	});
	// Win.toggleDevTools();

	win.on('closed', () => {
		win = null;
	});
});
