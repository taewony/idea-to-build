'use client';

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
            
          <div key="primary-base" className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
            <div 
              className="color-swatch"
              style={{ backgroundColor: "#FF9966" }}
            ></div>
            <span className="text-caption text-center font-medium text-primary-text">
              primary-base
            </span>
            <code className="text-xs mt-1 text-neutral-base">#FF9966</code>
          </div>
          <div key="primary-light" className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
            <div 
              className="color-swatch"
              style={{ backgroundColor: "#FFB28C" }}
            ></div>
            <span className="text-caption text-center font-medium text-primary-text">
              primary-light
            </span>
            <code className="text-xs mt-1 text-neutral-base">#FFB28C</code>
          </div>
          <div key="primary-lighter" className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
            <div 
              className="color-swatch"
              style={{ backgroundColor: "#FFD2B3" }}
            ></div>
            <span className="text-caption text-center font-medium text-primary-text">
              primary-lighter
            </span>
            <code className="text-xs mt-1 text-neutral-base">#FFD2B3</code>
          </div>
          <div key="primary-background" className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
            <div 
              className="color-swatch"
              style={{ backgroundColor: "#FFF4E6" }}
            ></div>
            <span className="text-caption text-center font-medium text-primary-text">
              primary-background
            </span>
            <code className="text-xs mt-1 text-neutral-base">#FFF4E6</code>
          </div>
          <div key="primary-ultraLight" className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
            <div 
              className="color-swatch"
              style={{ backgroundColor: "#FFFAF4" }}
            ></div>
            <span className="text-caption text-center font-medium text-primary-text">
              primary-ultraLight
            </span>
            <code className="text-xs mt-1 text-neutral-base">#FFFAF4</code>
          </div>
          <div key="primary-text" className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
            <div 
              className="color-swatch"
              style={{ backgroundColor: "#2C1810" }}
            ></div>
            <span className="text-caption text-center font-medium text-primary-text">
              primary-text
            </span>
            <code className="text-xs mt-1 text-neutral-base">#2C1810</code>
          </div>
          <div key="neutral-dark" className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
            <div 
              className="color-swatch"
              style={{ backgroundColor: "#3D2B1F" }}
            ></div>
            <span className="text-caption text-center font-medium text-primary-text">
              neutral-dark
            </span>
            <code className="text-xs mt-1 text-neutral-base">#3D2B1F</code>
          </div>
          <div key="neutral-base" className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
            <div 
              className="color-swatch"
              style={{ backgroundColor: "#6B4F3F" }}
            ></div>
            <span className="text-caption text-center font-medium text-primary-text">
              neutral-base
            </span>
            <code className="text-xs mt-1 text-neutral-base">#6B4F3F</code>
          </div>
          <div key="neutral-light" className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
            <div 
              className="color-swatch"
              style={{ backgroundColor: "#BFA89B" }}
            ></div>
            <span className="text-caption text-center font-medium text-primary-text">
              neutral-light
            </span>
            <code className="text-xs mt-1 text-neutral-base">#BFA89B</code>
          </div>
          <div key="neutral-background" className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
            <div 
              className="color-swatch"
              style={{ backgroundColor: "#EDE3DA" }}
            ></div>
            <span className="text-caption text-center font-medium text-primary-text">
              neutral-background
            </span>
            <code className="text-xs mt-1 text-neutral-base">#EDE3DA</code>
          </div>
          <div key="accent-teal" className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
            <div 
              className="color-swatch"
              style={{ backgroundColor: "#82E3E1" }}
            ></div>
            <span className="text-caption text-center font-medium text-primary-text">
              accent-teal
            </span>
            <code className="text-xs mt-1 text-neutral-base">#82E3E1</code>
          </div>
          <div key="accent-greenSuccess" className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
            <div 
              className="color-swatch"
              style={{ backgroundColor: "#7ED957" }}
            ></div>
            <span className="text-caption text-center font-medium text-primary-text">
              accent-greenSuccess
            </span>
            <code className="text-xs mt-1 text-neutral-base">#7ED957</code>
          </div>
          <div key="accent-yellowWarm" className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
            <div 
              className="color-swatch"
              style={{ backgroundColor: "#FFD166" }}
            ></div>
            <span className="text-caption text-center font-medium text-primary-text">
              accent-yellowWarm
            </span>
            <code className="text-xs mt-1 text-neutral-base">#FFD166</code>
          </div>
          <div key="accent-celebration" className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
            <div 
              className="color-swatch"
              style={{ backgroundColor: "#FF70A6" }}
            ></div>
            <span className="text-caption text-center font-medium text-primary-text">
              accent-celebration
            </span>
            <code className="text-xs mt-1 text-neutral-base">#FF70A6</code>
          </div>
          <div key="accent-motivation" className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
            <div 
              className="color-swatch"
              style={{ backgroundColor: "#FF9770" }}
            ></div>
            <span className="text-caption text-center font-medium text-primary-text">
              accent-motivation
            </span>
            <code className="text-xs mt-1 text-neutral-base">#FF9770</code>
          </div>
          <div key="wood-base" className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
            <div 
              className="color-swatch"
              style={{ backgroundColor: "#8B5E3C" }}
            ></div>
            <span className="text-caption text-center font-medium text-primary-text">
              wood-base
            </span>
            <code className="text-xs mt-1 text-neutral-base">#8B5E3C</code>
          </div>
          <div key="wood-light" className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
            <div 
              className="color-swatch"
              style={{ backgroundColor: "#A97461" }}
            ></div>
            <span className="text-caption text-center font-medium text-primary-text">
              wood-light
            </span>
            <code className="text-xs mt-1 text-neutral-base">#A97461</code>
          </div>
          <div key="wood-dark" className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
            <div 
              className="color-swatch"
              style={{ backgroundColor: "#5A3823" }}
            ></div>
            <span className="text-caption text-center font-medium text-primary-text">
              wood-dark
            </span>
            <code className="text-xs mt-1 text-neutral-base">#5A3823</code>
          </div>
          </div>
        </section>

        {/* Typography Section - primary text color 적용 */}
        <section className="style-guide-section">
          <h2 className="text-subtitle mb-6 text-primary-text">Typography</h2>
          <div className="space-y-8">
            
        <div key="heading" className="typography-example bg-white rounded-lg p-4">
          <div className="text-heading mb-3 text-primary-text">
            Typography Example: Design System and Component Guide
          </div>
          <div className="text-caption space-y-2 bg-gray-50 p-3 rounded text-neutral-base">
            <div><strong>Class:</strong> <code className="bg-primary-ultraLight px-2 py-1 rounded text-primary-text">.text-heading</code></div>
            <div><strong>Font:</strong> Inter, sans-serif</div>
            <div><strong>Size:</strong> 32px</div>
            <div><strong>Weight:</strong> 700</div>
            <div><strong>Line Height:</strong> 1.25</div>
          </div>
        </div>
        <div key="subtitle" className="typography-example bg-white rounded-lg p-4">
          <div className="text-subtitle mb-3 text-primary-text">
            Typography Example: Design System and Component Guide
          </div>
          <div className="text-caption space-y-2 bg-gray-50 p-3 rounded text-neutral-base">
            <div><strong>Class:</strong> <code className="bg-primary-ultraLight px-2 py-1 rounded text-primary-text">.text-subtitle</code></div>
            <div><strong>Font:</strong> Inter, sans-serif</div>
            <div><strong>Size:</strong> 24px</div>
            <div><strong>Weight:</strong> 600</div>
            <div><strong>Line Height:</strong> 1.3</div>
          </div>
        </div>
        <div key="body" className="typography-example bg-white rounded-lg p-4">
          <div className="text-body mb-3 text-primary-text">
            Typography Example: Design System and Component Guide
          </div>
          <div className="text-caption space-y-2 bg-gray-50 p-3 rounded text-neutral-base">
            <div><strong>Class:</strong> <code className="bg-primary-ultraLight px-2 py-1 rounded text-primary-text">.text-body</code></div>
            <div><strong>Font:</strong> Inter, sans-serif</div>
            <div><strong>Size:</strong> 16px</div>
            <div><strong>Weight:</strong> 400</div>
            <div><strong>Line Height:</strong> 1.6</div>
          </div>
        </div>
        <div key="caption" className="typography-example bg-white rounded-lg p-4">
          <div className="text-caption mb-3 text-primary-text">
            Typography Example: Design System and Component Guide
          </div>
          <div className="text-caption space-y-2 bg-gray-50 p-3 rounded text-neutral-base">
            <div><strong>Class:</strong> <code className="bg-primary-ultraLight px-2 py-1 rounded text-primary-text">.text-caption</code></div>
            <div><strong>Font:</strong> Inter, sans-serif</div>
            <div><strong>Size:</strong> 14px</div>
            <div><strong>Weight:</strong> 400</div>
            <div><strong>Line Height:</strong> 1.4</div>
          </div>
        </div>
        <div key="heading_kr" className="typography-example bg-white rounded-lg p-4">
          <div className="text-heading_kr mb-3 text-primary-text">
            한글 타이포그래피 예제: 디자인 시스템과 컴포넌트 가이드
          </div>
          <div className="text-caption space-y-2 bg-gray-50 p-3 rounded text-neutral-base">
            <div><strong>Class:</strong> <code className="bg-primary-ultraLight px-2 py-1 rounded text-primary-text">.text-heading_kr</code></div>
            <div><strong>Font:</strong> 'Noto Sans KR', sans-serif</div>
            <div><strong>Size:</strong> 32px</div>
            <div><strong>Weight:</strong> 700</div>
            <div><strong>Line Height:</strong> 1.25</div>
          </div>
        </div>
        <div key="body_kr" className="typography-example bg-white rounded-lg p-4">
          <div className="text-body_kr mb-3 text-primary-text">
            한글 타이포그래피 예제: 디자인 시스템과 컴포넌트 가이드
          </div>
          <div className="text-caption space-y-2 bg-gray-50 p-3 rounded text-neutral-base">
            <div><strong>Class:</strong> <code className="bg-primary-ultraLight px-2 py-1 rounded text-primary-text">.text-body_kr</code></div>
            <div><strong>Font:</strong> 'Noto Sans KR', sans-serif</div>
            <div><strong>Size:</strong> 16px</div>
            <div><strong>Weight:</strong> 400</div>
            <div><strong>Line Height:</strong> 1.6</div>
          </div>
        </div>
        <div key="quote" className="typography-example bg-white rounded-lg p-4">
          <div className="text-quote mb-3 text-primary-text">
            Typography Example: Design System and Component Guide
          </div>
          <div className="text-caption space-y-2 bg-gray-50 p-3 rounded text-neutral-base">
            <div><strong>Class:</strong> <code className="bg-primary-ultraLight px-2 py-1 rounded text-primary-text">.text-quote</code></div>
            <div><strong>Font:</strong> 'Noto Serif KR', serif</div>
            <div><strong>Size:</strong> 18px</div>
            <div><strong>Weight:</strong> 500</div>
            <div><strong>Line Height:</strong> 1.5</div>
          </div>
        </div>
          </div>
        </section>

        {/* Spacing Section - primary text color 적용 */}
        <section className="style-guide-section">
          <h2 className="text-subtitle mb-6 text-primary-text">Spacing</h2>
          <div className="space-y-4">
            
        <div key="xs" className="flex items-center bg-white p-3 rounded">
          <div 
            className="bg-primary-base h-6 rounded"
            style={{ width: "4px" }}
          ></div>
          <span className="text-caption ml-4 font-medium text-primary-text">
            xs <span className="text-neutral-base">(4px)</span>
          </span>
        </div>
        <div key="sm" className="flex items-center bg-white p-3 rounded">
          <div 
            className="bg-primary-base h-6 rounded"
            style={{ width: "8px" }}
          ></div>
          <span className="text-caption ml-4 font-medium text-primary-text">
            sm <span className="text-neutral-base">(8px)</span>
          </span>
        </div>
        <div key="md" className="flex items-center bg-white p-3 rounded">
          <div 
            className="bg-primary-base h-6 rounded"
            style={{ width: "16px" }}
          ></div>
          <span className="text-caption ml-4 font-medium text-primary-text">
            md <span className="text-neutral-base">(16px)</span>
          </span>
        </div>
        <div key="lg" className="flex items-center bg-white p-3 rounded">
          <div 
            className="bg-primary-base h-6 rounded"
            style={{ width: "24px" }}
          ></div>
          <span className="text-caption ml-4 font-medium text-primary-text">
            lg <span className="text-neutral-base">(24px)</span>
          </span>
        </div>
        <div key="xl" className="flex items-center bg-white p-3 rounded">
          <div 
            className="bg-primary-base h-6 rounded"
            style={{ width: "32px" }}
          ></div>
          <span className="text-caption ml-4 font-medium text-primary-text">
            xl <span className="text-neutral-base">(32px)</span>
          </span>
        </div>
        <div key="xxl" className="flex items-center bg-white p-3 rounded">
          <div 
            className="bg-primary-base h-6 rounded"
            style={{ width: "48px" }}
          ></div>
          <span className="text-caption ml-4 font-medium text-primary-text">
            xxl <span className="text-neutral-base">(48px)</span>
          </span>
        </div>
          </div>
        </section>

        {/* Radius Section - primary text color 적용 */}
        <section className="style-guide-section">
          <h2 className="text-subtitle mb-6 text-primary-text">Border Radius</h2>
          <div className="flex flex-wrap gap-6 items-end">
            
        <div key="sm" className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm">
          <div 
            className="w-20 h-20 bg-primary-base flex items-center justify-center"
            style={{ borderRadius: "6px" }}
          >
            <span className="text-white text-sm font-medium">sm</span>
          </div>
          <span className="text-caption mt-2 font-medium text-primary-text">sm</span>
          <code className="text-xs text-neutral-base">6px</code>
        </div>
        <div key="md" className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm">
          <div 
            className="w-20 h-20 bg-primary-base flex items-center justify-center"
            style={{ borderRadius: "10px" }}
          >
            <span className="text-white text-sm font-medium">md</span>
          </div>
          <span className="text-caption mt-2 font-medium text-primary-text">md</span>
          <code className="text-xs text-neutral-base">10px</code>
        </div>
        <div key="lg" className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm">
          <div 
            className="w-20 h-20 bg-primary-base flex items-center justify-center"
            style={{ borderRadius: "16px" }}
          >
            <span className="text-white text-sm font-medium">lg</span>
          </div>
          <span className="text-caption mt-2 font-medium text-primary-text">lg</span>
          <code className="text-xs text-neutral-base">16px</code>
        </div>
        <div key="xl" className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm">
          <div 
            className="w-20 h-20 bg-primary-base flex items-center justify-center"
            style={{ borderRadius: "24px" }}
          >
            <span className="text-white text-sm font-medium">xl</span>
          </div>
          <span className="text-caption mt-2 font-medium text-primary-text">xl</span>
          <code className="text-xs text-neutral-base">24px</code>
        </div>
          </div>
        </section>

        {/* Shadows Section - primary text color 적용 */}
        <section className="style-guide-section">
          <h2 className="text-subtitle mb-6 text-primary-text">Shadows</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
        <div key="card" className="bg-white p-4 rounded-lg">
          <div 
            className="w-full h-24 bg-gray-50 rounded-lg flex items-center justify-center"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
          >
            <span className="text-caption font-medium text-primary-text">card</span>
          </div>
          <div className="mt-3">
            <code className="text-xs bg-gray-100 p-2 rounded block text-neutral-base">0 2px 8px rgba(0,0,0,0.08)</code>
          </div>
        </div>
        <div key="stickyNote" className="bg-white p-4 rounded-lg">
          <div 
            className="w-full h-24 bg-gray-50 rounded-lg flex items-center justify-center"
            style={{ boxShadow: "0 3px 12px rgba(0,0,0,0.12)" }}
          >
            <span className="text-caption font-medium text-primary-text">stickyNote</span>
          </div>
          <div className="mt-3">
            <code className="text-xs bg-gray-100 p-2 rounded block text-neutral-base">0 3px 12px rgba(0,0,0,0.12)</code>
          </div>
        </div>
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

function ColorSwatch({ name, value, className = '' }) {
  return (
    <div className={`flex flex-col items-center p-3 bg-white rounded-lg shadow-sm ${className}`}>
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
    <div className={`typography-example bg-white rounded-lg p-4 ${className}`}>
      <div className={`text-${type} mb-3 text-primary-text`}>
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

