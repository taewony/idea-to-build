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

현재 프로젝트 구조는 초기 설정 단계에 있으며, 핵심 라우팅 및 기본 컴포넌트가 자리 잡고 있습니다. 제안되었던 모든 기능이 아직 구현되지 않았습니다.

```
/my-project
├── /app
│   ├── /(main)
│   │   ├── /challenges
│   │   │   └── page.tsx
│   │   ├── /goals
│   │   │   ├── /[goalId]/tasks
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── /settings
│   │   │   └── page.tsx
│   │   ├── /wall
│   │   │   └── page.tsx
│   │   ├── layout.tsx                (메인 앱 레이아웃)
│   │   └── page.tsx                  (메인 대시보드 페이지)
│   ├── /style-guide
│   │   └── page.jsx                  (UI 컴포넌트 및 스타일 가이드)
│   ├── globals.css
│   └── layout.tsx                    (루트 레이아웃)
├── /components
│   └── /layout
│       └── Navbar.tsx                (상단 네비게이션 바)
├── /lib
│   └── /store.ts                     (Zustand 상태 관리 스토어)
└── ... (package.json, next.config.ts 등 기타 설정 파일)
```

## 4. 데이터 모델 (Supabase 테이블)

다음은 애플리케이션 기능을 지원하기 위해 **제안되는** 데이터베이스 스키마입니다. 실제 구현 시 변경될 수 있습니다.

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

## 5. 페이지 및 컴포넌트 상세 설계 (현재 기준)

현재 파일 구조를 기반으로 각 페이지의 목적과 필요한 컴포넌트를 재정의합니다. 아직 구현되지 않은 컴포넌트는 명시적으로 표시합니다.

### 5.1. 메인 대시보드 (`/(main)/page.tsx`)

- **목적:** 사용자의 현재 상태, 인기 목표, 주요 메뉴를 한눈에 보여주는 진입점.
- **컴포넌트:**
  - `Navbar`: 메인 네비게이션 (구현됨).
  - `HeroSection`: 환영 메시지 및 앱 소개 (구현 필요).
  - `PopularChallenges`: 인기 챌린지 목록 (구현 필요).
  - `MyGoalsPreview`: 내 목표 미리보기 (구현 필요).

### 5.2. AI 잔소리 담벼락 (`/wall/page.tsx`)

- **목적:** 모든 사용자를 대상으로 AI가 생성한 "잔소리"와 "칭찬"을 보여주는 소셜 피드.
- **필요 컴포넌트:**
  - `WallPost`: 단일 게시물을 표시하는 카드 컴포넌트 (구현 필요).
  - `WallFeed`: `WallPost` 목록을 벽돌 레이아웃으로 렌더링하는 컨테이너 (구현 필요).

### 5.3. 도전 목록 (`/challenges/page.tsx`)

- **목적:** 사용자가 참여할 수 있는 모든 공식 챌린지를 나열합니다.
- **필요 컴포넌트:**
  - `ChallengeCard`: 챌린지 정보를 표시하는 카드 컴포넌트 (구현 필요).
  - `ChallengeList`: `ChallengeCard` 목록을 표시하는 컨테이너 (구현 필요).

### 5.4. 나의 목표 (`/goals/page.tsx`)

- **목적:** 사용자가 자신의 단기 및 장기 목표를 생성하고 관리합니다.
- **필요 컴포넌트:**
  - `GoalForm`: 새 목표를 추가하는 폼 (구현 필요).
  - `GoalCard`: 목표를 표시하는 카드 (구현 필요).
  - `GoalList`: `GoalCard` 목록을 렌더링하는 컨테이너 (구현 필요).

### 5.5. 목표별 할 일 관리 (`/goals/[goalId]/tasks/page.tsx`)

- **목적:** 특정 목표 하나에 대한 할 일 목록을 관리하는 전용 페이지.
- **필요 컴포넌트:**
  - `GoalHeader`: 상위 목표의 제목을 표시 (구현 필요).
  - `TaskForm`: 새 할 일을 추가하는 폼 (구현 필요).
  - `TaskItem`: 단일 할 일 항목 (구현 필요).
  - `TaskList`: `TaskItem` 목록을 렌더링하는 컨테이너 (구현 필요).

### 5.6. AI 비서 설정 (`/settings/page.tsx`)

- **목적:** 사용자가 자신의 AI 비서의 페르소나, 말투 등을 커스터마이징합니다.
- **필요 컴포넌트:**
  - `CharacterSelector`: AI 페르소나 선택 UI (구현 필요).
  - `ToneSelector`: AI 말투 조절 UI (구현 필요).
  - `SettingsForm`: 설정을 저장하는 폼 (구현 필요).

### 5.7. 스타일 가이드 (`/style-guide/page.jsx`)

- **목적:** 프로젝트에서 사용되는 UI 컴포넌트, 색상, 타이포그래피 등 디자인 시스템을 시각적으로 보여주는 페이지.
- **내용:** 현재 프로젝트에 적용된 스타일 요소들을 확인하고 테스트하는 공간으로 활용.

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
