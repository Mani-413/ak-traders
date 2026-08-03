const fs = require('fs');
const vm = require('vm');
const path = require('path');
const filePath = path.join(__dirname, 'main.js');
let text = fs.readFileSync(filePath, 'utf8');
const start = text.indexOf('var TRANSLATIONS = {');
if (start === -1) throw new Error('TRANSLATIONS block not found');
let depth = 0;
let end = -1;
for (let i = start; i < text.length; i++) {
  const ch = text[i];
  if (ch === '{') depth++;
  else if (ch === '}') {
    depth--;
    if (depth === 0) { end = i; break; }
  }
}
if (end === -1) throw new Error('TRANSLATIONS block end not found');
const block = text.slice(start + 'var TRANSLATIONS = '.length, end + 1);
const translations = vm.runInNewContext('(' + block + ')');
function escapeValue(value) {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r');
}
let cleaned = 'var TRANSLATIONS = {\n';
for (const lang of Object.keys(translations)) {
  cleaned += `    ${lang}: {\n`;
  for (const key of Object.keys(translations[lang])) {
    const value = escapeValue(translations[lang][key]);
    cleaned += `      '${key}': '${value}',\n`;
  }
  cleaned += '    },\n';
}
cleaned += '  };';
text = text.slice(0, start) + cleaned + text.slice(end + 1);
fs.writeFileSync(filePath, text, 'utf8');
console.log('Cleaned TRANSLATIONS block in frontend/js/main.js');
