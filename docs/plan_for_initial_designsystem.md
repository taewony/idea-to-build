# Plan to run 'extract-it' as an Internal Style Guide

This plan outlines the steps to run the Next.js application and visualize the design system, based on `AGENT.md`.

## Prerequisites

This project appears to be a Next.js application, but a `package.json` file is missing. To run the application, you first need to set up a Next.js project. You can do this by running `npx create-next-app@latest .` in the root directory.

## Steps

1.  **Install Dependencies:** If you have a `package.json`, install the necessary dependencies.
    ```bash
    npm install
    ```
2.  **Generate CSS Variables:** Run the script to generate CSS variables from the design tokens. This will create a `styles/tokens.css` file.
    ```bash
    node scripts/generate-css-vars.js
    ```
3.  **Run the Development Server:** Start the Next.js development server.
    ```bash
    npm run dev
    ```
4.  **View the Style Guide:** Open your browser and navigate to `http://localhost:3000` to see the component showcase.

----

지금 만든 Next.js 기반 **Static Style Guide** 앱은 영문 폰트 기준이라 한글 폰트나 한글 텍스트 스타일 샘플이 없을 겁니다.
영문 Section 밑에 **한글 전용 Section**을 추가하려면 크게 세 가지 부분을 수정하면 됩니다:

## 1. tokens.json에 한글 폰트 스타일 추가

현재 `tokens.json`에는 영문 폰트(`Inter`)만 정의돼 있습니다. 한글 전용 폰트를 추가하려면 Google Fonts에서 한글 웹폰트를 가져온 뒤 tokens.json에 섹션을 추가하면 됩니다.

예: `Noto Sans KR` 추가

```json
"typography": {
  "heading": {
    "fontFamily": "Inter, sans-serif",
    "fontWeight": 700,
    "fontSize": "32px",
    "lineHeight": 1.25
  },
  "body": {
    "fontFamily": "Inter, sans-serif",
    "fontWeight": 400,
    "fontSize": "16px",
    "lineHeight": 1.5
  },
  "heading_kr": {
    "fontFamily": "'Noto Sans KR', sans-serif",
    "fontWeight": 700,
    "fontSize": "32px",
    "lineHeight": 1.25
  },
  "body_kr": {
    "fontFamily": "'Noto Sans KR', sans-serif",
    "fontWeight": 400,
    "fontSize": "16px",
    "lineHeight": 1.5
  }
}
```

---

## 2. globals.css에서 한글 폰트 로딩

Google Fonts 링크를 `globals.css`에 추가합니다. 예를 들어:

```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');
@import './tokens.css';

html, body {
  margin: 0;
  padding: 0;
  font-family: var(--typography-body-fontFamily);
  background-color: var(--colors-neutral-background);
  color: var(--colors-neutral-dark);
}
```

---

## 3. index.js(또는 page.js)에서 한글 섹션 추가

지금 색상, 타이포그래피, 컴포넌트 섹션이 한 번씩 렌더링됩니다. 한글 전용으로 한 섹션을 더 추가하면 됩니다.

```jsx
<section style={{ marginBottom: '32px' }}>
  <h2>Typography (Korean)</h2>
  {Object.entries(typography)
    .filter(([variant]) => variant.endsWith('_kr'))
    .map(([variant, spec]) => (
      <TypographySample
        key={variant}
        variant={variant}
        styleSpec={spec}
      />
    ))}
</section>
```

이렇게 하면 tokens.json에 `_kr`로 끝나는 항목들이 자동으로 한글 섹션에 렌더링됩니다.

---

## 4. 샘플 한글 텍스트 넣기

`TypographySample` 컴포넌트에서 영어 텍스트 대신 한글 예문을 추가하면 됩니다.

```jsx
function TypographySample({ variant, styleSpec }) {
  const { fontFamily, fontSize, fontWeight, lineHeight } = styleSpec;
  const sampleText =
    variant.endsWith('_kr')
      ? '빠른 갈색 여우가 게으른 개를 뛰어넘다'
      : 'The quick brown fox jumps over the lazy dog';

  return (
    <div style={{ fontFamily, fontSize, fontWeight, lineHeight, marginBottom: '12px' }}>
      {variant}: {sampleText}
    </div>
  );
}
```

---

## 5. 전체 수정 요약

1. **tokens.json** → 한글 전용 `typography.heading_kr`, `typography.body_kr` 추가
2. **globals.css** → Google Fonts에서 한글 폰트 불러오기
3. **index.js** → `_kr` 끝나는 항목 필터링해 별도 섹션 렌더링
4. **TypographySample 컴포넌트** → 한글 예문 출력
