var app = require('app');
var BrowserWindow = require('browser-window');
var globalShortcut = require('global-shortcut');
var path = require('path');
var fs = require('fs');

app.on('ready', function() {
	var boundsPath = path.join(app.getDataPath() + '/bounds.json');
	var bounds = getBounds();
	var mainWindow = new BrowserWindow({
		x: bounds.x,
		y: bounds.y,
		width: bounds.width,
		height: bounds.height,
		'title-bar-style': 'hidden'
	});

	mainWindow.loadUrl('file://' + __dirname + '/index.html');

	mainWindow.on('close', function() {
		var newBounds = mainWindow.getBounds();
		fs.writeFileSync(boundsPath, JSON.stringify(newBounds));
		mainWindow.webContents.send('close');
		mainWindow = null;
	});

	globalShortcut.register("MediaNextTrack", function() {
		mainWindow.webContents.send('next-track');
	});

	globalShortcut.register("MediaPreviousTrack", function() {
		mainWindow.webContents.send('previous-track');
	});

	globalShortcut.register("MediaPlayPause", function() {
		mainWindow.webContents.send('play-pause');
	});

	registerLocalShortcut('CmdOrCtrl+R', mainWindow, function() {
		mainWindow.webContents.send('reload');
	});

	registerLocalShortcut('CmdOrCtrl+Left', mainWindow, function() {
		mainWindow.webContents.send('go-back');
	});

	registerLocalShortcut('CmdOrCtrl+Right', mainWindow, function() {
		mainWindow.webContents.send('go-forward');
	});

	function getBounds() {
		try {
			var data = JSON.parse(fs.readFileSync(boundsPath, 'utf8'));
			return data;
		} catch(e) {
			return {};
		}
	}
});

function registerLocalShortcut(accelerator, window, callback) {
	window.on('focus', function() {
		globalShortcut.register(accelerator, callback);	
	});

	window.on('blur', function() {
		globalShortcut.unregister(accelerator);
	});
}