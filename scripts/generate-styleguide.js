#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class StyleGuideGenerator {
  constructor() {
    // 프로젝트 이름 인자 처리
    const projectName = process.argv[2] || 'my-project';
    this.basePath = path.join(process.cwd(), projectName);
	
    this.tokensPath = path.join(process.cwd(), 'source', 'tokens.json');
    this.globalCssPath = path.join(this.basePath, 'app', 'globals.css');
    this.styleGuidePath = path.join(this.basePath, 'app', 'style-guide', 'page.jsx');
    this.appPagePath = path.join(this.basePath, 'app', 'page.jsx');
	
	console.log(`📁 프로젝트 경로: ${this.basePath}`);
    console.log(`📄 tokens.json 경로: ${this.tokensPath}`);
	console.log(`📄 globals css 경로: ${this.globalCssPath}`);
  }

  checkExistingFiles() {
    const filesToCheck = [
      { path: this.appPagePath, name: 'app/page.jsx' },
      { path: this.globalCssPath, name: 'app/globals.css' },
	  { path: this.tokensPath, name: 'tokens.json' }
    ];

    filesToCheck.forEach(file => {
      if (fs.existsSync(file.path)) {
        console.log(`✅ ${file.name} 존재 확인`);
      } else {
        console.log(`⚠️  ${file.name} 없음 - 새로 생성될 것임`);
      }
    });
  }

  readTokens() {
    try {
      const tokensData = fs.readFileSync(this.tokensPath, 'utf8');
      return JSON.parse(tokensData);
    } catch (error) {
      console.error('❌ tokens.json 파일을 읽을 수 없습니다:', error.message);
      process.exit(1);
    }
  }

  // CSS 블록을 안전하게 추출하는 함수
  extractCSSBlocks(css) {
    const blocks = {
      imports: [],
      rootVars: [],
      theme: [],
      mediaQueries: [],
      bodyStyle: '',
      other: []
    };

    const lines = css.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('@import')) {
        blocks.imports.push(line);
      } else if (line.startsWith('@theme')) {
        blocks.theme.push(line);
      } else if (line.startsWith('@media')) {
        // 간단한 미디어 쿼리 추출
        let mediaBlock = line;
        let braceCount = (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;
        
        for (let j = i + 1; j < lines.length && braceCount >= 0; j++) {
          mediaBlock += '\n' + lines[j];
          braceCount += (lines[j].match(/{/g) || []).length - (lines[j].match(/}/g) || []).length;
          if (braceCount < 0) break;
        }
        blocks.mediaQueries.push(mediaBlock);
      } else if (line.startsWith(':root')) {
        blocks.rootVars.push(line);
      } else if (line.startsWith('body')) {
        blocks.bodyStyle = line;
      }
    }

    return blocks;
  }

  // Tailwind v4.1 방식으로 CSS 생성
  generateEnhancedCSS(tokens, existingCSS) {
    // 기존 CSS 블록 추출
    const blocks = this.extractCSSBlocks(existingCSS);
    
    let enhancedCSS = '';

    // 1. 기존 @import 유지
    if (blocks.imports.length > 0) {
      enhancedCSS += blocks.imports.join('\n') + '\n\n';
    }

    // 2. Design System 토큰 추가
    enhancedCSS += `/* Design System Tokens - Auto-generated from tokens.json */\n`;
    enhancedCSS += `/* Tailwind CSS v4.1 CSS-first configuration */\n\n`;
    
    enhancedCSS += `:root {\n`;
    
    // 기존 :root 변수들 유지
    if (blocks.rootVars.length > 0) {
      const rootVars = blocks.rootVars[0];
      const varLines = rootVars.split('\n').filter(line => 
        line.includes('--') && line.includes(':')
      );
      varLines.forEach(line => {
        enhancedCSS += `  ${line.trim()}\n`;
      });
    } else {
      enhancedCSS += `  --background: #ffffff;\n  --foreground: #171717;\n`;
    }

    // 새로운 디자인 토큰 변수들 추가
    enhancedCSS += this.generateTokenVariablesV4(tokens);
    
    enhancedCSS += `}\n\n`;

    // 3. @theme 블록 유지
    if (blocks.theme.length > 0) {
      enhancedCSS += blocks.theme.join('\n') + '\n\n';
    } else {
      // 기본 @theme 블록 추가
      enhancedCSS += `@theme inline {\n`;
      enhancedCSS += `  --color-background: var(--background);\n`;
      enhancedCSS += `  --color-foreground: var(--foreground);\n`;
      enhancedCSS += `  --font-sans: var(--font-geist-sans);\n`;
      enhancedCSS += `  --font-mono: var(--font-geist-mono);\n`;
      enhancedCSS += `}\n\n`;
    }

    // 4. 미디어 쿼리 유지
    if (blocks.mediaQueries.length > 0) {
      enhancedCSS += blocks.mediaQueries.join('\n\n') + '\n\n';
    }

    // 5. @layer base에 개선된 body 스타일 추가
    enhancedCSS += `@layer base {\n`;
    enhancedCSS += `  * {\n`;
    enhancedCSS += `    box-sizing: border-box;\n`;
    enhancedCSS += `  }\n\n`;
    enhancedCSS += `  body {\n`;
    enhancedCSS += `    background: var(--background);\n`;
    enhancedCSS += `    color: var(--foreground);\n`;
    enhancedCSS += `    font-family: Arial, Helvetica, sans-serif;\n`;
    enhancedCSS += `    -webkit-font-smoothing: antialiased;\n`;
    enhancedCSS += `    -moz-osx-font-smoothing: grayscale;\n`;
    enhancedCSS += `    margin: 0;\n`;
    enhancedCSS += `    padding: 0;\n`;
    enhancedCSS += `  }\n`;
    enhancedCSS += `}\n\n`;

    // 6. @layer utilities 추가
    enhancedCSS += this.generateUtilityClassesV4(tokens);

    // 7. @layer components 추가
    enhancedCSS += this.generateComponentStylesV4(tokens);

    return enhancedCSS;
  }

  // Tailwind v4.1 방식의 토큰 변수 생성
  generateTokenVariablesV4(tokens) {
    let variables = '\n  /* Color Tokens */\n';
    
    // Colors
    Object.entries(tokens.colors).forEach(([category, values]) => {
      Object.entries(values).forEach(([key, value]) => {
        variables += `  --color-${category}-${key}: ${value};\n`;
      });
    });

    variables += '\n  /* Typography Tokens */\n';
    // Typography - 정확한 CSS 변수 이름 사용
    Object.entries(tokens.typography).forEach(([type, styles]) => {
      Object.entries(styles).forEach(([property, value]) => {
        const cssProperty = this.cssPropertyMap[property] || property;
        if (property === 'fontFamily') {
          variables += `  --font-${type}: ${value};\n`;
        } else if (property === 'color') {
          variables += `  --color-${type}: ${value};\n`;
        } else {
          variables += `  --${type}-${cssProperty.replace('-', '')}: ${value};\n`;
        }
      });
    });

    variables += '\n  /* Spacing Tokens */\n';
    Object.entries(tokens.spacing).forEach(([size, value]) => {
      variables += `  --spacing-${size}: ${value};\n`;
    });

    variables += '\n  /* Radius Tokens */\n';
    Object.entries(tokens.radii).forEach(([size, value]) => {
      variables += `  --radius-${size}: ${value};\n`;
    });

    variables += '\n  /* Shadow Tokens */\n';
    Object.entries(tokens.shadows).forEach(([type, value]) => {
      variables += `  --shadow-${type}: ${value};\n`;
    });

    return variables;
  }

  // Tailwind v4.1 방식의 유틸리티 클래스 생성
  generateUtilityClassesV4(tokens) {
    let utilityClasses = `/* Custom Utility Classes - Tailwind v4.1 */\n`;
    utilityClasses += `@layer utilities {\n\n`;

    // Color utilities
    utilityClasses += `  /* Color Utilities */\n`;
    Object.entries(tokens.colors).forEach(([category, values]) => {
      Object.entries(values).forEach(([key, value]) => {
        utilityClasses += `  .bg-${category}-${key} {\n`;
        utilityClasses += `    background-color: var(--color-${category}-${key});\n`;
        utilityClasses += `  }\n`;
        
        utilityClasses += `  .text-${category}-${key} {\n`;
        utilityClasses += `    color: var(--color-${category}-${key});\n`;
        utilityClasses += `  }\n`;
        
        utilityClasses += `  .border-${category}-${key} {\n`;
        utilityClasses += `    border-color: var(--color-${category}-${key});\n`;
        utilityClasses += `  }\n\n`;
      });
    });

    // Typography utilities
    utilityClasses += `  /* Typography Utilities */\n`;
    Object.entries(tokens.typography).forEach(([type, styles]) => {
      utilityClasses += `  .text-${type} {\n`;
      Object.entries(styles).forEach(([property, value]) => {
        const cssProperty = this.cssPropertyMap[property] || property;
        if (property === 'fontFamily') {
          utilityClasses += `    font-family: var(--font-${type});\n`;
        } else if (property === 'color') {
          utilityClasses += `    color: var(--color-${type});\n`;
        } else {
          utilityClasses += `    ${cssProperty}: var(--${type}-${cssProperty.replace('-', '')});\n`;
        }
      });
      utilityClasses += `  }\n\n`;
    });

    // Spacing utilities
    utilityClasses += `  /* Spacing Utilities */\n`;
    Object.entries(tokens.spacing).forEach(([size, value]) => {
      utilityClasses += `  .m-${size} { margin: var(--spacing-${size}); }\n`;
      utilityClasses += `  .p-${size} { padding: var(--spacing-${size}); }\n`;
    });
    utilityClasses += `\n`;

    // Radius utilities
    utilityClasses += `  /* Radius Utilities */\n`;
    Object.entries(tokens.radii).forEach(([size, value]) => {
      utilityClasses += `  .rounded-${size} { border-radius: var(--radius-${size}); }\n`;
    });
    utilityClasses += `\n`;

    // Shadow utilities
    utilityClasses += `  /* Shadow Utilities */\n`;
    Object.entries(tokens.shadows).forEach(([type, value]) => {
      utilityClasses += `  .shadow-${type} { box-shadow: var(--shadow-${type}); }\n`;
    });

    utilityClasses += `}\n\n`;
    return utilityClasses;
  }

  // 컴포넌트 스타일 생성
  generateComponentStylesV4(tokens) {
    let componentStyles = `/* Component Styles */\n`;
    componentStyles += `@layer components {\n`;
    
    // 중앙 정렬 컨테이너
    componentStyles += `  .style-guide-container {\n`;
    componentStyles += `    max-width: 1200px;\n`;
    componentStyles += `    margin: 0 auto;\n`;
    componentStyles += `    padding: 2rem;\n`;
    componentStyles += `  }\n\n`;
    
    // 색상 스워치
    componentStyles += `  .color-swatch {\n`;
    componentStyles += `    width: 80px;\n`;
    componentStyles += `    height: 80px;\n`;
    componentStyles += `    border-radius: 8px;\n`;
    componentStyles += `    border: 1px solid #e5e7eb;\n`;
    componentStyles += `    margin-bottom: 0.5rem;\n`;
    componentStyles += `  }\n\n`;
    
    // 타이포그래피 예제
    componentStyles += `  .typography-example {\n`;
    componentStyles += `    border-left: 4px solid var(--color-primary-base);\n`;
    componentStyles += `    padding-left: 1rem;\n`;
    componentStyles += `    margin-bottom: 2rem;\n`;
    componentStyles += `  }\n\n`;
    
    // 섹션 스타일
    componentStyles += `  .style-guide-section {\n`;
    componentStyles += `    margin-bottom: 3rem;\n`;
    componentStyles += `    padding: 2rem;\n`;
    componentStyles += `    background: white;\n`;
    componentStyles += `    border-radius: 12px;\n`;
    componentStyles += `    box-shadow: 0 2px 8px rgba(0,0,0,0.08);\n`;
    componentStyles += `  }\n\n`;
    
    // 색상 그리드
    componentStyles += `  .color-grid {\n`;
    componentStyles += `    display: grid;\n`;
    componentStyles += `    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));\n`;
    componentStyles += `    gap: 1rem;\n`;
    componentStyles += `  }\n`;
    
    componentStyles += `}\n\n`;
    return componentStyles;
  }

  cssPropertyMap = {
    fontWeight: 'font-weight',
    fontSize: 'font-size',
    lineHeight: 'line-height',
    letterSpacing: 'letter-spacing',
    fontStyle: 'font-style',
    fontFamily: 'font-family'
  };

  // Style Guide 페이지 생성 (Tailwind 기본 클래스 표시를 맨 아래로 이동)
  generateStyleGuidePage(tokens) {
    return `'use client';

import React from 'react';

export default function StyleGuide() {
  // Tailwind 기본 클래스 사용 현황
  const tailwindUsage = {
    layout: [
      'min-h-screen', 'p-8', 'grid', 'grid-cols-2', 'md:grid-cols-3', 
      'lg:grid-cols-4', 'gap-6', 'flex', 'flex-col', 'flex-wrap',
      'items-center', 'items-end', 'justify-center', 'text-center',
      'mx-auto', 'max-w-2xl', 'space-y-8', 'space-y-4', 'w-full',
      'h-20', 'w-20', 'h-16', 'w-16', 'mb-4', 'mb-6', 'mb-12', 'mb-2',
      'mt-2', 'ml-4', 'p-6', 'p-4', 'px-6', 'py-3'
    ],
    typography: [
      'text-xs', 'text-sm', 'text-gray-600', 'text-gray-900', 'text-white',
      'font-medium', 'font-bold', 'block', 'inline-block'
    ],
    background: [
      'bg-white', 'bg-gray-50', 'bg-gray-100', 'bg-primary-ultraLight'
    ],
    border: [
      'border', 'border-gray-200', 'border-primary-base', 'rounded-lg',
      'rounded-md', 'border-l-4'
    ],
    effects: [
      'shadow-sm', 'transition-colors'
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="style-guide-container">
        {/* 헤더 섹션 - primary text color 적용 */}
        <header className="style-guide-section text-center">
          <h1 className="text-heading mb-4 text-primary-text">Design System Style Guide</h1>
          <p className="text-body text-neutral-base max-w-2xl mx-auto">
            Tailwind CSS v4.1 방식으로 자동 생성된 스타일 가이드
          </p>
        </header>

        {/* Colors Section - primary text color 적용 */}
        <section className="style-guide-section">
          <h2 className="text-subtitle mb-6 text-primary-text">Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            ${this.generateColorSwatchesJSX(tokens.colors)}
          </div>
        </section>

        {/* Typography Section - primary text color 적용 */}
        <section className="style-guide-section">
          <h2 className="text-subtitle mb-6 text-primary-text">Typography</h2>
          <div className="space-y-8">
            ${this.generateTypographyExamplesJSX(tokens.typography)}
          </div>
        </section>

        {/* Spacing Section - primary text color 적용 */}
        <section className="style-guide-section">
          <h2 className="text-subtitle mb-6 text-primary-text">Spacing</h2>
          <div className="space-y-4">
            ${this.generateSpacingExamplesJSX(tokens.spacing)}
          </div>
        </section>

        {/* Radius Section - primary text color 적용 */}
        <section className="style-guide-section">
          <h2 className="text-subtitle mb-6 text-primary-text">Border Radius</h2>
          <div className="flex flex-wrap gap-6 items-end">
            ${this.generateRadiusExamplesJSX(tokens.radii)}
          </div>
        </section>

        {/* Shadows Section - primary text color 적용 */}
        <section className="style-guide-section">
          <h2 className="text-subtitle mb-6 text-primary-text">Shadows</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${this.generateShadowExamplesJSX(tokens.shadows)}
          </div>
        </section>

        {/* Tailwind 기본 클래스 사용 현황 표시 - 맨 아래로 이동 */}
        <section className="style-guide-section bg-yellow-50 border-l-4 border-yellow-400">
          <h2 className="text-subtitle mb-4 text-yellow-800">
            🎯 Tailwind 기본 클래스 사용 현황 (AI 분석용)
          </h2>
          <div className="bg-white p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(tailwindUsage).map(([category, classes]) => (
                <div key={category} className="border rounded-lg p-3">
                  <h4 className="font-bold text-sm mb-2 capitalize text-primary-text">{category}</h4>
                  <div className="flex flex-wrap gap-1">
                    {classes.map(cls => (
                      <span key={cls} className="bg-gray-100 text-neutral-base px-2 py-1 rounded text-xs">
                        {cls}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>분석 포인트:</strong> 이 페이지는 tokens.json 커스텀 클래스와 Tailwind 기본 클래스를 혼용합니다. 
                tokens.json에 없는 레이아웃, 간격, 반응형 클래스들은 Tailwind 기본 클래스를 사용했습니다.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// 컴포넌트 함수들
${this.generateComponentFunctions(tokens)}
`;
  }

  // Color 스워치 생성 (JSX 형식) - tokens color 적용
  generateColorSwatchesJSX(colors) {
    let jsx = '';
    Object.entries(colors).forEach(([category, values]) => {
      Object.entries(values).forEach(([key, value]) => {
        jsx += `
          <div key="${category}-${key}" className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
            <div 
              className="color-swatch"
              style={{ backgroundColor: "${value}" }}
            ></div>
            <span className="text-caption text-center font-medium text-primary-text">
              ${category}-${key}
            </span>
            <code className="text-xs mt-1 text-neutral-base">${value}</code>
          </div>`;
      });
    });
    return jsx;
  }

  // 타이포그래피 예제 생성 (JSX 형식) - tokens color 적용
  generateTypographyExamplesJSX(typography) {
    let jsx = '';
    Object.entries(typography).forEach(([type, styles]) => {
      const sampleText = type.includes('kr') ? 
        '한글 타이포그래피 예제: 디자인 시스템과 컴포넌트 가이드' : 
        'Typography Example: Design System and Component Guide';
      
      jsx += `
        <div key="${type}" className="typography-example bg-white rounded-lg p-4">
          <div className="text-${type} mb-3 text-primary-text">
            ${sampleText}
          </div>
          <div className="text-caption space-y-2 bg-gray-50 p-3 rounded text-neutral-base">
            <div><strong>Class:</strong> <code className="bg-primary-ultraLight px-2 py-1 rounded text-primary-text">.text-${type}</code></div>
            <div><strong>Font:</strong> ${styles.fontFamily}</div>
            <div><strong>Size:</strong> ${styles.fontSize}</div>
            <div><strong>Weight:</strong> ${styles.fontWeight}</div>
            ${styles.lineHeight ? `<div><strong>Line Height:</strong> ${styles.lineHeight}</div>` : ''}
          </div>
        </div>`;
    });
    return jsx;
  }

  // Spacing 예제 생성 (JSX 형식) - tokens color 적용
  generateSpacingExamplesJSX(spacing) {
    let jsx = '';
    Object.entries(spacing).forEach(([size, value]) => {
      jsx += `
        <div key="${size}" className="flex items-center bg-white p-3 rounded">
          <div 
            className="bg-primary-base h-6 rounded"
            style={{ width: "${value}" }}
          ></div>
          <span className="text-caption ml-4 font-medium text-primary-text">
            ${size} <span className="text-neutral-base">(${value})</span>
          </span>
        </div>`;
    });
    return jsx;
  }

  // Radius 예제 생성 (JSX 형식) - tokens color 적용
  generateRadiusExamplesJSX(radii) {
    let jsx = '';
    Object.entries(radii).forEach(([size, value]) => {
      jsx += `
        <div key="${size}" className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm">
          <div 
            className="w-20 h-20 bg-primary-base flex items-center justify-center"
            style={{ borderRadius: "${value}" }}
          >
            <span className="text-white text-sm font-medium">${size}</span>
          </div>
          <span className="text-caption mt-2 font-medium text-primary-text">${size}</span>
          <code className="text-xs text-neutral-base">${value}</code>
        </div>`;
    });
    return jsx;
  }

  // Shadow 예제 생성 (JSX 형식) - tokens color 적용
  generateShadowExamplesJSX(shadows) {
    let jsx = '';
    Object.entries(shadows).forEach(([type, value]) => {
      jsx += `
        <div key="${type}" className="bg-white p-4 rounded-lg">
          <div 
            className="w-full h-24 bg-gray-50 rounded-lg flex items-center justify-center"
            style={{ boxShadow: "${value}" }}
          >
            <span className="text-caption font-medium text-primary-text">${type}</span>
          </div>
          <div className="mt-3">
            <code className="text-xs bg-gray-100 p-2 rounded block text-neutral-base">${value}</code>
          </div>
        </div>`;
    });
    return jsx;
  }

  // 컴포넌트 함수 생성
  generateComponentFunctions(tokens) {
    return `
function ColorSwatch({ name, value, className = '' }) {
  return (
    <div className={\`flex flex-col items-center p-3 bg-white rounded-lg shadow-sm \${className}\`}>
      <div 
        className="color-swatch"
        style={{ backgroundColor: value }}
      />
      <span className="text-caption text-center font-medium text-primary-text">
        {name}
      </span>
      <code className="text-xs mt-1 text-neutral-base">{value}</code>
    </div>
  );
}

function TypographyExample({ type, styles, sampleText, className = '' }) {
  return (
    <div className={\`typography-example bg-white rounded-lg p-4 \${className}\`}>
      <div className={\`text-$\{type} mb-3 text-primary-text\`}>
        {sampleText}
      </div>
      <div className="text-caption space-y-2 bg-gray-50 p-3 rounded text-neutral-base">
        <div><strong>Class:</strong> <code className="bg-primary-ultraLight px-2 py-1 rounded text-primary-text">.text-{type}</code></div>
        <div><strong>Font:</strong> {styles.fontFamily}</div>
        <div><strong>Size:</strong> {styles.fontSize}</div>
        <div><strong>Weight:</strong> {styles.fontWeight}</div>
        {styles.lineHeight && <div><strong>Line Height:</strong> {styles.lineHeight}</div>}
      </div>
    </div>
  );
}
`;
  }

  generate() {
    console.log('🚀 개선된 Style Guide 생성 시작...\n');
    console.log('📋 프로젝트 경로 기반 처리, 섹션 타이틀 색상 적용, Tailwind 분석 섹션 하단 이동\n');

    this.checkExistingFiles();
    console.log('');

    const tokens = this.readTokens();
    
    let existingCSS = '';
    try {
      existingCSS = fs.readFileSync(this.globalCssPath, 'utf8');
      console.log('📖 기존 globals.css 읽기 완료');
    } catch (error) {
      console.log('ℹ️  기존 globals.css 없음 - 새로 생성');
    }

    const enhancedCSS = this.generateEnhancedCSS(tokens, existingCSS);
    
    // CSS 검증
    console.log('🔍 CSS 문법 검증 중...');
    if (this.validateCSS(enhancedCSS)) {
      fs.mkdirSync(path.dirname(this.globalCssPath), { recursive: true });
      fs.writeFileSync(this.globalCssPath, enhancedCSS);
      console.log('✅ globals.css 업데이트 완료');
    } else {
      const safeCSS = this.generateSafeCSS(tokens);
      fs.mkdirSync(path.dirname(this.globalCssPath), { recursive: true });
      fs.writeFileSync(this.globalCssPath, safeCSS);
      console.log('✅ 안전한 globals.css 생성 완료');
    }

    const pageContent = this.generateStyleGuidePage(tokens);
    fs.mkdirSync(path.dirname(this.styleGuidePath), { recursive: true });
    fs.writeFileSync(this.styleGuidePath, pageContent);
    console.log('✅ style-guide 페이지 생성 완료');

    if (!fs.existsSync(this.appPagePath)) {
      this.createDefaultAppPage();
    }

    console.log('\n🎉 모든 파일 생성 완료!');
    console.log('📁 http://localhost:3000/style-guide 에서 확인하세요.');
  }

  // CSS 검증
  validateCSS(css) {
    const openBraces = (css.match(/{/g) || []).length;
    const closeBraces = (css.match(/}/g) || []).length;
    
    if (openBraces !== closeBraces) {
      console.error(`❌ CSS 중괄호 불일치: {=${openBraces}, }=${closeBraces}`);
      return false;
    }
    return true;
  }

  // 안전한 CSS 생성
  generateSafeCSS(tokens) {
    return `@import "tailwindcss";

/* Design System Tokens - Safe Generation */
:root {
  --background: #ffffff;
  --foreground: #171717;
  
  /* Color Tokens */
  ${this.generateTokenVariablesV4(tokens)}
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

@layer base {
  * {
    box-sizing: border-box;
  }
  
  body {
    background: var(--background);
    color: var(--foreground);
    font-family: Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
  }
}

${this.generateUtilityClassesV4(tokens)}
${this.generateComponentStylesV4(tokens)}`;
  }

  createDefaultAppPage() {
    const defaultPageContent = `export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-heading mb-4 text-primary-text">Welcome to My Project</h1>
        <p className="text-body mb-6 text-neutral-base">
          This is a Next.js project with Tailwind CSS v4.1 and Design System.
        </p>
        <a 
          href="/style-guide" 
          className="bg-primary-base text-primary-text px-6 py-3 rounded-lg hover:bg-primary-light transition-colors inline-block"
        >
          View Style Guide
        </a>
      </div>
    </div>
  );
}`;

    fs.mkdirSync(path.dirname(this.appPagePath), { recursive: true });
    fs.writeFileSync(this.appPagePath, defaultPageContent);
    console.log('✅ 기본 app/page.jsx 생성 완료');
  }
}

// app/layout.css에 대한 설명
console.log(`💡 참고: app/layout.css는 Next.js 13+의 App Router에서 사용되는 레이아웃 스타일 파일입니다.
   globals.css는 전역 스타일을, layout.css는 특정 레이아웃 컴포넌트의 스타일을 담당합니다.
   이 스크립트는 globals.css를 생성/수정하며, layout.css는 별도로 관리됩니다.\n`);

// 스크립트 실행
const generator = new StyleGuideGenerator();
generator.generate();