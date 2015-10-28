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

	mainWindow.on('app-command', function(e, command) {
		console.log(command);
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