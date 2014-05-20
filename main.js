'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var crashReporter = require('crash-reporter');

/**
 * Report crashes to our server
 */

crashReporter.start();

/**
 * Keep a global reference of the window object, if you don't, the window will
 * be closed automatically when the javascript object is GCed
 */

var mainWindow = null;

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
    mainWindow = new BrowserWindow({ width: 400, height: 400 });
    mainWindow.loadUrl('file://' + __dirname + '/index.html');
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
});
