'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var crashReporter = require('crash-reporter');

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
 * Report crashes to our server
 */

app.on('will-finish-launching', function () {
    crashReporter.start({ productName: 'imagemin-app' });
});

/**
 * On ready
 */

app.on('finish-launching', function () {
    win = new BrowserWindow({ width: 500, height: 450 });
    win.loadUrl('file://' + __dirname + '/index.html');

    win.on('closed', function () {
        win = null;
    });
});
