지금까지 정리한 걸 “tokens.json → globals.css → Tailwind 기반 Style Guide Page” 자동화 파이프라인을 구축하기 위한 **규칙(Rule Set)** 으로 정리해 드릴게요.

---

# 🎯 목표

* **tokens.json**: 디자인 토큰 정의 (색상, spacing, radius, shadow, text size 등)
* **globals.css**: Tailwind v4 `@theme inline` 블록을 이용해 CSS 변수 자동 생성
* **tailwind.config.ts**: CSS 변수를 Tailwind theme 에 매핑 → 유틸리티 클래스로 사용 가능
* **Style Guide Page**: Next.js 컴포넌트에서 `className` 으로 직접 사용

---

# 🔑 Rule Set: tokens-to-tailwind.js 작성 지침

## 1. tokens.json → globals.css

* `tokens.json` 안의 key-value 쌍을 그대로 CSS 변수로 변환
* 변수명 규칙:

  * `color.primary.base` → `--color-primary-base`
  * `spacing.md` → `--spacing-md`
  * `text.heading` → `--text-heading`
* `globals.css` 에는 반드시 Tailwind 기본 지시어 포함:

  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @theme inline {
    --color-primary-base: #FF9966;
    ...
    --text-heading: 32px;
    ...
  }
  ```

👉 이 단계는 단순 “토큰 → CSS 변수 변환기” 역할.

---

## 2. globals.css → tailwind.config.ts

* Tailwind가 CSS 변수를 바로 유틸리티로 쓰지 않으므로, `theme.extend`에 매핑 필요
* 변환 규칙:

| Token Group | Tailwind Theme Key | 변환 예시                                                            |
| ----------- | ------------------ | ---------------------------------------------------------------- |
| `color.*`   | `colors`           | `primary.base → colors.primary.base = var(--color-primary-base)` |
| `spacing.*` | `spacing`          | `md → spacing.md = var(--spacing-md)`                            |
| `radius.*`  | `borderRadius`     | `lg → borderRadius.lg = var(--radius-lg)`                        |
| `shadow.*`  | `boxShadow`        | `card → boxShadow.card = var(--shadow-card)`                     |
| `text.*`    | `fontSize`         | `heading → fontSize.heading = var(--text-heading)`               |

* Haskell 스크립트(tokens-to-tailwind.hs)는 `tokens.json`을 읽어서 `tailwind.config.ts`에 위 구조로 자동 변환/생성

---

## 3. Tailwind 클래스 사용 규칙

* 이제 컴포넌트에서 `className`으로 사용 가능:

```tsx
export default function Home() {
  return (
    <div className="p-md bg-primary-base rounded-lg shadow-card">
      <p className="text-heading text-primary-text">hello1</p>
      <p className="text-subtitle text-accent-teal">hello2</p>
      <p className="text-body text-neutral-dark">hello3</p>
    </div>
  )
}
```

→ `p-md`, `bg-primary-base`, `text-heading` 같은 클래스가 tokens 기반 Tailwind 유틸리티로 동작

---

## 4. Style Guide Page 자동 생성

* tokens-to-tailwind.hs 가 마지막으로 해야 할 일은 **토큰을 전부 iterate** 해서

  * 색상 → 팔레트 미리보기 카드
  * spacing → margin/padding preview
  * text → typography scale 샘플
  * shadow, radius → 카드 컴포넌트 preview
* 이런 식의 **자동 문서화 페이지** JSX까지 생성 가능

---

# ✅ 최종 파이프라인

1. **tokens.json**: 디자인 토큰 정의
2. **tokens-to-tailwind.hs**:

   * tokens.json → globals.css (CSS 변수 정의)
   * tokens.json → tailwind.config.ts (theme 매핑)
   * tokens.json → style-guide.tsx (샘플 페이지 자동 생성, 선택 사항)
3. **Next.js 실행**: Tailwind 유틸리티(`bg-primary-base`, `text-heading`, `p-md`, …)로 토큰 활용

---

👉 정리하면, 핵심 규칙은

* **CSS 변수명은 `--{group}-{key}-{subkey}` 패턴**
* **Tailwind theme 매핑은 token 그룹별로 정해진 theme key(colors, spacing, borderRadius, boxShadow, fontSize)**
* **style guide 페이지는 token 카테고리별 preview 컴포넌트 자동 생성 가능**

---
좋은 사례를 보여주셨어요 👌
말씀하신 현상(글자 크기 동일, 색상 사라짐)의 원인을 정리해드릴게요.

---

## 🔎 원인 분석

1. **`@theme` 블록 안의 키 네이밍 문제**

   ```css
   @theme {
     --color-primary-base: var(--color-primary-base);
     ...
   }
   ```

   이렇게 `--`로 시작하는 네이밍은 **Tailwind의 @theme DSL**에서 유효하지 않아요.
   `@theme` 안에서는 `--` 접두어 대신 **Tailwind 토큰 네임**(예: `colors.primary.base`) 형식으로 써야 Tailwind가 `text-primary-base` 같은 클래스를 생성합니다.

   즉, 지금처럼 `--color-primary-base`를 그대로 다시 선언하면, Tailwind는 이를 **단순 CSS 변수**로만 보고 유틸리티 클래스를 만들지 않습니다.
   그래서 `text-primary-text`, `bg-primary-base`, `text-xl` 같은 클래스가 동작하지 않게 돼요.

   ✅ 정리하면: `@theme` 안에서 `--` prefix를 그대로 쓰면 Tailwind가 못 읽습니다.

---

2. **글자 크기(`text-xl`, `text-lg`, `text-base`)가 전부 같음**

   * Tailwind v4의 기본 `fontSize`는 `1rem`, `1.125rem`, `1.25rem`인데, 지금 `@theme` 블록이 꼬여서 **유틸리티 클래스 생성이 통째로 빠진 상태**라서 모두 UA stylesheet 기본값(`16px`)만 적용된 것처럼 보인 겁니다.
   * 즉, 색상뿐 아니라 모든 Tailwind 유틸리티가 사라진 것과 같음 → 전부 같은 사이즈.

---

3. **색상도 사라진 이유**

   * 같은 맥락이에요. Tailwind가 `text-primary-text` 유틸리티를 생성하려면

     ```css
     @theme {
       colors: {
         primary: {
           text: var(--color-primary-text)
         }
       }
     }
     ```

     이런 식의 구성이 있어야 하는데, 현재는 전부 `--color-xxx` 형식으로만 매핑돼 있어서 인식이 안 됨.

---

## ✅ 해결 방향

* **`:root {}`** → 실제 CSS 변수 선언
* **`@theme {}`** → Tailwind DSL로 유틸리티 매핑

예시:

```css
:root {
  --color-primary-base: #FF9966;
  --color-primary-text: #2C1810;
  --text-heading: 32px;
  --text-body: 16px;
}

