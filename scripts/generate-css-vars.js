// scripts/generate-css-vars.js
const fs = require('fs');
const path = require('path');
const tokens = require('../tokens.json');

function flatten(obj, prefix = '') {
  return Object.keys(obj).reduce((acc, key) => {
    const val = obj[key];
    const name = prefix ? `${prefix}-${key}` : key;
    if (val && typeof val === 'object') {
      Object.assign(acc, flatten(val, name));
    } else {
      acc[`--${name}`] = val;
    }
    return acc;
  }, {});
}

const flat = flatten(tokens);
let css = `:root {\n`;
for (const k in flat) {
  css += `  ${k}: ${flat[k]};\n`;
}
css += `}\n`;

fs.writeFileSync(path.join(__dirname, '..', 'styles', 'tokens.css'), css);
console.log('Generated tokens.css');
