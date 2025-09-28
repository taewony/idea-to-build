
# 디자인 토큰 적용 현황 리뷰

이 문서는 현재 프로젝트의 페이지들이 `tokens.json`에 정의된 디자인 토큰을 얼마나 준수하고 있는지 분석합니다.

## 총평

현재 구현된 대부분의 페이지는 `tokens.json`에 정의된 디자인 토큰 대신, Tailwind CSS의 기본 스타일과 하드코딩된 값(`bg-indigo-600`, `text-gray-800`, `bg-[#D4BFA9]` 등)에 크게 의존하고 있습니다.

디자인 시스템의 일관성을 확보하고 유지보수성을 높이기 위해, `tailwind.config.ts` 파일에 디자인 토큰을 연동한 후, 각 페이지의 스타일을 토큰 기반의 클래스로 리팩토링하는 작업이 필요합니다.

---

## 페이지별 분석

### 1. 전역 스타일 및 배경

- **현황**: `page.tsx`, `goals/page.tsx`, `challenges/page.tsx`, `settings/page.tsx` 등 다수 페이지에 `bg-[#D4BFA9]`라는 하드코딩된 색상 코드가 배경색으로 사용되고 있습니다.
- **개선 제안**:
  - `tokens.json`의 `neutral.background` (`#EDE3DA`) 또는 `wood.light` (`#A97461`)와 같이 의미 있는 토큰으로 배경색을 대체해야 합니다.
  - `tailwind.config.ts`에 해당 색상을 등록하여 `bg-neutral-background`와 같은 클래스로 사용할 수 있도록 설정이 필요합니다.

### 2. Navbar (`components/layout/Navbar.tsx`)

- **현황**:
  - 로고 텍스트 색상으로 `text-indigo-600`이 사용되었습니다.
  - 네비게이션 링크에 `text-gray-600`, `hover:text-indigo-600`이 사용되었습니다.
- **개선 제안**:
  - `text-indigo-600`은 `colors.primary.base` (`#FF9966`) 토큰을 사용한 `text-primary` 클래스로 대체해야 합니다.
  - `text-gray-600`은 `colors.neutral.base` (`#6B4F3F`) 토큰을 사용한 `text-neutral` 클래스로 대체하는 것을 고려할 수 있습니다.

### 3. 메인 대시보드 (`app/(main)/page.tsx`)

- **현황**:
  - `GoalCard`의 진행률 바, 링크 텍스트 등에 `bg-indigo-600`, `text-indigo-600`이 사용되었습니다.
  - `ChallengeCard`의 D-Day 배지에 `bg-blue-100`, `text-blue-600`이 사용되었습니다.
  - 하단의 '담벼락 구경가기' 버튼에 `bg-gray-800`이 사용되었습니다.
- **개선 제안**:
  - **일관성 부족**: `indigo`, `blue`, `gray` 등 여러 색상이 혼재되어 있어 주 색상(Primary Color)의 역할이 모호합니다.
  - `indigo` 계열 색상은 모두 `colors.primary` 토큰 계열로 통일해야 합니다.
  - `blue` 계열 색상은 `colors.accent` 중 하나로 지정하거나 `primary`로 통일해야 합니다.

### 4. AI 잔소리 담벼락 (`app/(main)/wall/page.tsx`)

- **현황**:
  - '칭찬' 포스트에 `text-blue-600`, '비판' 포스트에 `text-red-600`이 사용되었습니다.
  - 아바타 배경으로 `bg-gray-700`, `bg-yellow-500`이 사용되었습니다.
- **개선 제안**:
  - `tokens.json`의 `accent` 토큰을 활용하기 좋은 예시입니다.
  - '칭찬'은 `accent.greenSuccess` (`#7ED957`) 또는 `accent.celebration` (`#FF70A6`)으로, '비판'은 `accent.motivation` (`#FF9770`)과 같이 의미가 명확한 토큰으로 매핑할 수 있습니다.

### 5. 목표 및 할 일 페이지 (`goals/page.tsx`, `tasks/page.tsx`)

- **현황**:
  - 필터 버튼, 추가 버튼 등 핵심 상호작용 요소에 `bg-indigo-500`, `bg-indigo-600`이 일관성 없이 사용되고 있습니다.
  - 목표 유형(단기/장기) 배지에 `bg-blue-200`, `bg-purple-200`이 사용되었습니다.
- **개선 제안**:
  - 모든 주요 버튼 색상은 `colors.primary.base` 토큰으로 통일해야 합니다.
  - 보조적인 정보(배지 등)는 `colors.primary.light` 또는 `accent` 토큰을 활용하여 위계를 설정해야 합니다.

### 6. 설정 페이지 (`settings/page.tsx`)

- **현황**:
  - 현재 선택된 캐릭터 이름, 선택된 카드 테두리에 `text-indigo-600`, `border-indigo-500`이 사용되었습니다.
- **개선 제안**:
  - 이 페이지는 비교적 `indigo` 계열로 통일성이 있지만, 이 역시 `primary` 토큰으로 대체되어야 완전한 디자인 시스템을 따르게 됩니다.

---

## 결론 및 다음 단계

1.  **`tailwind.config.ts` 설정**: `tokens.json`의 값을 `tailwind.config.ts`의 `theme.extend`에 등록하여 토큰을 클래스 이름으로 사용할 수 있도록 환경을 설정하는 것이 가장 시급합니다.
    - 예: `colors: { primary: { base: '#FF9966' } }` -> `.text-primary-base` 사용 가능
2.  **전체 리팩토링**: 설정이 완료된 후, 모든 페이지와 컴포넌트를 순회하며 기존의 하드코딩된 값과 기본 Tailwind 클래스를 토큰 기반의 새로운 클래스로 교체해야 합니다.
3.  **`style-guide` 페이지 개선**: 현재 `style-guide/page.jsx`가 존재하지만, 실제 토큰이 적용된 컴포넌트가 아닌 단순 시각화 페이지일 가능성이 높습니다. 리팩토링이 완료된 후, 실제 앱에서 사용하는 컴포넌트를 가져와 스타일 가이드를 구성해야 진정한 의미의 살아있는 디자인 시스템(Living Design System)이 됩니다.
