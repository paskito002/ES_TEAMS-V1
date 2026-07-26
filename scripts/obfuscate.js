// Rebuilds an obfuscated ES_TEAMS-V1.js from a readable source file. The readable source
// is kept OUTSIDE this repo (it's public) -- run this against your private copy whenever
// you change the bot's command logic, then commit only the obfuscated output.
//
// Usage: node scripts/obfuscate.js <path-to-readable-source.js> [output-path]
// Requires: npm install --no-save javascript-obfuscator (not a committed dependency,
// since it's only needed to run this script, not to run the bot itself).

const fs = require('fs');
const path = require('path');

const sourcePath = process.argv[2];
const outputPath = process.argv[3] || path.join(__dirname, '..', 'ES_TEAMS-V1.js');

if (!sourcePath) {
	console.error('Usage: node scripts/obfuscate.js <path-to-readable-source.js> [output-path]');
	process.exit(1);
}

let JavaScriptObfuscator;
try {
	JavaScriptObfuscator = require('javascript-obfuscator');
} catch {
	console.error('javascript-obfuscator is not installed. Run: npm install --no-save javascript-obfuscator');
	process.exit(1);
}

const source = fs.readFileSync(sourcePath, 'utf8');

const result = JavaScriptObfuscator.obfuscate(source, {
	compact: true,
	controlFlowFlattening: true,
	controlFlowFlatteningThreshold: 0.75,
	deadCodeInjection: true,
	deadCodeInjectionThreshold: 0.4,
	stringArray: true,
	stringArrayEncoding: ['base64'],
	stringArrayThreshold: 0.75,
	identifierNamesGenerator: 'hexadecimal',
	renameGlobals: false, // must stay off -- the bot reads/writes global.xprefix, global.db, etc. shared with other files in the same process
	selfDefending: false, // self-defending code breaks under process managers/log formatting and actively resists debugging in production -- not worth it for a bot that needs to stay reliable
	debugProtection: false, // same reasoning: can hang or misbehave under Node in ways that are worse than the protection it buys
	disableConsoleOutput: false, // keep console.error/log working -- the crash-safety logging added to this bot depends on it
	target: 'node',
});

fs.writeFileSync(outputPath, result.getObfuscatedCode());
console.log(`Obfuscated ${sourcePath} -> ${outputPath}`);
