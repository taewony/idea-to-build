# 디자인 명세서: AI 잔소리 목표 관리 앱

## 1. 개요

이 문서는 "AI 잔소리" 목표 관리 애플리케이션 구축을 위한 디자인 및 기술 명세서입니다. 이 앱은 학생들이 AI 기반의 격려와 "잔소리"를 통해 목표를 설정, 추적, 달성할 수 있도록 설계되었습니다. 소셜 피드, 공식 챌린지, 개인 목표/과제 관리 기능을 포함하며, 일관성 있고 직관적인 사용자 인터페이스로 구성됩니다.

**핵심 아이디어:** 사용자가 개인 목표를 관리하고, 공개 챌린지에 참여하며, 진행 상황을 공유할 수 있는 동기 부여 환경을 조성합니다. 이 모든 과정은 설정 가능한 AI 비서의 도움을 받습니다.

## 2. 기술 스택

- **프레임워크:** Next.js 14+ (App Router)
- **언어:** TypeScript
- **스타일링:** Tailwind CSS 4.1
- **UI 컴포넌트:** Shadcn/UI (Tailwind와의 호환성 및 접근성, 커스터마이징 용이성으로 추천)
- **상태 관리:** Zustand (사용자 세션, AI 설정 등 간단하고 확장 가능한 전역 상태 관리에 용이)
- **데이터 페칭:** React Query (TanStack Query) (강력한 클라이언트 측 데이터 페칭, 캐싱, 뮤테이션 관리)
- **백엔드 & 데이터베이스:** Supabase (Postgres 데이터베이스, 인증, API 자동 생성 기능이 통합되어 있어 MVP 빠른 개발에 최적화)
- **배포:** Vercel

## 3. 프로젝트 구조 (Next.js App Router)

```
/my-project
├── /app
│   ├── /api
│   │   └── /... (서버 사이드 로직을 위한 API Routes)
│   ├── /(auth)
│   │   ├── /login
│   │   └── /signup
│   ├── /(main)
│   │   ├── /@modal/(.)ai-nudge/page.tsx  (모달을 위한 인터셉트 라우트)
│   │   ├── /challenges/page.tsx
│   │   ├── /goals/page.tsx
│   │   ├── /settings/page.tsx
│   │   ├── /goals/[goalId]/tasks/page.tsx
│   │   ├── /wall/page.tsx
│   │   ├── layout.tsx                (Navbar를 포함한 메인 앱 레이아웃)
│   │   └── page.tsx                  (대시보드)
│   ├── /ai-nudge/page.tsx            (모달의 독립 실행 페이지)
│   ├── globals.css
│   └── layout.tsx                    (루트 레이아웃)
├── /components
│   ├── /auth
│   ├── /forms
│   ├── /layout
│   │   ├── Navbar.tsx
│   │   └── FAB.tsx                   (플로팅 액션 버튼)
│   └── /ui                           (Shadcn/UI 컴포넌트: Button, Card 등)
│   └── /shared                       (기능 전반에서 재사용되는 컴포넌트)
│       ├── GoalCard.tsx
│       ├── ChallengeCard.tsx
│       ├── TaskItem.tsx
│       └── WallPost.tsx
├── /lib
│   ├── /actions.ts                   (서버 액션)
│   ├── /db.ts                        (데이터베이스 클라이언트)
│   ├── /hooks.ts                     (커스텀 React 훅)
│   └── /utils.ts                     (유틸리티 함수)
├── /public
└── tailwind.config.ts
```

## 4. 데이터 모델 (Supabase 테이블)

- **`users`**: 사용자 정보 저장 (id, email, name, avatar_url).
- **`ai_settings`**: 각 사용자의 AI 설정 저장.
  - `user_id` (FK to `users.id`)
  - `character` (e.g., 'critic', 'praiser')
  - `tone` (e.g., 'strict', 'friendly')
- **`goals`**: 사용자가 생성한 목표 저장.
  - `id`, `user_id`, `title`, `type` ('short' | 'long'), `is_achieved`, `created_at`
- **`tasks`**: 특정 목표와 관련된 할 일 저장.
  - `id`, `goal_id` (FK to `goals.id`), `content`, `is_completed`, `created_at`
- **`challenges`**: 공식적인 공개 챌린지 저장.
  - `id`, `title`, `description`, `deadline`, `participant_count`
- **`user_challenges`**: 사용자와 챌린지 참여 정보를 연결하는 중간 테이블.
  - `user_id`, `challenge_id`, `status`
- **`wall_posts`**: "AI 잔소리 담벼락"의 게시물 저장.
  - `id`, `user_id`, `goal_id` (FK to `goals.id`), `content`, `ai_character`, `post_type` ('nag' | 'praise'), `created_at`

## 5. 페이지 및 컴포넌트 상세 설계

모든 주요 페이지((main) 라우트 그룹)는 상단 네비게이션 바(Navbar)를 포함하는 공통 레이아웃을 공유합니다. 이를 통해 일관된 사용자 경험을 제공합니다.

### 5.1. 메인 대시보드 (`/`)

- **목적:** 사용자의 현재 상태, 인기 목표, 주요 메뉴를 한눈에 보여줍니다.
- **컴포넌트:**
  - `Navbar`: 메인 네비게이션.
  - `HeroSection`: 환영 메시지 및 앱 소개.
  - `PopularChallenges`: `/challenges` 페이지의 인기 챌린지 Top 3를 표시.
  - `MyGoalsPreview`: `/goals`에 있는 내 목표 중 활성화된 목표 3-5개를 미리 보여줌.
  - `FAB`: 홈 이동 및 AI Nudge 기능에 빠르게 접근할 수 있는 플로팅 액션 버튼.

### 5.2. AI 잔소리 담벼락 (`/wall`)

