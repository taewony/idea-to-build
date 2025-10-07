알겠습니다! 실제 앱 디자인을 빠르게 이해하고 바로 써먹을 수 있게 **디자인 Fast Track 용어사전 + 치트시트(cheat sheet)** 형태로 정리해 드리겠습니다.
이건 초보 디자이너나 개발자가 **실무 디자인에 필요한 최소한의 개념을 빠르게 익히고**, 바로 **디자인 시스템**이나 **UI 구현**으로 연결할 수 있게 돕는 문서입니다.

---

# 앱 디자인 Fast Track 용어사전 & Cheat Sheet

*(초보자 → 실무 디자인 감각까지 가는 지름길)*

## 1. 색상(Color System)

| 용어                    | 설명                             | 예시 코드/토큰                           |
| --------------------- | ------------------------------ | ---------------------------------- |
| **Primary Color**     | 브랜드 아이덴티티의 핵심 색. 버튼, 주요 강조에 사용 | `--color-primary: #0A5F55;`        |
| **Secondary Color**   | 보조 색상. 서브 강조 요소, 차트, 배지 등에 사용  | `--color-secondary: #FFC107;`      |
| **Neutral Colors**    | 회색 계열. 배경, 테두리, 텍스트 색조 등에 사용   | `--color-neutral-900: #111827;`    |
| **Accent Color**      | 특별 강조 색상. 알림, 경고, 성공 상태 등에 사용  | `--color-accent-success: #22C55E;` |
| **Light / Dark Mode** | 다크모드/라이트모드 테마 색상 세트            | `--color-bg-dark: #1E1E1E;`        |

**Tip:** 색상은 **역할(role)** 중심으로 정의 → primary, success, error 등.

---

## 2. 타이포그래피(Typography System)

| 용어                 | 설명                                | 예시 코드                           |
| ------------------ | --------------------------------- | ------------------------------- |
| **Font Family**    | 글꼴 집합 (ex. Sans-serif, Serif)     | `--font-sans: "Inter", sans;`   |
| **Font Size**      | 글자 크기 (px, rem 단위)                | `--font-size-h1: 32px;`         |
| **Font Weight**    | 굵기 (Light, Regular, Medium, Bold) | `--font-weight-bold: 700;`      |
| **Line Height**    | 줄 간격                              | `--line-height-body: 1.5;`      |
| **Letter Spacing** | 글자 간 간격                           | `--letter-spacing-tight: -0.5;` |

**Tip:** 기본은 "H1, H2, H3, Body, Caption"처럼 **계층 구조**로 정의.

---

## 3. Shape & Layout

| 용어                  | 설명                           | 예시 코드                     |
| ------------------- | ---------------------------- | ------------------------- |
| **Border Radius**   | 모서리 둥글기                      | `--radius-md: 8px;`       |
| **Spacing / Gap**   | 패딩·마진 간격 스케일                 | `--spacing-4: 16px;`      |
| **Elevation**       | 그림자 깊이(Shadow Depth)         | `--shadow-sm: 0 1px 2px…` |
| **Grid System**     | 12컬럼, 8pt 그리드 등 레이아웃 기준      | Responsive Breakpoints    |
| **Container Width** | 콘텐츠 최대 폭 (모바일, 태블릿, 데스크톱 기준) | 600px, 960px, 1280px      |

**Tip:** Material Design / iOS Human Interface Guidelines에 레이아웃 규칙 잘 나와 있음.

---

## 4. 기본 UI 컴포넌트(Component Basics)

| 컴포넌트             | 기본 사용처         | 핵심 속성                       |
| ---------------- | -------------- | --------------------------- |
| **Button**       | 액션 트리거         | 색상, Radius, Hover, Disabled |
| **Card**         | 컨텐츠 묶음         | 그림자, 패딩, radius             |
| **Input Field**  | 텍스트 입력, 포커스 상태 | border, focus color         |
| **Modal/Dialog** | 팝업, 알림         | Overlay, Close button       |
| **Nav Bar**      | 상단 메뉴, 하단 탭바   | Height, BG color, Shadow    |
| **Badge/Tag**    | 상태 라벨, 수치 표시   | Color, Size, Shape          |
| **Table/List**   | 데이터 목록 표시      | Row height, Header style    |
| **Tooltip**      | 짧은 힌트 메시지      | Delay, BG color, Arrow      |

---

## 5. 디자인 토큰(Design Tokens) 개념

**디자인 토큰 = 디자인 속성을 코드로 관리하는 표준화된 변수**
예:

```css
:root {
  --color-primary: #0A5F55;
  --font-size-body: 16px;
  --radius-md: 8px;
}
```

→ 토큰이 바뀌면 **디자인 전체**에 반영 가능 (Theme 변경, Dark Mode 등)

---

## 6. 상태(State) 디자인 패턴

| 상태           | 예시 컴포넌트     | 특징                  |
| ------------ | ----------- | ------------------- |
| **Default**  | 버튼, 입력창     | 기본 상태               |
| **Hover**    | 버튼, 카드      | 마우스 올렸을 때 시각 효과     |
| **Active**   | 토글, 드롭다운    | 클릭 시, 선택된 상태        |
| **Disabled** | 버튼, 입력창     | 회색 처리, 클릭 불가        |
| **Focus**    | 입력창, 접근성 고려 | 키보드 포커스, outline 처리 |
| **Loading**  | 버튼, 데이터 리스트 | 스피너, 로딩 인디케이터       |

---

## 7. 모션(Motion) & 피드백

| 개념                    | 설명                       | 예시                  |
| --------------------- | ------------------------ | ------------------- |
| **Transition**        | hover → active 부드러운 전환   | `transition: 0.2s;` |
| **Animation**         | 스피너, 페이드 인/아웃            | Keyframes           |
| **Micro-Interaction** | 클릭 시 아이콘 살짝 흔들림, 체크마크 등장 | Success Toast       |
| **Feedback**          | 성공/실패 시 Alert, Toast     | Color + Motion      |

---

## 8. 퀵스타트 학습 경로 (Fast Track)

1. **색상·타이포 토큰** → Primary/Secondary, FontScale 3\~5단계 정의
2. **컴포넌트 3종** → Button, Card, Input 먼저 시각화
3. **상태 디자인** → Hover/Disabled/Loading 추가
4. **레이아웃 & 그리드** → 반응형 레이아웃 패턴 이해
5. **토큰화** → 모든 속성 CSS 변수로 추출 → 다크모드 지원 가능
6. **Storybook/Showcase** → 시각적 문서화 + 팀 공유

---

## 9. 추천 학습 리소스

* **Material Design 3**: [https://m3.material.io](https://m3.material.io)
* **iOS Human Interface Guidelines**: Apple 공식 문서
* **Tailwind UI Docs**: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
* **Design Tokens W3C**: [https://design-tokens.github.io/community-group/](https://design-tokens.github.io/community-group/)

---

원하시면 제가 이걸 바로 **한 장짜리 PDF 치트시트**로 정리해서 드릴 수도 있습니다.

혹은 아예 이 용어사전을 기반으로 Next.js **Interactive Style Guide** 페이지에서 색상·타이포·컴포넌트를 클릭하며 배우는 **시각 학습 툴**로 만들어 드릴 수도 있습니다.

어떤 걸 먼저 해드릴까요? PDF 치트시트 제작? 아니면 학습용 웹 툴 제작?
