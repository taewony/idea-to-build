// scripts/tokens2css.js
// Convert tokens.json → app/globals.css for Tailwind v4 (@theme)

const fs = require("fs");
const path = require("path");

// Load tokens.json (must exist at project root)
const tokens = require("../tokens.json");

// camelCase, snake_case → kebab-case 변환
const toKebab = (str) =>
  str.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/_/g, "-").toLowerCase();

function generateThemeVars(tokens) {
  let cssVars = [];

  // 🎨 Colors
  if (tokens.colors) {
    for (const [group, values] of Object.entries(tokens.colors)) {
      for (const [key, value] of Object.entries(values)) {
        cssVars.push(`  --color-${toKebab(group)}-${toKebab(key)}: ${value};`);
      }
    }
  }

  // 📏 Spacing
  if (tokens.spacing) {
    for (const [key, value] of Object.entries(tokens.spacing)) {
      cssVars.push(`  --spacing-${toKebab(key)}: ${value};`);
    }
  }

  // 🔠 Typography (fontSize + lineHeight 같이 처리)
  if (tokens.typography) {
    for (const [name, style] of Object.entries(tokens.typography)) {
      if (style.fontSize) {
        let size = style.fontSize;
        if (style.lineHeight) {
          size = `${size} / ${style.lineHeight}`;
        }
        cssVars.push(`  --font-${toKebab(name)}: ${size};`);
      }
      if (style.fontFamily) {
        cssVars.push(
          `  --font-${toKebab(name)}-family: ${style.fontFamily};`
        );
      }
      if (style.fontWeight) {
        cssVars.push(
          `  --font-${toKebab(name)}-weight: ${style.fontWeight};`
        );
      }
      if (style.letterSpacing) {
        cssVars.push(
          `  --font-${toKebab(name)}-tracking: ${style.letterSpacing};`
        );
      }
      if (style.fontStyle) {
        cssVars.push(
          `  --font-${toKebab(name)}-style: ${style.fontStyle};`
        );
      }
      if (style.color) {
        cssVars.push(`  --font-${toKebab(name)}-color: ${style.color};`);
      }
    }
  }

  // ⭕ Radii
  if (tokens.radii) {
    for (const [key, value] of Object.entries(tokens.radii)) {
      cssVars.push(`  --radius-${toKebab(key)}: ${value};`);
    }
  }

  // ☁️ Shadows
  if (tokens.shadows) {
    for (const [key, value] of Object.entries(tokens.shadows)) {
      cssVars.push(`  --shadow-${toKebab(key)}: ${value};`);
    }
  }

  // ✨ Animations
  if (tokens.animations) {
    for (const [key, value] of Object.entries(tokens.animations)) {
      cssVars.push(`  --animation-${toKebab(key)}: ${value};`);
    }
  }

  return cssVars.join("\n");
}

function generateGlobalsCSS() {
  const themeVars = generateThemeVars(tokens);
  return `@tailwind base;
@tailwind components;
@tailwind utilities;

@theme {
${themeVars}
}
`;
}

function main() {
  const outPath = path.join(__dirname, "../app/globals.css");
  const cssContent = generateGlobalsCSS();
  fs.writeFileSync(outPath, cssContent, "utf8");
  console.log(`✅ globals.css generated at ${outPath}`);
}

main();
