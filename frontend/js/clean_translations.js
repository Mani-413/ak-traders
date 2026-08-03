const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'main.js');
const text = fs.readFileSync(filePath, 'utf8');
const start = text.indexOf('var TRANSLATIONS = {');
const end = text.indexOf('};', start);
if (start === -1 || end === -1) {
  console.error('Could not find TRANSLATIONS object');
  process.exit(1);
}
const objectText = text.slice(start, end + 2);
const langBlocks = {};
let currentLang = null;
const lines = objectText.split(/\r?\n/);
for (let line of lines) {
  const langMatch = line.match(/\s*([a-z]{2})\s*:\s*\{/);
  if (langMatch) {
    currentLang = langMatch[1];
    langBlocks[currentLang] = {};
    continue;
  }
  if (currentLang && line.match(/^\s*\}/)) {
    currentLang = null;
    continue;
  }
  if (currentLang) {
    const pair = line.match(/\s*'([^']+)'\s*:\s*'(.*)',?$/);
    if (pair) {
      const key = pair[1];
      let value = pair[2];
      // restore escaped single quotes and possible other escaped chars
      value = value.replace(/\\'/g, "'");
      value = value.replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\t/g, '\t');
      langBlocks[currentLang][key] = value;
    }
  }
}
for (const lang of ['en','ta']) {
  const keys = Object.keys(langBlocks[lang] || {}).sort();
  console.log(`\n// --- ${lang} ---`);
  console.log(`  ${lang}: {`);
  for (const key of keys) {
    const raw = langBlocks[lang][key].replace(/'/g, "\\'").replace(/\n/g, '\\n');
    console.log(`      '${key}': '${raw}',`);
  }
  console.log('  },');
}
