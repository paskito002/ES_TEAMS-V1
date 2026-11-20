const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const dir = path.join(__dirname, '..', 'test');
const files = fs.readdirSync(dir).filter((name) => name.endsWith('.test.js')).sort().map((name) => path.join(dir, name));
if (!files.length) {
	console.error('No test files found in ' + dir);
	process.exit(1);
}
const result = spawnSync(process.execPath, ['--test', ...files], { stdio: 'inherit' });
process.exit(result.status === null ? 1 : result.status);
