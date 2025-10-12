#!/usr/bin/env node
/**
 * CDN Tailwind + inline tailwind.config.js 기반 index.html을
 * 로컬 Tailwind(v4) + globals.css 기반으로 변환.
 *
 * 결과:
 *  - globals.css: 스크립트가 존재하는 경로에 생성됨
 *  - index.html: CDN 제거, globals.css 링크 추가
 *  - tailwind.config.js 필요 없음 (globals.css의 @theme 기반)
 */

import fs from "fs";
import path from "path";

const cwd = process.cwd();
// const scriptDir = path.dirname(new URL(import.meta.url).pathname);
const htmlPath = path.join(cwd, "index.html");
const globalsCssPath = path.join(cwd, "globals.css");

if (!fs.existsSync(htmlPath)) {
  console.error("❌ index.html 파일을 찾을 수 없습니다.");
  process.exit(1);
}

console.log(`\n[1/3] index.html 변환 시작...`);
let html = fs.readFileSync(htmlPath, "utf8");

// 1️⃣ tailwind CDN 및 inline config 제거
html = html.replace(/<script src="https:\/\/cdn\.tailwindcss\.com[^>]*><\/script>/, "");
html = html.replace(/<script>\s*tailwind\.config\s*=\s*\{[\s\S]*?\};\s*<\/script>/m, "");

// 2️⃣ globals.css 링크 추가
if (!html.includes("globals.css")) {
  html = html.replace(
    /<\/head>/,
    `  <link rel="stylesheet" href="./globals.css">\n</head>`
  );
  console.log("✅ index.html에 globals.css 링크 추가 완료");
}

// 3️⃣ globals.css 생성
console.log(`\n[2/3] globals.css 생성 중...`);
fs.writeFileSync(
  globalsCssPath,
  `/* ===========================================================
   Tailwind Local Global Styles (auto-generated)
   기존 CDN tailwind.config.js 테마값이 반영됨
   =========================================================== */

@import "tailwindcss";

@theme {
  --color-primary: #137fec;
  --color-background-light: #f6f7f8;
  --color-background-dark: #101922;

  --font-family-display: "Inter", sans-serif;

  --radius: 0.25rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-full: 9999px;
}

/* ✅ 기본 타이포그래피 & 다크 모드 */
body {
  @apply bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)]
         font-[var(--font-family-display)]
         text-gray-800 dark:text-gray-200;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ✅ 텍스트, 버튼, 카드 등 확장 가능 */
.btn-primary {
  @apply bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg hover:opacity-90;
}

.card {
  @apply bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm;
}
`
);

console.log(`✅ globals.css 생성 완료: ${globalsCssPath}`);
console.log(`\n[3/3] index.html 저장...`);
fs.writeFileSync(htmlPath, html);
console.log("✅ index.html 변환 완료 🎉");

console.log(`
✨ 변환 성공!
- index.html → CDN Tailwind 제거, ./globals.css import 추가
- globals.css → Tailwind @theme 기반 로컬 스타일 정의
- tailwind.config.js 파일 불필요
`);