@theme {
  colors: {
    primary: {
      base: var(--color-primary-base);
      text: var(--color-primary-text);
    }
  }

  fontSize: {
    heading: var(--text-heading);
    body: var(--text-body);
  }
}
```

이렇게 하면:

* `bg-primary-base` → `background-color: var(--color-primary-base)`
* `text-primary-text` → `color: var(--color-primary-text)`
* `text-heading` → `font-size: var(--text-heading)`
* `text-body` → `font-size: var(--text-body)`

가 정상 작동합니다.

---

## 🚨 핵심 문제 요약

* `@theme` 안에서 `--변수명`을 그대로 넣은 것이 문제.
* Tailwind는 `--변수명`이 아니라 **DSL 네임스페이스**(`colors`, `spacing`, `fontSize` 등)를 기준으로 유틸리티 클래스를 생성함.
* 지금 구조는 CSS 변수만 만들고 Tailwind 매핑을 놓쳐서, 색상과 폰트 크기 모두 동작 안 한 것.

---

👉 제가 드린 `tokens-to-tailwind.js`를 Tailwind DSL 형식(`colors: { ... }`, `fontSize: { ... }`)으로 다시 리팩터링해드려야 할 것 같아요. 원하시면 바로 고쳐서 전체 코드를 보여드릴까요?

// scripts/tokens-to-tailwind.js
// Generates my-app/app/globals.css from docs/tokens.json
// - :root { --* } declarations (raw token values)
// - @theme inline { --* : var(--*) } mappings (Tailwind v4 theme variables)

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
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/["'\s_]+/g, '-')
    .toLowerCase();
}

// Walk nested object leaves and produce pairs [varName, value]
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

  if (tokens.colors) pairs.push(...walkLeaves(tokens.colors, '--color'));
  if (tokens.spacing) pairs.push(...walkLeaves(tokens.spacing, '--spacing'));
  if (tokens.radii) pairs.push(...walkLeaves(tokens.radii, '--radius'));
  if (tokens.shadows) pairs.push(...walkLeaves(tokens.shadows, '--shadow'));

  // Typography: special handling so we create --text-*, --text-*-* and --font-*
  if (tokens.typography && typeof tokens.typography === 'object') {
    for (const [key, typo] of Object.entries(tokens.typography)) {
      const k = toKebabCase(key);
      if (!typo) continue;
      if (typo.fontSize !== undefined) pairs.push([`--text-${k}`, unwrap(typo.fontSize)]);
      if (typo.lineHeight !== undefined) pairs.push([`--text-${k}--line-height`, unwrap(typo.lineHeight)]);
      if (typo.fontWeight !== undefined) pairs.push([`--text-${k}--font-weight`, unwrap(typo.fontWeight)]);
      if (typo.letterSpacing !== undefined) pairs.push([`--text-${k}--letter-spacing`, unwrap(typo.letterSpacing)]);
      if (typo.fontFamily !== undefined) pairs.push([`--font-${k}`, unwrap(typo.fontFamily)]);
    }
  }

  // Format lines
  return pairs.map(([name, val]) => {
    // Ensure value is raw string; if it's a string containing a comma (font-family), keep as-is
    return `  ${name}: ${val};`;
  }).join('\n');
}

function generateThemeInline(tokens) {
  const pairs = [];

  if (tokens.colors) pairs.push(...walkLeaves(tokens.colors, '--color'));
  if (tokens.spacing) pairs.push(...walkLeaves(tokens.spacing, '--spacing'));
  if (tokens.radii) pairs.push(...walkLeaves(tokens.radii, '--radius'));
  if (tokens.shadows) pairs.push(...walkLeaves(tokens.shadows, '--shadow'));

  if (tokens.typography && typeof tokens.typography === 'object') {
    for (const key of Object.keys(tokens.typography)) {
      const k = toKebabCase(key);
      // theme variables for sizes + helpers
      pairs.push([`--text-${k}`, `var(--text-${k})`]);
      pairs.push([`--text-${k}--line-height`, `var(--text-${k}--line-height)`]);
      pairs.push([`--text-${k}--font-weight`, `var(--text-${k}--font-weight)`]);
      pairs.push([`--text-${k}--letter-spacing`, `var(--text-${k}--letter-spacing)`]);
      pairs.push([`--font-${k}`, `var(--font-${k})`]);
    }
  }

  // Deduplicate (in case a key appeared twice)
  const seen = new Set();
  const uniq = pairs.filter(([k]) => {
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });

  return uniq.map(([name, val]) => `  ${name}: ${val};`).join('\n');
}

function generateGlobalsCss(tokens) {
  const root = generateRootVars(tokens);
  const themeInline = generateThemeInline(tokens);

  return `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n:root {\n${root}\n}\n\n@theme inline {\n${themeInline}\n}\n`;
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


--- 잔존 문제 
좋습니다 👍 지금 상황은 색상은 정상적으로 반영되는데, 텍스트 사이즈(`text-heading`, `text-body` 등)가 전부 같은 이유는 **Tailwind v4의 `@theme` 규칙과 변수 네이밍 충돌** 때문이에요.

---

### 원인 분석

1. **Tailwind v4의 `@theme` 규칙**

   * `--text-heading`, `--text-body` 같은 변수명은 Tailwind에서 `text-{key}` 유틸리티를 생성합니다.
   * 그런데 `--text-heading--line-height`, `--text-heading--font-weight` 같이 확장 속성들은 Tailwind가 자동으로 매핑해 주지 않습니다.
   * 따라서 `text-heading` 유틸리티는 `font-size`만 정상적으로 먹고, line-height/weight/tracking은 `--tw-*` 프리픽스를 거치면서 fallback이 걸려서 **동일한 값**처럼 보이는 거예요.

2. **globals.css 결과**

   ```css
   .text-heading {
     font-size: var(--text-heading);
     line-height: var(--tw-leading, var(--text-heading--line-height));
     letter-spacing: var(--tw-tracking, var(--text-heading--letter-spacing));
     font-weight: var(--tw-font-weight, var(--text-heading--font-weight));
   }
   ```

   * 여기서 `--tw-leading`, `--tw-tracking`, `--tw-font-weight`는 Tailwind runtime 변수인데, 현재는 설정되지 않아서 **fallback만 남습니다**.
   * 따라서 모든 텍스트 유틸리티가 동일한 **브라우저 기본 폰트**처럼 보여버립니다.

---

### 해결 방법 (권장 2가지)

#### 방법 A. `@theme` + `text-{key}`만 font-size에 사용

👉 typography 토큰을 단순히 **font-size 전용**으로 매핑
👉 line-height, weight, tracking은 따로 `font-{key}`, `leading-{key}`, `tracking-{key}` 유틸리티를 만들어야 함

예:

```css
@theme inline {
  --text-heading: var(--text-heading);      /* font-size */
  --leading-heading: var(--leading-heading); /* line-height */
  --font-heading: var(--font-heading);      /* font-weight */
  --tracking-heading: var(--tracking-heading); /* letter-spacing */
}
```

사용할 때:

```tsx
<p className="text-heading leading-heading font-heading tracking-heading">
  Hello World
