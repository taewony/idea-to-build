#!/usr/bin/env node
/**
 * AI Studio 등에서 생성된 React 앱 ZIP을
 * ZIP 이름과 동일한 폴더에 해제 후,
 * npm install + Tailwind/PostCSS 환경 자동 구성 + npm run dev 실행
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import AdmZip from "adm-zip";

const cwd = process.cwd();

// 1️⃣ zip 파일 자동 탐색
const zipFile = fs
  .readdirSync(cwd)
  .find((f) => f.endsWith(".zip"));

if (!zipFile) {
  console.error("❌ ZIP 파일이 이 폴더에 없습니다. (예: design-system-showcase.zip)");
  process.exit(1);
}

const zipBase = path.basename(zipFile, ".zip");
const outputDir = path.join(cwd, zipBase);

console.log(`\n[1/5] Extracting: ${zipFile}`);
const zip = new AdmZip(zipFile);
zip.extractAllTo(outputDir, true);
console.log(`✅ Extracted to ${outputDir}`);

// 2️⃣ package.json 확인 및 보완
console.log(`\n[2/5] Checking package.json...`);
const pkgPath = path.join(outputDir, "package.json");

if (!fs.existsSync(pkgPath)) {
  console.log("⚠️  package.json 없음 — 기본 React 설정 생성 중...");
  const pkg = {
    name: zipBase,
    version: "0.0.0",
    private: true,
    dependencies: {
      react: "^18.2.0",
      "react-dom": "^18.2.0",
      vite: "^6.0.0"
    },
    devDependencies: {
      "@vitejs/plugin-react": "^4.3.0"
    },
    scripts: {
      dev: "vite",
      build: "vite build",
      preview: "vite preview"
    }
  };
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  console.log("✅ package.json 생성 완료");
} else {
  console.log("✅ package.json 존재함");
}

// 3️⃣ dependencies 설치
console.log(`\n[3/5] Installing dependencies (this may take a while)...`);
execSync("npm install", { cwd: outputDir, stdio: "inherit" });

// 4️⃣ Tailwind/PostCSS 환경 구성
console.log(`\n[4/5] Ensuring Tailwind/PostCSS dependencies...`);
execSync("npm install -D @tailwindcss/postcss autoprefixer postcss", {
  cwd: outputDir,
  stdio: "inherit",
});

// PostCSS 설정파일 자동 생성 (필요 시)
const postcssPath = path.join(outputDir, "postcss.config.mjs");
if (!fs.existsSync(postcssPath)) {
  fs.writeFileSync(
    postcssPath,
    `import tailwindcss from '@tailwindcss/postcss'\nimport autoprefixer from 'autoprefixer'\n\nexport default {\n  plugins: [tailwindcss(), autoprefixer()],\n}\n`
  );
  console.log("✅ postcss.config.mjs 생성 완료");
} else {
  console.log("✅ postcss.config.mjs 이미 존재함");
}

// 5️⃣ 실행 스크립트 감지 후 실행
console.log(`\n[5/5] Starting app...`);
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

if (pkg.scripts?.dev) {
  console.log("➡️  Detected 'dev' script. Running npm run dev...");
  execSync("npm run dev", { cwd: outputDir, stdio: "inherit" });
} else if (pkg.scripts?.start) {
  console.log("➡️  Detected 'start' script. Running npm start...");
  execSync("npm start", { cwd: outputDir, stdio: "inherit" });
} else {
  console.log("⚠️  실행 가능한 스크립트를 찾지 못했습니다.");
  console.log("   직접 실행해 주세요:");
  console.log("   cd", zipBase);
  console.log("   npm run dev  또는  npm start");
}
