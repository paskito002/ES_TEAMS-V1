const path = require('path');
const { spawn } = require('child_process');

const BASE_DELAY_MS = 3000;
const MAX_DELAY_MS = 2 * 60 * 1000;
const STABLE_AFTER_MS = 60 * 1000;
let quickExits = 0;

function restartAfter(startedAt) {
	quickExits = Date.now() - startedAt < STABLE_AFTER_MS ? quickExits + 1 : 0;
	const delay = Math.min(MAX_DELAY_MS, BASE_DELAY_MS * 2 ** Math.max(0, quickExits - 1));
	console.log('Restarting in ' + Math.round(delay / 1000) + 's...');
	setTimeout(start, delay);
}

function start() {
	const startedAt = Date.now();
	let restartRequested = false;
	const args = [path.join(__dirname, 'index.js'), ...process.argv.slice(2)];
	const p = spawn(process.argv[0], args, {
		stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
	}).on('message', data => {
		if (data == 'reset') {
			console.log('Restarting Bot...');
			restartRequested = true;
			p.kill();
			restartAfter(startedAt);
		}
	}).on('exit', code => {
		console.error('Exited with code:', code);
		if (restartRequested) return;
		if (code == '.' || code == 1 || code == 0) restartAfter(startedAt);
	});
}
start();
