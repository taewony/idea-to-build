# Next.js 기반 GoalCracker 신규 앱 개발 계획 (v6)

## 1. 핵심 목표 및 원칙

- **최종 목표**: 사용자가 생성한 `goalcracker` Next.js 프로젝트에 `source/goalcracker`의 UI/UX와 `my-project`의 핵심 로직을 완벽하게 이식한다.
- **핵심 원칙: 픽셀 퍼펙트 복제 (Pixel-Perfect Replication)**: 개발의 모든 단계에서 가장 중요한 것은 최종 결과물이 원본 `source/goalcracker` 앱과 시각적으로 **완벽하게 동일해야 한다**는 점이다. UI/UX의 어떤 변경도 허용되지 않는다.
- **기술 표준**: Tailwind CSS v4.1의 "CSS-first" 접근 방식을 철저히 준수한다.

## 2. 개발 계획

### Phase 1: 디자인 시스템의 완벽한 복제 (완료)

1.  **Next.js 프로젝트 준비 (사용자 생성 완료)**
2.  **Tailwind CSS 테마 직접 설정 완료**
3.  **전역 스타일 및 폰트 적용 완료**

### Phase 2: 핵심 UI/UX 마이그레이션 및 반복적 검증

**각 컴포넌트를 이전할 때마다, 즉시 원본과 시각적으로 비교하여 1:1 일치 여부를 확인하는 것을 원칙으로 합니다.**

1.  **상태 관리 로직 복사**:
    - `my-project/lib/store.ts` 파일을 `goalcracker/lib/store.ts` 경로로 복사합니다.

2.  **Layout 및 Header 컴포넌트 이전**:
    - `source/goalcracker`의 `Header` 컴포넌트를 `goalcracker/components/layout/Header.tsx`로 이전합니다.
    - `goalcracker/app/layout.tsx`가 이 `Header`를 사용하도록 수정합니다.
    - **검증**: 개발 서버에서 `Header`가 원본과 완벽히 동일하게 보이는지 확인합니다.

3.  **페이지별 마이그레이션 및 검증 (진행 중)**:
    - **HomePage (`/app/page.tsx`)**: 원본의 `HomePage` UI를 가져와 구현합니다. **즉시 원본과 시각적으로 비교 검증합니다.**
    - **ChallengesPage (`/app/challenges/page.tsx`)**: 원본의 `ChallengesPage` 및 `ChallengeCard` UI를 가져와 구현하고, `store.ts`의 로직과 연결합니다. **즉시 원본과 시각적으로 비교 검증합니다.**
    - 이와 같은 방식으로 `MyGoalsPage`, `GoalTasksPage`, `WallPage`, `SettingsPage` 등 모든 페이지를 순서대로 마이그레이션하고 **각각 검증**합니다.

### Phase 3: 최종 통합 검증

1.  **전체 기능 및 UI 검증**:
    - 모든 페이지가 마이그레이션된 후, 전체 애플리케이션을 실행하여 페이지 간의 상호작용, 데이터 흐름, 그리고 모든 UI 요소가 원본 `source/goalcracker`와 **픽셀 수준에서 동일하게** 동작하고 보이는지 최종 검증합니다.

2.  **코드 품질 검사 및 빌드**:
    - `npm run lint`로 코드를 정리하고, `npm run build`로 최종 빌드에 성공하는지 확인합니다.

### Phase 4: 디자인 시스템 문서화

**애플리케이션이 완벽하게 복제된 후, 구현된 스타일을 기반으로 문서를 생성합니다.**

1.  **`tokens.json` 생성 (CSS로부터)**:
    - `goalcracker/app/globals.css` 파일의 `@theme` 블록을 파싱하여 프로젝트 루트에 `tokens.json` 파일을 생성합니다.

### Phase 5: 스타일 가이드 페이지 생성

1.  **스타일 가이드 페이지 생성 (`tokens.json`으로부터)**:
    - `goalcracker/app/style-guide/page.tsx` 파일을 생성하고, 새로 만든 `tokens.json` 파일을 읽어 디자인 시스템의 모든 요소를 동적으로 렌더링합니다.