- **목적:** 모든 사용자를 대상으로 AI가 생성한 "잔소리"와 "칭찬"을 보여주는 소셜 피드.
- **컴포넌트:**
  - `WallPost`: 단일 게시물을 표시하는 카드 컴포넌트. `wall.html`에서 본 것처럼 `ai_character`('critic' vs 'praiser')에 따라 아바타, 색상, 텍스트 정렬 등 스타일이 달라짐.
  - `WallFeed`: `WallPost` 컴포넌트 목록을 가져와 벽돌 레이아웃(masonry)으로 렌더링.

### 5.3. 도전 목록 (`/challenges`)

- **목적:** 사용자가 참여할 수 있는 모든 공식 챌린지를 나열합니다.
- **컴포넌트:**
  - `ChallengeCard`: `challenges.html`의 디자인을 기반으로 제목, D-Day, 참여자 수, "내 목표로 추가" 버튼을 포함한 상세 카드.
  - `ChallengeList`: `ChallengeCard` 컴포넌트 목록을 가져와 표시.

### 5.4. 나의 목표 (`/goals`)

- **목적:** 사용자가 자신의 단기 및 장기 목표를 생성하고 관리합니다.
- **컴포넌트:**
  - `GoalForm`: `goals.html`처럼 새 목표를 추가하는 폼.
  - `GoalCard`: 목표를 표시하는 카드. 완료 및 삭제 버튼 포함. 달성된 목표는 스타일이 변경됨.
  - `FilterButtons`: '전체', '단기', '장기', '달성'으로 목표를 필터링하는 버튼.
  - `GoalList`: 필터링 상태를 관리하고 `GoalCard` 컴포넌트 목록을 렌더링.

### 5.5. 목표별 할 일 관리 (`/goals/[goalId]/tasks`)

- **목적:** 특정 목표 하나에 대한 할 일 목록을 관리하는 전용 페이지.
- **컴포넌트:**
  - `GoalHeader`: 상위 목표의 제목을 표시.
  - `TaskForm`: 새 할 일을 추가하는 간단한 폼.
  - `TaskItem`: `tasks.html`처럼 체크박스, 텍스트, 삭제 버튼이 있는 단일 할 일 항목.
  - `TaskList`: `TaskItem` 컴포넌트 목록을 렌더링하고 필터링(전체, 진행 중, 완료)을 처리.

### 5.6. AI 비서 설정 (`/settings`)

- **목적:** 사용자가 자신의 AI 비서를 커스터마이징합니다.
- **컴포넌트:**
  - `CharacterSelector`: AI 페르소나("냉혹한 비판가", "달콤한 칭찬가" 등)를 선택하는 라디오 버튼 또는 카드 컴포넌트.
  - `ToneSelector`: AI의 말투를 미세 조정하는 슬라이더 또는 드롭다운.
  - `SettingsForm`: 사용자 설정을 저장하는 폼.

### 5.7. AI Nudge 모달 (`/ai-nudge`)

- **목적:** AI로부터 랜덤 조언이나 "잔소리"를 제공하는 모달.
- **구현:** Next.js의 [Intercepting Routes](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes) 기능을 사용하여 구현.
  - `FAB` 클릭 시 `/ai-nudge`로 이동.
  - 이 라우트는 `/(main)/@modal/(.)ai-nudge/page.tsx`에 의해 가로채져 모달 오버레이를 렌더링.
  - 모달에는 AI가 생성한 메시지와 "담벼락에 게시" 버튼이 포함됨.
  - 페이지를 직접 새로고침하는 등 직접 접근 시에는 `/ai-nudge/page.tsx`가 전체 페이지로 렌더링됨.

## 6. 구현 계획 (단계별)

1.  **1단계: 프로젝트 설정 및 핵심 레이아웃**
    - TypeScript와 Tailwind CSS로 Next.js 프로젝트 초기화.
    - Supabase 프로젝트 설정 및 데이터베이스 스키마 정의.
    - 루트 레이아웃 및 메인 앱 레이아웃(`/(main)/layout.tsx`) 생성.
    - 공통으로 사용될 `Navbar`와 `FAB` 컴포넌트 구현.

2.  **2단계: 인증 및 사용자 관리**
    - 회원가입 및 로그인 페이지(`/(auth)`) 구현.
    - Supabase Auth를 연동하여 사용자 세션 관리.
    - AI 설정을 관리할 `/settings` 페이지 생성.

3.  **3단계: 핵심 기능 - 목표와 할 일**
    - 목표에 대한 전체 CRUD(생성, 조회, 수정, 삭제) 기능이 포함된 `/goals` 페이지 구축.
    - 목표와 연결된 할 일의 CRUD 기능이 포함된 동적 라우트 페이지 `/goals/[goalId]/tasks` 구축.

4.  **4단계: 공개 및 소셜 기능**
    - 공식 챌린지 목록을 가져와 표시하는 `/challenges` 페이지 구축.
    - 챌린지를 사용자의 개인 목표에 추가하는 기능 구현.
    - `wall_posts` 테이블에서 게시물을 가져와 표시하는 `/wall` 페이지 구축.

5.  **5단계: AI 연동**
    - 인터셉트 라우트를 사용하여 AI Nudge 모달 기능 구현.
    - 사용자 진행 상황과 설정에 따라 잔소리/칭찬을 생성하기 위해 AI 서비스(예: Gemini API)와 연결하는 서버리스 함수(또는 API 라우트) 생성.
    - AI 메시지를 담벼락에 게시하는 로직 구현.

6.  **6단계: 개선 및 배포**
    - UI/UX 개선, 애니메이션 추가, 반응형 디자인 확인.
    - 기능 테스트.
    - Vercel에 배포.
