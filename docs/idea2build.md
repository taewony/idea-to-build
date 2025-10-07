## `idea2build` - AI 기반 Idea-to-Build 워크플로우

- 내 생각을 실제 동작하는 앱으로 빠르게 개발하는 방법
- 이 워크플로우는 재사용 가능하며, PDSA(Plan-Do-See-Act) 사이클에 기반하여 지속적으로 프로덕트를 개선해 나갈 수 있도록 설계되었습니다.

I와의 협업으로 사용자에게 특정 가치를 전달하는 앱 개발을 아이디어에서부터 빌드까지 체계적인 workflow로 진행한다.
대학생들이 창업 아이디어에 대한 가설을 세우고, 이를 빌드하여 친구들과 사용해 보면서, 구체적으로 검증하고 개선해 나가는 과정을 지원한다.

### STEP 1) 아이디어를 담은 `PRD.md`, 의도를 담은 `AGENT.md`

- **PRD 문서** 형식에 따라 내 아이디어를 기록하다보면, 저절로 1차 가설 검증이 된다. PRD 문서를 작성할 수 있어야 그다음 작업이 진행 가능하다.

- **AGENT.md 문서** 에 무엇을 왜 만들려는지 의도를 작성하고, AI Agent에게 내가 원하는 것이 무엇인지 정확하게 전달한다.


### STEP 2) 앱의 브랜드 정체성 및 디자인 일관성을 위한 `style-guide.md`, `tokens.json`

이 단계는 'extract-it' 명령어 혹은 web-app은 이미 만들어진 UX/UI App의 화면 캡쳐 혹은 다음과 같은 디자인 가이드 web page를 바탕으로 새로 만들 앱의 디자인 가이드 문서 및 디자인 토큰 파일을 추출해 내는 데 목적이 있습니다.
https://mobbin.com/colors/meaning/atomic-tangerine

```md
# AGENT: Atomic Tangerine Design System Demo  

이 문서는 Atomic Tangerine 색상을 중심으로 한 디자인 시스템 샘플을 Next.js 환경에서 실행/확인하기 위한 목적과 각 파일의 역할을 설명합니다.  
이 AGENT.md는 AI 또는 협업하는 동료 개발자가 빠르게 이해하고 실험할 수 있도록 만든 가이드입니다.

---

## 🎯 작업 의도  

1. **Atomic Tangerine 색상 팔레트 기반 디자인 시스템**을 텍스트와 토큰(JSON) 형식으로 정의  
2. 이를 Next.js로 시각화하여 **브라우저에서 색상·타이포그래피·컴포넌트를 직접 확인**  
3. 추후 **Interactive 기능**을 추가해 색상·컴포넌트 스타일 조정 → 토큰 갱신 → 실시간 미리보기로 확장 가능  

---

## 📂 파일 구조 & 역할  

```

project-root("idea2build")/
├─ style-guide.md          # 디자인 시스템을 문서 형태로 정의한 파일
├─ tokens.json             # 디자인 토큰(색상, 타이포, 간격 등)을 JSON으로 정의한 파일
├─ scripts/
│   └─ generate-css-vars.js # tokens.json을 바탕으로 CSS 변수 생성하는 스크립트
├─ styles/
│   ├─ globals.css          # Next.js 전역 스타일
│   └─ tokens.css           # generate-css-vars.js 실행 시 자동 생성되는 CSS 변수 파일
├─ app/
│   └─ page.js              # Next.js 기반 데모 페이지 코드
├─ AGENT.md                 # 현재 문서 (설명서)

````

---

## 📜 각 파일의 상세 설명  

### 1. `style-guide.md`
- **목적**: 디자이너와 개발자 모두가 이해할 수 있는 텍스트 가이드  
- **내용**:  
  - 색상 팔레트  
  - 타이포그래피 규칙  
  - 버튼, 카드, 입력필드 등 기본 컴포넌트 규칙  
  - 간격, 그리드, 접근성 고려사항 등  

이 파일은 디자인 시스템의 **사람이 읽는 버전**입니다.  

---

### 2. `tokens.json`
- **목적**: 스타일 정보를 기계가 이해할 수 있는 **구조화된 형식**으로 정의  
- **내용**:  
  - colors, typography, spacing, radii, shadows 등  
- **역할**:  
  - CSS 변수 생성, 테마 관리, 토큰 기반 디자인 시스템 확장의 기반  

이 파일은 스타일의 **단일 소스(Single Source of Truth)** 역할을 합니다.  

---

