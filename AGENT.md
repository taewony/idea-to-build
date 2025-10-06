## AGENT.md (idea-to-build)

당신은 UX/UI 및 NextJS 앱 개발 전문가입니다.

이제 당신과 나는 
**앱 개발과 디자인 시스템 개선이 동시에 이루어지는 framework 구조**를 최종적으로 개발하기 위해, 
아래와 같은 **PDSA 루프**를 체계를 만들려고 합니다. 즉, 지속적인 개선이 가능한 web app 개발이 목표입니다.
다만, 개발 방법이 AI tool 및 design spec 문서, 그리고 prompt를 이용하여 app을 개발하며, 직접적인 코딩은 최소화 합니다.
  - **sample web page 로부터 tokens.json 추출(extract)**
  - **Design Tokens → Style-Guide page 생성(visualize)**
  - **blueprint(핵심 공간/동작 설명) → Design Spec 생성(spec-design)**
  - **Sample Page → App Prototype → 핵심 design token 및 App UI page/section/component 등 UI 용어집 생성 (app-build)**
  - **App 실행 후 AI와 공통 UI 용어를 사용하여 반복적으로 개선 및 재검증 (ds:refine, app:refine)**

항상 다음 작업 과정을 시작하기 전에 root 밑에 work-history.md로 기록하고 다음              │
│   단계별 작업을 진행한다.

### 1. 툴킷 개요 및 특징

- **idea-to-build**는 아이디어에서 시작해 **AI 에이전트 CLI**와의 협업으로 Next.js 15+ App Router 및 Tailwind 4.x 기반의 UI/UX 애플리케이션을 만든다.
- **idea-to-build**는 AI와의 효율적인 협업을 위해 공통의 용어집과 workflow를 구축한다.
- 단순한 prompt로부터 전체 App이 만들어지는 big-bang approach 대신에, 내 의도를 담은 AGENT.md 로부터 시작하여 점차 만들고자 하는 App으로 항해 나간다.
- idea로부터 NextJS app으로 만들기 위해 다양한 문서화 작업을 하게 되며, 이들 문서가 context가 되어 이를 기준으로 AI와 대화 하며 작업한다.
- 용어집과 문서를 기반으로 작업이 진행되므로, 특정 AI  Agent tool에 종속되지 않으며, 토큰을 효율적으로 사용할 수 있도록 한다.

- tailwind는 4.1 CSS first approach를 사용해야 한다.
https://tailwindcss.com/blog/tailwindcss-v4#css-first-configuration

**목표:**

  * 개발자와 AI가 공통 용어와 컨텍스트를 사용
  * 설계 문서 → 코드 생성을 자동화
  * 스타일 가이드와 UI 요소를 일관성 있게 관리
  * 디자인 `source`로부터 static page 디자인을 만들고, 이를 design-spec 문서에 따라 App으로 만든다.
  
---

### 2. AI CLI 명령 예시
사용자가 터미널에서 AI와 대화하며 전체 개발 과정을 진행할 수 있는 명령어 인터페이스입니다.
일종의 미리 저장된 prompt 혹은 workflow라고도 볼 수 있다.

*   **`app:convert`**: convert 'aistudio' generated react app into NextJS app.

*   **`plan:init`**: 사용자의 아이디어를 몇 가지 질문을 통해 구체화하고, `PRD.md`와 `AGENT.md` 초안을 자동 생성한다.
*   **`plan:it`**: 특정 작업에 대한 상세 계획을 ./plan 폴더 안에 작성한다.
*   **`ds:extract`**: 사용자가 제공한 벤치마크 사이트 URL이나 스크린샷을 AI가 분석하여 프로젝트의 `style-guide.md`와 `tokens.json`을 자동으로 추출한다.
*   **`ds:visualize`**: 생성된 프로토타입에 사용자가 디자인 및 기능에 대한 피드백을 직접 남길 수 있는 플로팅 버튼을 추가한다. 이 피드백은 다음 개선 사이클의 입력값으로 활용된다.
*   **`ds:refine`**: 생성된 프로토타입에 사용자가 디자인 및 기능에 대한 피드백을 직접 남길 수 있는 플로팅 버튼을 추가한다. 이 피드백은 다음 개선 사이클의 입력값으로 활용된다.
*   **`spec:space`**: 앱의 핵심 사용자 활동 공간(예: 담벼락, 할일 목록, 대시보드)을 AI와 함께 설계하고, 각 공간에 대한 각각의 single page react html을 작성한다. blueprint.md 작성.
*   **`spec:design`**: 생성된 디자인 에셋과 공간 및 page 설계를 바탕으로 기술적인 `design-spec.md` 문서를 작성한다.
*   **`app:buid`**: `design-spec.md`과 `tokens.json`을 기반으로 실제 동작하는 NextJS 및 tailwind 기반 App 코드를 생성한다.

