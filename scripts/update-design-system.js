#!/usr/bin/env node
/**
 * Update Design System Script
 * 1) Identify Input Files
 * 2) Read Design System Files
 * 3) Update tailwind.config.js safely
 * 4) Ensure TypeScript setup
 * 5) Create Shared Style Guide Components
 */

const fs = require("fs");
const path = require("path");

// ========== 1. Identify Input Files ==========
const args = process.argv.slice(2);
const guideOptionIndex = args.indexOf("--guide");

let guidePath = ".";
if (guideOptionIndex !== -1 && args[guideOptionIndex + 1]) {
  guidePath = args[guideOptionIndex + 1];
}

const mdFile = path.resolve(guidePath, "style-guide.md");
const jsonFile = path.resolve(guidePath, "tokens.json");
const tailwindConfigFile = path.resolve("tailwind.config.js");

if (!fs.existsSync(mdFile) || !fs.existsSync(jsonFile)) {
  console.error(`❌ style-guide.md 또는 tokens.json 파일을 찾을 수 없습니다.`);
  process.exit(1);
}

console.log(`ℹ️ Using style guide: ${mdFile}`);
console.log(`ℹ️ Using tokens file: ${jsonFile}`);

// ========== 2. Read Design System Files ==========
const tokens = JSON.parse(fs.readFileSync(jsonFile, "utf-8"));
const styleGuideContent = fs.readFileSync(mdFile, "utf-8");

// ========== 3. Update tailwind.config.js ==========
if (!fs.existsSync(tailwindConfigFile)) {
  console.error(`❌ tailwind.config.js 파일이 없습니다. 프로젝트 루트에 존재해야 합니다.`);
  process.exit(1);
}

let tailwindConfig = fs.readFileSync(tailwindConfigFile, "utf-8");

// theme.extend 객체를 안전하게 생성
const themeExtend = {
  colors: tokens.colors || {},
  fontFamily: tokens.typography?.fontFamily || {},
  spacing: tokens.spacing || {},
};

// theme.extend 부분을 기존 코드와 안전하게 교체
const extendRegex = /theme:\s*{[\s\S]*?extend:\s*{[\s\S]*?},/m;
const newExtend = `theme: { extend: ${JSON.stringify(themeExtend, null, 2)},`;

if (extendRegex.test(tailwindConfig)) {
  tailwindConfig = tailwindConfig.replace(extendRegex, newExtend);
} else {
  // theme.extend가 없으면 추가
  tailwindConfig = tailwindConfig.replace(
    /theme:\s*{/,
    `theme: { extend: ${JSON.stringify(themeExtend, null, 2)},`
  );
}

fs.writeFileSync(tailwindConfigFile, tailwindConfig, "utf-8");
console.log("✅ Tailwind config updated successfully.");

// ========== 4. Ensure TypeScript Setup ==========
function ensureTSX(file) {
  if (fs.existsSync(file)) {
    const tsxFile = file.replace(".js", ".tsx");
    if (!fs.existsSync(tsxFile)) {
      fs.renameSync(file, tsxFile);
      let content = fs.readFileSync(tsxFile, "utf-8");
      content = content.replace(
        /children: ReactNode/g,
        "children: React.ReactNode"
      );
      fs.writeFileSync(tsxFile, content, "utf-8");
      console.log(`✅ ${tsxFile} created`);
    }
  }
}

ensureTSX("app/layout.js");
ensureTSX("app/page.js");

// ========== 5. Create Shared Style Guide Component & Pages ==========
const styleGuideDir = path.resolve("app/(dev)/style-guide");
if (!fs.existsSync(styleGuideDir)) fs.mkdirSync(styleGuideDir, { recursive: true });

// StyleGuideComponent.tsx
const styleGuideComponentPath = path.resolve(styleGuideDir, "StyleGuideComponent.tsx");
const styleGuideComponentCode = `import React from 'react';

export default function StyleGuideComponent() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Style Guide</h1>
      <pre className="bg-gray-100 p-4 rounded">${styleGuideContent}</pre>
    </div>
  );
}`;

fs.writeFileSync(styleGuideComponentPath, styleGuideComponentCode, "utf-8");
console.log(`✅ StyleGuideComponent created at ${styleGuideComponentPath}`);

// page.tsx for style-guide
const styleGuidePagePath = path.resolve(styleGuideDir, "page.tsx");
const pageCode = `import React from 'react';
import StyleGuideComponent from './StyleGuideComponent';

export default function Page() {
  return <StyleGuideComponent />;
}`;
fs.writeFileSync(styleGuidePagePath, pageCode, "utf-8");

// Update Home Page to use StyleGuideComponent
const homePagePath = path.resolve("app/page.tsx");
if (fs.existsSync(homePagePath)) {
  let homePageCode = fs.readFileSync(homePagePath, "utf-8");
  if (!homePageCode.includes("StyleGuideComponent")) {
    homePageCode = `import StyleGuideComponent from './(dev)/style-guide/StyleGuideComponent';\n` + homePageCode;
    homePageCode += `\nexport default function Home() { return <StyleGuideComponent /> }`;
    fs.writeFileSync(homePagePath, homePageCode, "utf-8");
  }
}

console.log("✅ Style Guide page created and linked to Home page");
console.log("🎉 All steps completed successfully!");