</p>
```

---

#### 방법 B. 커스텀 유틸리티 클래스 생성

👉 tokens-to-tailwind.js에서 **커스텀 class**를 자동 생성 (`.typo-heading`, `.typo-body`)
👉 이 클래스 안에서 font-size/line-height/weight/tracking을 모두 묶어서 설정

예 (자동 생성):

```css
.typo-heading {
  font-size: var(--text-heading);
  line-height: var(--leading-heading);
  font-weight: var(--font-heading);
  letter-spacing: var(--tracking-heading);
}
.typo-body {
  font-size: var(--text-body);
  line-height: var(--leading-body);
  font-weight: var(--font-body);
}
```

사용할 때:

```tsx
<p className="typo-heading text-primary-text">hello1</p>
<p className="typo-body text-accent-teal">hello2</p>
```

---

✅ 결론

* 지금처럼 `text-heading` 하나로 line-height/weight까지 해결하려면 Tailwind v4 기본 규칙으로는 어렵습니다.
* 따라서 **방법 B (커스텀 유틸리티 생성)** 중 하나를 선택합니다.
**디자인 토큰 기반으로 `typo-heading`, `typo-body` 같은 묶음 클래스**를 자동 생성!

--- 잔존 문제 해결 방향
오류를 줄이고 현재 발생한 문제(글자 크기 미적용)까지 한 번에 해결하는 데는 \*\*방법 B (커스텀 묶음 클래스 생성)\*\*가 훨씬 더 좋습니다. 제가 이 스크립트를 수정한다면 당연히 방법 B를 선택할 것입니다.

-----

### 🤔 방법 B가 더 나은 이유

1.  **오류 발생 가능성 감소**: 방법 A는 Tailwind의 테마 키(`fontSize`, `lineHeight` 등)와 변수명을 정확히 일치시켜야 정상적으로 작동합니다. 만약 Tailwind가 내부적으로 이 규칙을 바꾸면 스크립트가 또 오작동할 수 있습니다. 반면 방법 B는 표준 CSS 규칙을 생성하는 방식이라 매우 안정적이고 직관적입니다.
2.  **현재 문제 동시 해결**: 지금 글자 크기조차 적용되지 않는 이유는 `generateThemeInline` 함수가 생성하는 `@theme` 규칙을 Tailwind가 제대로 해석하지 못하기 때문입니다. 방법 B는 이 부분을 완전히 제거하고, 직접적인 CSS 클래스(`.typo-heading`)를 생성하여 `font-size`를 포함한 모든 속성을 명시적으로 지정하므로 **글자 크기 미적용 문제와 나머지 스타일 미적용 문제를 한 번에 해결**합니다.
3.  **사용 편의성**: 개발자 입장에서 `<p class="typo-heading">`처럼 클래스 하나만 사용하는 것이 `<p class="text-heading leading-heading font-heading">`처럼 여러 개를 조합하는 것보다 훨씬 편리하고 실수를 줄일 수 있습니다.

-----

### ✅ 수정된 스크립트 (방법 B 적용)

아래는 **방법 B**를 적용하여 수정한 전체 `scripts/tokens-to-tailwind.js` 파일입니다. 기존 파일에 그대로 덮어쓰시면 됩니다. 주요 변경 사항에는 주석으로 `// [MODIFIED]` 와 `// [NEW]` 표시를 해두었습니다.