### 3. 폴더 구조

```
idea-to-build/
│
├── my-project/                  # Next.js 프로젝트 (app router 기반)
│   ├── app/
│   │   ├── page.jsx             # 기본 페이지 (기존 코드 유지)
│   │   ├── style-guide/         # 스타일 가이드 자동 생성
│   │   │   └── page.jsx
│   │   ├── globals.css          # 토큰 기반 전역 스타일 자동 생성
│   │   └── ...
│   └── tokens.json              # 디자인 토큰
│
├── scripts/
│   ├── generate-styleguide.js   # 토큰 → Style Guide 페이지 생성
│   └── ai-cli.js                # AI 명령 기반 코드 생성/수정 CLI
│
├── source/
│   ├── blueprint.md             # 앱 페이지 설계 문서
│   ├── url/             # 페이지별 샘플 web link url
│   ├── html/             # 페이지별 샘플 HTML
│   │   └── app_page_sample.html
│   └── images/                  # 시각 자료
│
├── specs/
│   ├── design-spec.md           # 전체 앱 구현을 위한 설계 문서
│   ├── ui_elements_summary.md   # UI 요소 추출 및 설명 문서
│   └── style_tokens.md          # 토큰 및 스타일 정의 문서
│
└── AGENT.md                     # AI & Dev 공통 컨텍스트 가이드
```

---

### 4. 공통 용어 정의 (AI ↔ 개발자 소통)

| 용어            | 의미                                           | 예시 명령                                  |
| ------------- | -------------------------------------------- | -------------------------------------- |
| **Page**      | Next.js App Router 기반의 페이지 단위                | "products 페이지에 필터 사이드바 추가해줘."          |
| **Section** |
| **Token**     | colors, typography, spacing 등 전역 스타일 변수      | "primary 색상 #FF0000으로 바꿔줘."            |
| **UI 요소**     | 재사용 가능한 컴포넌트 단위 (ProductCard, Pagination 등)  | "ProductCard에 hover 시 그림자 효과 넣어줘."     |
| **Layout**    | 전역 또는 특정 페이지 레이아웃(app/layout.tsx, sidebar 등) | "settings 페이지에 2단 레이아웃 적용해줘."          |
| **Blueprint** | 페이지 구조 및 이동 경로 정의 문서                         | "products → products/[id] 경로 시뮬레이션 추가" |

---

### 5. 협업 방식

1. **문서 우선**: Blueprint → UI 요소 문서 → 토큰 재정의 순으로 작성
2. **AI 자동화**: 문서 기반 코드 자동 생성 및 수정
3. **개발자 검토**: AI가 생성한 코드 및 스타일 검토 후 피드백 반영
4. **반복 개선**: AGENT 용어 기반으로 CLI 명령 → 코드 반영 → 재검토

---

### 6. 기대 효과

* **공통 언어 기반 협업**: AI와 개발자 간 오해 최소화 및 원활한 협업
* **자동화된 코드 생성**: 반복 작업 제거, 개발 속도 향상
* **일관성 있는 스타일 적용**: 토큰 중심 디자인 시스템 유지
* **빠른 프로토타입 → 제품화 전환**: 아이디어에서 빌드까지 시간 단축

---

### 4. 워크플로우

## STEP 1. **아이디어 문서화 (PRD.md + AGENT.md)**

* **PRD.md**: 제품의 목표, 대상 사용자, 핵심 기능, 기대 효과를 문서화한다.

  * 작성하면서 아이디어의 타당성 1차 검증이 자연스럽게 이루어진다.
* **AGENT.md**:

  * "무엇을, 왜 만들려 하는지" 의도를 AI Agent에게 전달하는 명령문서 역할.
  * 변경/개선 프로세스: 디자인 관련 변경은 **style-guide.md** → **tokens.json** → 코드 순서로 이루어진다는 원칙을 포함.

---

## STEP 2. **Design System 추출 (extract-design-system)**

* 입력: 기존 앱 스크린샷, 벤치마크 사이트 링크
* 출력:

  * `style-guide.md` → 브랜드 색상, 폰트, 간격 규칙 정리
  * `tokens.json` → 디자인 토큰(JSON 포맷) 추출
