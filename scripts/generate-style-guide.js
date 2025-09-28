#!/usr/bin/env node
/**
 * Usage: node generate-style-guide.js my-project
 *
 * - tokens.json 기반으로 globals.css, style-guide/page.jsx 생성
 * - page.jsx 기존 파일은 유지됨
 * - Style Guide 페이지 중앙 정렬, 한글 문구 추가, UI 요소 섹션 확장
 */

const fs = require("fs");
const path = require("path");

const projectName = process.argv[2];
if (!projectName) {
  console.error("Usage: node generate-style-guide.js <project-name>");
  process.exit(1);
}

const projectRoot = path.join(process.cwd(), projectName);
const tokensPath = path.join(projectRoot, "tokens.json");
const appDir = path.join(projectRoot, "app");
const globalCSSPath = path.join(appDir, "globals.css");
const styleGuideDir = path.join(appDir, "style-guide");
const styleGuidePage = path.join(styleGuideDir, "page.jsx");

// ===== Step 1: Read tokens.json =====
if (!fs.existsSync(tokensPath)) {
  console.error(`Error: ${tokensPath} not found`);
  process.exit(1);
}

const tokens = JSON.parse(fs.readFileSync(tokensPath, "utf-8"));

// ===== Step 2: Generate globals.css =====
let cssVars = [];
Object.entries(tokens.colors || {}).forEach(([group, colors]) => {
  Object.entries(colors).forEach(([name, value]) => {
    cssVars.push(`  --color-${group}-${name}: ${value};`);
  });
});

Object.entries(tokens.typography || {}).forEach(([name, props]) => {
  if (props.fontFamily) cssVars.push(`  --font-${name}: ${props.fontFamily};`);
  if (props.fontSize) cssVars.push(`  --font-size-${name}: ${props.fontSize};`);
  if (props.lineHeight) cssVars.push(`  --line-height-${name}: ${props.lineHeight};`);
  if (props.fontWeight) cssVars.push(`  --font-weight-${name}: ${props.fontWeight};`);
  if (props.letterSpacing) cssVars.push(`  --letter-spacing-${name}: ${props.letterSpacing};`);
});

Object.entries(tokens.radii || {}).forEach(([k, v]) => cssVars.push(`  --radius-${k}: ${v};`));
Object.entries(tokens.shadows || {}).forEach(([k, v]) => cssVars.push(`  --shadow-${k}: ${v};`));
Object.entries(tokens.spacing || {}).forEach(([k, v]) => cssVars.push(`  --spacing-${k}: ${v};`));
Object.entries(tokens.animations || {}).forEach(([k, v]) => cssVars.push(`  --animation-${k}: ${v};`));

const globalsCSS = `@import "tailwindcss";

:root {
${cssVars.join("\n")}
}

body {
  font-family: var(--font-body, sans-serif);
  background: var(--color-neutral-background, #fff);
  color: var(--color-neutral-dark, #000);
}
`;

fs.writeFileSync(globalCSSPath, globalsCSS);
console.log(`✅ Generated ${globalCSSPath}`);

// ===== Step 3: Generate style-guide/page.jsx =====
if (!fs.existsSync(styleGuideDir)) fs.mkdirSync(styleGuideDir);

const styleGuideJSX = `export default function StyleGuidePage() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-center space-y-12">
      <h1 className="text-4xl font-bold mb-8">Style Guide 스타일 가이드</h1>

      {/* Colors */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">🎨 Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          ${Object.entries(tokens.colors || {})
            .map(([group, colors]) =>
              Object.entries(colors)
                .map(
                  ([name, value]) => `
          <div className="p-4 border rounded shadow-sm" style={{ backgroundColor: "${value}" }}>
            <div className="text-sm text-white font-bold">${group}-${name}</div>
            <div className="text-xs text-white">${value}</div>
          </div>`
                )
                .join("")
            )
            .join("")}
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">🔤 Typography</h2>
        <div className="space-y-6">
          ${Object.entries(tokens.typography || {})
            .map(([name, props]) => {
              return `<div>
                <div className="text-sm mb-1">${name}</div>
                <div style={{
                  fontFamily: "${props.fontFamily}",
                  fontSize: "${props.fontSize}",
                  lineHeight: "${props.lineHeight}",
                  fontWeight: ${props.fontWeight},
                  letterSpacing: "${props.letterSpacing || "normal"}"
                }}>
                  The quick brown fox jumps over the lazy dog. — 빠른 갈색 여우가 게으른 개를 뛰어넘습니다.
                </div>
              </div>`;
            })
            .join("")}
        </div>
      </section>

      {/* Buttons & Radii */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">🔘 Buttons & Radii</h2>
        <div className="flex flex-wrap justify-center gap-4">
          ${Object.entries(tokens.radii || {})
            .map(([name, radius]) => {
              return `<button 
                className="px-4 py-2 bg-blue-500 text-white shadow-md"
                style={{ borderRadius: "${radius}" }}
              >
                ${name} Button
              </button>`;
            })
            .join("")}
        </div>
      </section>

      {/* Spacing Examples */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">📏 Spacing</h2>
        <div className="flex flex-col items-center gap-2">
          ${Object.entries(tokens.spacing || {})
            .map(([name, value]) => {
              return `<div className="w-full flex items-center gap-4">
                <div className="bg-blue-200" style={{ height: "16px", width: "${value}" }}></div>
                <span className="text-sm">${name}: ${value}</span>
              </div>`;
            })
            .join("")}
        </div>
      </section>

      {/* Shadows Examples */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">🌑 Shadows</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          ${Object.entries(tokens.shadows || {})
            .map(([name, value]) => {
              return `<div className="p-4 border rounded" style={{ boxShadow: "${value}" }}>
                <div className="text-sm">${name}</div>
              </div>`;
            })
            .join("")}
        </div>
      </section>
    </div>
  );
}
`;

fs.writeFileSync(styleGuidePage, styleGuideJSX);
console.log(`✅ Generated ${styleGuidePage}`);

// ===== Step 4: Ensure page.jsx untouched =====
const mainPage = path.join(appDir, "page.jsx");
if (fs.existsSync(mainPage)) {
  console.log(`ℹ️  ${mainPage} left untouched`);
} else {
  console.warn(`⚠️  ${mainPage} not found, skipped check`);
}

console.log("🎉 Style guide generation completed!");