```javascript
// scripts/tokens-to-tailwind.js
// Generates my-app/app/globals.css from docs/tokens.json
// - :root { --* } declarations (raw token values)
// - @theme inline { --* : var(--*) } mappings (Tailwind v4 theme variables)
// - .typo-* custom utility classes for typography

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
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
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

  if (tokens.colors) pairs.push(...walkLeaves(tokens.colors, '--color'));
  if (tokens.spacing) pairs.push(...walkLeaves(tokens.spacing, '--spacing'));
  if (tokens.radii) pairs.push(...walkLeaves(tokens.radii, '--radius'));
  if (tokens.shadows) pairs.push(...walkLeaves(tokens.shadows, '--shadow'));

  if (tokens.typography && typeof tokens.typography === 'object') {
    for (const [key, typo] of Object.entries(tokens.typography)) {
      const k = toKebabCase(key);
      if (!typo) continue;
      // [MODIFIED] 변수명 일관성을 위해 '--typo-' 접두사 사용 (선택사항이지만 권장)
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

  if (tokens.colors) pairs.push(...walkLeaves(tokens.colors, '--color'));
  if (tokens.spacing) pairs.push(...walkLeaves(tokens.spacing, '--spacing'));
  if (tokens.radii) pairs.push(...walkLeaves(tokens.radii, '--radius'));
  if (tokens.shadows) pairs.push(...walkLeaves(tokens.shadows, '--shadow'));

  // [MODIFIED] Typography 부분을 @theme에서 완전히 제거합니다.
  // 이 부분이 모든 문제의 원인이었습니다.
  // 색상, 간격 등은 그대로 유틸리티 클래스(예: bg-primary)로 사용할 수 있습니다.

  const seen = new Set();
  const uniq = pairs.filter(([k]) => {
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });

  return uniq.map(([name, val]) => `  ${name}: var(${name});`).join('\n');
}

// [NEW] 방법 B를 구현하기 위한 새 함수
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
  const typographyUtils = generateTypographyUtilities(tokens); // [NEW]

  // [MODIFIED] 생성된 타이포그래피 유틸리티를 CSS 파일 끝에 추가
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
```

