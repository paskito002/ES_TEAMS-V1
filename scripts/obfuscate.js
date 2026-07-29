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
	renameGlobals: false,
	selfDefending: false,
	debugProtection: false,
	disableConsoleOutput: false,
	target: 'node',
});

fs.writeFileSync(outputPath, result.getObfuscatedCode());
console.log(`Obfuscated ${sourcePath} -> ${outputPath}`);
