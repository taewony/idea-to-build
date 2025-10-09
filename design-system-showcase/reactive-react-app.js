#!/usr/bin/env node

/**
 * AI Studio React 앱 자동 설정 스크립트
 * 사용법: node setup.js app-name]
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

// 현재 작업 디렉토리
const cwd = process.cwd();

// app name 확인 (인자 또는 자동 탐색)
let appFolder = process.argv[2];
const outputDir = path.join(cwd, appFolder);

console.log(`\n📦 앱 설정 시작: ${appFolder} → ${outputDir}`);


// 2. npm install 실행
console.log(`\n[2/4] npm dependencies 설치 중...`);
try {
  execSync("npm install", { 
    cwd: outputDir, 
    stdio: "inherit",
    windowsHide: true 
  });
  console.log("✅ npm install 완료");
} catch (error) {
  console.error(`❌ npm install 실패: ${error.message}`);
  process.exit(1);
}

// 3. PostCSS 관련 패키지 설치
console.log(`\n[3/4] PostCSS 설정 중...`);
try {
  execSync("npm install -D postcss autoprefixer", { 
    cwd: outputDir, 
    stdio: "inherit",
    windowsHide: true 
  });
  console.log("✅ PostCSS 패키지 설치 완료");
} catch (error) {
  console.error(`❌ PostCSS 패키지 설치 실패: ${error.message}`);
  process.exit(1);
}

// 4. PostCSS 설정 파일 생성
console.log(`\n[4/4] PostCSS 설정 파일 생성 중...`);
const postcssConfigPath = path.join(outputDir, "postcss.config.mjs");
const postcssConfigContent = `import tailwindcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

export default {
  plugins: [tailwindcss(), autoprefixer()],
}
`;

try {
  fs.writeFileSync(postcssConfigPath, postcssConfigContent);
  console.log("✅ postcss.config.mjs 생성 완료");
} catch (error) {
  console.error(`❌ PostCSS 설정 파일 생성 실패: ${error.message}`);
  process.exit(1);
}

// 완료 메시지 출력
console.log(`\n🎉 설정 완료!`);
console.log(`\n📋 다음 명령어를 실행하여 앱을 시작하세요:\n`);
console.log(`   cd ${appFolder}`);
console.log(`   npm run dev`);