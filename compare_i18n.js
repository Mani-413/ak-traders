const fs = require('fs');
const path = require('path');
const htmlDir = path.join(__dirname, 'frontend');
const jsFile = path.join(htmlDir, 'js', 'main.js');
const partialsFile = path.join(htmlDir, 'js', 'partials.js');
const htmlFiles = fs.readdirSync(htmlDir).filter(f => f.endsWith('.html'));
const keys = new Set();
const regex = /data-i18n(?:-html|-placeholder|-title)?="([^"]+)"/g;
function scanFile(filePath){
  const text = fs.readFileSync(filePath, 'utf8');
  regex.lastIndex = 0;
  let m;
  while ((m = regex.exec(text))) {
    const key = m[1];
    if (!key || key.includes('+')) continue;
    keys.add(key);
  }
}
for (const file of htmlFiles) {
  scanFile(path.join(htmlDir, file));
}
scanFile(partialsFile);
const partialsText = fs.readFileSync(partialsFile, 'utf8');
const navItemRegex = /\[\s*"[^"]*"\s*,\s*"[^"]*"\s*,\s*"([a-z0-9_.]+)"\s*\]/g;
let navMatch;
while ((navMatch = navItemRegex.exec(partialsText))) {
  keys.add(navMatch[1]);
}
const jsText = fs.readFileSync(jsFile, 'utf8');
const translationsMatch = jsText.match(/var TRANSLATIONS = \{([\s\S]*?)\}\s*;\s*/);
if(!translationsMatch){
  console.error('Could not find TRANSLATIONS object in main.js');
  process.exit(1);
}
const dict = new Set();
const regex2 = /'([a-z0-9_.]+)'\s*:/g;
let m2;
while ((m2 = regex2.exec(translationsMatch[1]))) {
  if (m2[1] !== 'en' && m2[1] !== 'ta') dict.add(m2[1]);
}
const usageRegex = /getTranslation\((?:'|")([a-z0-9_.]+)(?:'|")\)|strings\[(?:'|")([a-z0-9_.]+)(?:'|")\]/g;
while ((m2 = usageRegex.exec(jsText))) {
  const key = m2[1] || m2[2];
  if (key) keys.add(key);
}
const missing = [...keys].filter(k => !dict.has(k)).sort();
const extra = [...dict].filter(k => !keys.has(k)).sort();
console.log('missing', missing.length);
missing.forEach(k => console.log(k));
console.log('extra', extra.length);
extra.forEach(k => console.log(k));