### 3. `scripts/generate-css-vars.js`
- **목적**: tokens.json → CSS 변수(`:root { --var: value; }`) 자동 변환  
- **역할**:  
  - 스타일 토큰을 CSS에서 바로 쓸 수 있게 함  
  - 실행 시 `styles/tokens.css` 파일 생성  

실행 방법:
```bash
node scripts/generate-css-vars.js
````

---

### 4. `styles/tokens.css`

* **목적**: tokens.json에서 생성된 **실제 CSS 변수 모음**
* **역할**:

  * 전역에서 `var(--colors-primary-base)` 형태로 사용 가능
* **주의**: 수동 수정 금지 → tokens.json 수정 후 스크립트 재실행 필요

---

### 5. `styles/globals.css`

* **목적**: Next.js 전체에 적용되는 전역 CSS 스타일
* **역할**:

  * 리셋/기본 폰트
  * tokens.css 변수 import

---

### 6. `pages/index.js` (또는 `app/page.js`)

* **목적**: 브라우저에서 디자인 시스템을 시각화하는 **샘플 웹페이지**
* **기능**:

  * 색상 팔레트 → 색상 스와치 그리드로 표시
  * 타이포그래피 → 각 스타일별 텍스트 샘플 렌더링
  * 컴포넌트 → 버튼, 카드 등의 UI 예시 표시

---

## 🚀 실행 방법

1. Next.js 프로젝트 생성 (필요 시):

```bash
npx create-next-app@latest atomic-tangerine-demo
cd atomic-tangerine-demo
```

2. 위 파일 구조에 맞게 파일 추가

3. CSS 변수 생성:

```bash
node scripts/generate-css-vars.js
```

4. Next.js 실행:

```bash
npm run dev
```

5. 브라우저에서 `http://localhost:3000` 열기

---

## 🔮 향후 확장 아이디어

* 색상 슬라이더 / Color Picker 추가 → tokens.json 실시간 업데이트
* 토큰 변경 → Live Preview 연결
* Storybook 또는 Ladle 같은 UI 컴포넌트 쇼케이스 툴 연동

---

## 📌 요약

* **style-guide.md**: 사람이 읽는 디자인 가이드
* **tokens.json**: 디자인 토큰(기계가 읽는 버전)
* **generate-css-vars.js**: CSS 변수 자동 생성 스크립트
* **index.js**: 실제 웹에서 디자인 시스템 확인용 데모 페이지

AI와 협업 시 이 문서를 참고하여 새로운 색상, 컴포넌트, 토큰 구조 등을 확장할 수 있습니다.

```

---

알겠습니다. 기존 **AGENT.md**에 다음과 같은 **변경·개선 작업 진행 규칙**을 추가하면 됩니다. 이 규칙은 작업 순서를 명확히 하여, 혼동 없이 스타일 가이드와 실제 코드 반영을 일관되게 유지하도록 도와줍니다.

---

### 변경·개선 작업 진행 규칙 (추가 문구)

> **스타일 가이드와 코드 개선 시 반드시 다음 순서로 작업할 것:**

1. **style-guide.md**

   * 디자인·UI 가이드라인의 근본적인 변경 사항(색상 팔레트, 타이포그래피 규칙, 컴포넌트 사용 원칙 등)은 **style-guide.md**에서 먼저 정의한다.
   * 이 문서는 스타일 변경의 "싱글 소스 오브 트루스(Single Source of Truth)" 역할을 한다.

2. **tokens.json**

   * style-guide.md에서 정의한 변경 사항을 **디자인 토큰** 형태로 **tokens.json**에 반영한다.
   * 색상(hex), 폰트 사이즈, 패딩 값 등 UI 코드에서 직접 사용할 수 있는 **구조적·머신리더블 데이터**로 표현한다.

3. **UI 컴포넌트 / Showcase 페이지**

   * tokens.json의 변경 사항이 반영된 뒤, **컴포넌트 쇼케이스(Component Showcase)** 페이지 또는 **내부 스타일 가이드(Internal Style Guide)** UI를 업데이트하여 시각적으로 확인한다.
   * 이 단계에서 디자이너·개발자는 변경된 UI가 실제 서비스에 어떻게 보이는지 즉시 실험할 수 있다.

4. **Next.js 앱 전체 반영**

   * 위 단계에서 충분히 검토된 변경 사항만 실제 Next.js 앱의 컴포넌트와 레이아웃에 반영한다.
   * PR(Pull Request) 혹은 리뷰 과정을 통해 품질을 검증하고, 승인 시 최종 반영한다.

---

```
