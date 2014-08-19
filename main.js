'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');

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

app.on('finish-launching', function () {
	win = new BrowserWindow({
		icon: './media/icon.png'
	});

	win.setSize(475, 400);
	win.center();
	win.setTitle('Imagemin ' + app.getVersion());
	win.loadUrl('file://' + __dirname + '/index.html');

	win.on('closed', function () {
		win = null;
	});
});