* 자동화: AI Agent CLI로 기존 자산 분석 → 디자인 토큰 및 가이드 자동 생성

---

## STEP 2.1. **디자인 시스템 시각화 (Visualize Design System)**

*   **목적**: 추출된 디자인 시스템(`tokens.json`)을 실제 Next.js 환경에서 즉시 시각화하고 검증한다.
*   **자동화 작업 (신규 명령어: `ds:visualize`):**
    *   `ds:visualize <APP_PATH>` 명령어를 사용하여 디자인 토큰을 Next.js 앱에 통합하고 스타일 가이드 페이지를 생성합니다.
    *   이 명령어는 `docs/tokens.json`을 기반으로 Tailwind CSS 설정을 업데이트하고, 디자인 토큰을 시각적으로 보여주는 `app/style-guide/page.tsx`를 생성합니다.

---

## STEP 3. **App Screen 조립 (Assemble App Spaces)**

* **목적**: 
  * App Screen은 사용자에게 활동 공간을 제공하는데, AI 'canvas' 기능을 활용하여 실제 앱의 화면(Space)을 조합, 조립한다.
  * STEP 3는 수작업으로 진행된다.
  
* **입력**:
  * `docs/style-guide.md` 문서 참조
  * 사용자의 활동 공간별 요구사항을 prompt로 입력

* **출력**:   
  * `./docs/html/` 폴더 내의 샘플 HTML 파일들 (화면 구조 및 기능 참고용)

---

## STEP 4. **Design Spec 작성 (design-spec.md)**

* 기술 스택 명시: NextJS + Tailwind + Supabase
* 화면 list, 화면 흐름, 상태 관리 방식, API 연동 지점 등 문서화
* Step 2, 3에서 만든 디자인 샘플을 기반으로 최종 스펙 정리
* 단, database 연동은 추후 설계/구현 한다. mock-data로 App 동작만 확인한다.
---

## STEP 5. **AI Canvas 혹은 Stitch → React 코드 생성**

* 입력:

  * `design-spec.md`
  * sample HTML + CSS
  * master prompt
* 출력: React 코드 (Tailwind 적용)
* 원칙: `style-guide.md` 및 `tokens.json` 기준으로 스타일 자동 적용

---

## STEP 6. **NextJS 변환 + Feedback 기능 추가**

* React 코드 → NextJS 변환
* 화면 하단 우측에 **Feedback Floating Button** 추가:

  * 앱 내에서 디자인 피드백을 즉시 입력 가능
  * 현재 사용 중인 **style-guide & tokens.json** 화면을 함께 노출
  * 피드백 → 디자인 토큰 개선 → 앱 재빌드 사이클 자동화

---

## STEP 7. **Prototype → PDSA 사이클 운영**

* **Plan**: 변경 계획 수립 (피드백 기반)
* **Do**: 수정 반영 (디자인 토큰 및 UI 컴포넌트 업데이트)
* **Study**: 변경 전후 UX 측정 (AI 자동 로그 분석 가능)
* **Act**: 개선 반영 후 루프 반복

---

## STEP 8. **Starter Template 구축**

*   **목적**: 아이디어에서 앱 개발, 디자인 시스템 개선까지의 모든 과정을 담은 재사용 가능한 템플릿을 구축합니다.
*   **사용 방법**:
    1.  GitHub에서 `starter-template` 저장소를 클론합니다.
    2.  클론된 `starter-template`의 루트 디렉토리에서 다음 명령어를 실행하여 새로운 Next.js 앱을 생성합니다.
        `npx create-next-app@latest my-app --typescript --eslint --tailwind --app`
    3.  생성된 `my-app` 디렉토리 안에서 개발을 시작합니다.

이렇게 하면,

* 한쪽에서는 앱 프로토타입을 개발하고,
* 다른 한쪽에서는 디자인 시스템이 지속적으로 개선되며,
* 결과적으로 **Starter Template**가 진화해서 다른 프로젝트에서도 바로 재사용 가능합니다.

### 부록1
- devtool mcp server 활용

### 부록2: Install Tailwind CSS with Next.js

```
npx create-next-app@latest goalcracker --typescript --eslint --app
cd goalcracker

npm install tailwindcss @tailwindcss/postcss postcss
```

- globals.css
```
@import "tailwindcss";
```


- page.tsx
```
export default function Home() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}
```
export default config;
```

```
npm run dev
```