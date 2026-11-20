const test = require('node:test');
const assert = require('node:assert/strict');
const Module = require('module');
const path = require('path');
const { EventEmitter } = require('events');

function runSupervisor() {
	const children = [];
	const clock = { now: 0, seq: 0, timers: [] };
	const saved = { setTimeout: global.setTimeout, now: Date.now, load: Module._load, log: console.log, error: console.error };
	global.setTimeout = (fn, ms) => { clock.timers.push({ id: ++clock.seq, at: clock.now + ms, fn }); return clock.seq; };
	Date.now = () => 1700000000000 + clock.now;
	console.log = () => {};
	console.error = () => {};
	Module._load = function (request) {
		if (request === 'child_process') {
			return { spawn: () => { const child = new EventEmitter(); child.kill = () => {}; children.push(child); return child; } };
		}
		return saved.load.apply(this, arguments);
	};
	const file = path.join(__dirname, '..', 'start.js');
	delete require.cache[require.resolve(file)];
	require(file);
	const advance = (ms) => {
		const target = clock.now + ms;
		for (;;) {
			const due = clock.timers.filter((t) => t.at <= target).sort((a, b) => a.at - b.at)[0];
			if (!due) break;
			clock.now = due.at;
			clock.timers = clock.timers.filter((t) => t.id !== due.id);
			due.fn();
		}
		clock.now = target;
	};
	const restore = () => { global.setTimeout = saved.setTimeout; Date.now = saved.now; Module._load = saved.load; console.log = saved.log; console.error = saved.error; };
	return { children, advance, restore };
}

test('a crashing bot is restarted with growing delays, never instantly', () => {
	const sup = runSupervisor();
	try {
		assert.equal(sup.children.length, 1);
		const delays = [];
		for (let i = 0; i < 6; i++) {
			const before = sup.children.length;
			sup.children[sup.children.length - 1].emit('exit', 1);
			sup.advance(1000);
			assert.equal(sup.children.length, before, 'no immediate restart');
			let waited = 1000;
			while (sup.children.length === before) { sup.advance(1000); waited += 1000; }
			delays.push(waited);
		}
		assert.deepEqual(delays, [3000, 6000, 12000, 24000, 48000, 96000]);
		sup.children[sup.children.length - 1].emit('exit', 1);
		let capped = 0;
		const before = sup.children.length;
		while (sup.children.length === before) { sup.advance(1000); capped += 1000; }
		assert.equal(capped, 120000);
	} finally { sup.restore(); }
});

test('a bot that ran for a while restarts quickly again', () => {
	const sup = runSupervisor();
	try {
		sup.children[0].emit('exit', 1);
		sup.advance(3000);
		sup.children[1].emit('exit', 1);
		sup.advance(6000);
		assert.equal(sup.children.length, 3);
		sup.advance(5 * 60 * 1000);
		sup.children[2].emit('exit', 0);
		sup.advance(3000);
		assert.equal(sup.children.length, 4, 'delay reset to 3s after a stable run');
	} finally { sup.restore(); }
});

test('a requested reset restarts once and the killed process does not restart it twice', () => {
	const sup = runSupervisor();
	try {
		sup.children[0].emit('message', 'reset');
		sup.children[0].emit('exit', null);
		sup.advance(10000);
		assert.equal(sup.children.length, 2);
	} finally { sup.restore(); }
});

test('other exit codes do not restart the bot', () => {
	const sup = runSupervisor();
	try {
		sup.children[0].emit('exit', 2);
		sup.advance(10 * 60 * 1000);
		assert.equal(sup.children.length, 1);
	} finally { sup.restore(); }
});
