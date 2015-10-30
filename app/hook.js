var ipc = require('ipc');

ipc.on('play-pause', function() {
	clickBtn('play-pause');
});

ipc.on('next-track', function() {
	clickBtn('forward');
});

ipc.on('previous-track', function() {
	clickBtn('rewind');
});

function clickBtn(id) {
	var btn = $("[data-id='" + id + "']");
	btn.click();
}

// Inject jQuery until it works
var injectingInterval = window.setInterval(function() {
	console.log('injecting');
	try {
		window.$ = window.jQuery = require('jquery');
		window.clearInterval(injectingInterval);
	} catch(e) {}
}, 1);