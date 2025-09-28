// scripts/tokens-to-tailwind.js
// Generates my-app/app/globals.css from docs/tokens.json

const fs = require('fs');
const path = require('path');

const tokensPath = path.resolve(__dirname, '../docs/tokens.json');
const globalsCssPath = path.resolve(__dirname, '../my-app/app/globals.css');

function unwrap(token) {
  if (token == null) return token;
  if (typeof token === 'object' && !Array.isArray(token) && 'value' in token) return token.value;
  return token;
}

function toKebabCase(str) {
  return String(str)
    .replace(/([a-z09])([A-Z])/g, '$1-$2')
    .replace(/["'\s_]+/g, '-')
    .toLowerCase();
}

function walkLeaves(obj, prefix) {
  const out = [];
  function walk(node, parts) {
    if (node == null) return;
    if (typeof node !== 'object' || Array.isArray(node)) {
      const name = `${prefix}-${parts.map(toKebabCase).join('-')}`;
      out.push([name, unwrap(node)]);
      return;
    }
    for (const [k, v] of Object.entries(node)) {
      walk(v, parts.concat(k));
    }
  }
  walk(obj, []);
  return out;
}

function generateRootVars(tokens) {
  const pairs = [];

  // [MODIFIED] 접두사를 '--color'에서 '--colors'로 변경
  if (tokens.colors) pairs.push(...walkLeaves(tokens.colors, '--colors'));
  if (tokens.spacing) pairs.push(...walkLeaves(tokens.spacing, '--spacing'));
  if (tokens.radii) pairs.push(...walkLeaves(tokens.radii, '--radius'));
  if (tokens.shadows) pairs.push(...walkLeaves(tokens.shadows, '--shadow'));

  if (tokens.typography && typeof tokens.typography === 'object') {
    for (const [key, typo] of Object.entries(tokens.typography)) {
      const k = toKebabCase(key);
      if (!typo) continue;
      if (typo.fontSize !== undefined) pairs.push([`--typo-${k}-font-size`, unwrap(typo.fontSize)]);
      if (typo.lineHeight !== undefined) pairs.push([`--typo-${k}-line-height`, unwrap(typo.lineHeight)]);
      if (typo.fontWeight !== undefined) pairs.push([`--typo-${k}-font-weight`, unwrap(typo.fontWeight)]);
      if (typo.letterSpacing !== undefined) pairs.push([`--typo-${k}-letter-spacing`, unwrap(typo.letterSpacing)]);
      if (typo.fontFamily !== undefined) pairs.push([`--typo-${k}-font-family`, unwrap(typo.fontFamily)]);
    }
  }

  return pairs.map(([name, val]) => `  ${name}: ${val};`).join('\n');
}

function generateThemeInline(tokens) {
  const pairs = [];

  // [MODIFIED] 접두사를 '--color'에서 '--colors'로 변경
  if (tokens.colors) pairs.push(...walkLeaves(tokens.colors, '--colors'));
  if (tokens.spacing) pairs.push(...walkLeaves(tokens.spacing, '--spacing'));
  if (tokens.radii) pairs.push(...walkLeaves(tokens.radii, '--radius'));
  if (tokens.shadows) pairs.push(...walkLeaves(tokens.shadows, '--shadow'));
  
  // [MODIFIED] 타이포그래피 관련 코드는 여기서 완전히 제거합니다.

  const seen = new Set();
  const uniq = pairs.filter(([k]) => {
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });

  // [MODIFIED] 원래 스크립트의 값 직접 할당 방식으로 되돌립니다.
  // 이 방식이 색상, 간격 등에서 정상 동작했으므로 그대로 유지합니다.
  return uniq.map(([name, val]) => `  ${name}: ${val};`).join('\n');
}

function generateTypographyUtilities(tokens) {
  const classes = [];
  if (tokens.typography && typeof tokens.typography === 'object') {
    for (const [key, typo] of Object.entries(tokens.typography)) {
      const k = toKebabCase(key);
      if (!typo) continue;

      const rules = [];
      if (typo.fontSize !== undefined) rules.push(`  font-size: var(--typo-${k}-font-size);`);
      if (typo.lineHeight !== undefined) rules.push(`  line-height: var(--typo-${k}-line-height);`);
      if (typo.fontWeight !== undefined) rules.push(`  font-weight: var(--typo-${k}-font-weight);`);
      if (typo.letterSpacing !== undefined) rules.push(`  letter-spacing: var(--typo-${k}-letter-spacing);`);
      if (typo.fontFamily !== undefined) rules.push(`  font-family: var(--typo-${k}-font-family);`);

      if (rules.length > 0) {
        classes.push(`\n.typo-${k} {\n${rules.join('\n')}\n}`);
      }
    }
  }
  return classes.join('\n');
}

function generateGlobalsCss(tokens) {
  const root = generateRootVars(tokens);
  const themeInline = generateThemeInline(tokens);
  const typographyUtils = generateTypographyUtilities(tokens);

  return `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n:root {\n${root}\n}\n\n@theme inline {\n${themeInline}\n}\n${typographyUtils}\n`;
}

function main() {
  try {
    if (!fs.existsSync(tokensPath)) throw new Error(`tokens.json not found at ${tokensPath}`);
    const raw = fs.readFileSync(tokensPath, 'utf8');
    const tokens = JSON.parse(raw);

    const css = generateGlobalsCss(tokens);
    fs.writeFileSync(globalsCssPath, css, 'utf8');
    console.log('✅ globals.css written to', globalsCssPath);
    console.log('Next: restart your dev server if it is running.');
  } catch (err) {
    console.error('❌ failed:', err);
    process.exit(1);
  }
}

main();