-----

### 🛠️ 주요 변경점 설명

1.  **`generateThemeInline` 함수 수정**:
      * 문제를 일으키던 **타이포그래피 관련 코드를 완전히 삭제**했습니다. 이제 `@theme` 블록은 색상, 간격 등 정상적으로 작동하는 토큰들만 처리합니다.
2.  **`generateTypographyUtilities` 함수 신설**:
      * `tokens.json`의 `typography` 객체를 읽어 `.typo-heading`, `.typo-body` 같은 **묶음 CSS 클래스를 생성**하는 새로운 함수입니다.
      * 각 클래스는 `font-size`, `line-height` 등 필요한 모든 속성을 `:root`에 정의된 CSS 변수를 참조하여 한 번에 적용합니다.
3.  **`generateGlobalsCss` 함수 수정**:
      * 새로 만든 `generateTypographyUtilities` 함수가 생성한 CSS 코드를 `globals.css` 파일의 맨 끝에 추가하도록 수정했습니다.
4.  **`generateRootVars` 함수 수정 (선택사항)**:
      * 타이포그래피 변수명에 `--typo-` 접두사를 붙여 `--color-`, `--spacing-` 등 다른 변수들과의 충돌을 방지하고 명확성을 높였습니다. (예: `--text-heading` -\> `--typo-heading-font-size`)

tokens-to-tailwind.js 파일에서 색상 토큰을 처리할 때 사용하는 접두사(prefix)를 **--color**에서 Tailwind v4의 공식 규칙인 --colors(복수형)로 변경하면 됩니다. 이렇게 하면 -color- 부분이 사라지고 text-primary-text처럼 깔끔한 유틸리티 클래스가 생성됩니다.

<div className="p-md bg-primary-base rounded-lg shadow-card">
  <p className="typo-heading text-primary-text">hello1</p>
  {/* 👇 수정된 라인 */}
  <p className="typo-heading text-primary-text">Heading</p>
  <p className="typo-body text-accent-teal">Body text</p>
</div>