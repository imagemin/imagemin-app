'use strict';
const path = require('path');
const {BrowserWindow, app, ipcMain} = require('electron');
const {autoUpdater} = require('electron-updater');
const electronNext = require('electron-next');
const imagemin = require('imagemin');
const isDev = require('electron-is-dev');
const log = require('electron-log');

app.setAppUserModelId('com.imagemin.imagemin');
app.disableHardwareAcceleration();

require('electron-debug')({enabled: true});

const port = 3000;

let mainWindow;
let isQuitting;

const isAlreadyRunning = app.makeSingleInstance(() => {
	if (mainWindow) {
		if (mainWindow.isMinimized()) {
			mainWindow.restore();
		}

		mainWindow.show();
	}
});

const createMainWindow = () => {
	const win = new BrowserWindow({
		title: app.getName(),
		width: 800,
		height: 600,
		icon: process.platform === 'linux' && path.join(__dirname, 'static/icon.png'),
		autoHideMenuBar: true,
		titleBarStyle: 'hidden-inset'
	});

	win.on('close', e => {
		if (!isQuitting) {
			e.preventDefault();

			if (process.platform === 'darwin') {
				app.hide();
			} else {
				win.hide();
			}
		}
	});

	if (process.platform === 'darwin') {
		win.setSheetOffset(40);
	}

	const devPath = `http://localhost:${port}`;
	const prodPath = 'file://' + path.join(__dirname, 'out/index.html');

	win.loadURL(isDev ? devPath : prodPath);

	return win;
};

if (isAlreadyRunning) {
	app.quit();
}

if (!isDev && process.platform !== 'linux') {
	autoUpdater.logger = log;
	autoUpdater.logger.transports.file.level = 'info';
	autoUpdater.checkForUpdates();
}

ipcMain.on('drop-file', async (e, files) => {
	await imagemin(files);
});

app.on('ready', async () => {
	await electronNext('./', port);
	mainWindow = createMainWindow();
});

app.on('activate', () => {
	mainWindow.show();
});

app.on('before-quit', () => {
	isQuitting = true;
});
