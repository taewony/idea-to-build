# Design Specification for slei10th.com Clone

이 문서는 `slei10th.com` 웹사이트를 Next.js와 Tailwind CSS를 사용하여 복제하기 위한 기술적인 설계 명세입니다. `specs/extract.md`의 분석 결과를 기반으로 작성되었습니다.

## 1. Overall Architecture

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS v4.1 (CSS-first approach with `@theme`)
- **Structure**: Single-page application composed of modular React components.

## 2. Page Structure (`app/page.tsx`)

메인 페이지는 여러 Section 컴포넌트를 수직으로 배열하는 형태로 구성됩니다.

```tsx
// app/page.tsx
import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import InvitationSection from '@/components/sections/InvitationSection';
// ... other section imports
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <InvitationSection />
        {/* Other sections will be placed here in order */}
      </main>
      <Footer />
    </>
  );
}
```

## 3. Component Breakdown

### 3.1. Layout Components (`components/layout/`)

#### `Header.tsx`
- **Description**: 페이지 상단에 위치하며, 사이트 로고와 네비게이션 링크를 포함합니다.
- **Props**:
  ```typescript
  interface NavLink {
    href: string;
    label: string;
  }
  interface HeaderProps {
    navLinks: NavLink[];
  }
  ```
- **Structure**:
  - 로고 이미지
  - `navLinks` 배열을 순회하며 생성되는 `<a>` 태그 목록

#### `Footer.tsx`
- **Description**: 페이지 하단에 위치하며, 주소, 연락처 등 추가 정보를 표시합니다.
- **Props**:
  ```typescript
  interface FooterProps {
    address: string;
    phone: string;
    email: string;
  }
  ```
- **Structure**:
  - `<p>` 태그들을 사용하여 주소, 전화번호, 이메일 정보를 표시

### 3.2. Section Components (`components/sections/`)

#### `HeroSection.tsx`
- **Description**: 사이트의 가장 처음 보이는 부분으로, 메인 타이틀과 이벤트 날짜/장소를 표시합니다.
- **Props**:
  ```typescript
  interface HeroProps {
    title: string;
    subtitle: string;
    eventDate: string;
    location: string;
  }
  ```
- **Styling**:
  - 배경 이미지 또는 색상
  - `text-h1` 클래스를 사용한 큰 제목
  - 중앙 정렬된 텍스트

#### `InvitationSection.tsx`
- **Description**: 초대 메시지를 보여주는 간단한 텍스트 섹션입니다.
- **Props**:
  ```typescript
  interface InvitationProps {
    title: string;
    content: string; // Can be a string with markdown or HTML
  }
  ```
- **Styling**:
  - `text-h2` 제목
  - `text-body` 본문

#### `ProgramGuideSection.tsx`
- **Description**: 전체 프로그램 개요를 보여주는 섹션입니다. 각 프로그램 카테고리를 나열합니다.
- **Props**:
  ```typescript
  interface Program {
    title: string;
    description: string;
  }
  interface ProgramGuideProps {
    title: string;
    programs: Program[];
  }
  ```
- **Structure**:
  - `programs` 배열을 순회하며 각 프로그램을 표시하는 카드 또는 리스트 아이템을 렌더링합니다.

#### `ProgramDetailsSection.tsx`
- **Description**: 각 프로그램의 상세 내용을 보여주는 섹션입니다. `ProgramCard`와 같은 하위 컴포넌트를 사용할 수 있습니다.
- **Props**:
  ```typescript
  // Detailed program type
  interface DetailedProgram {
    category: string; // e.g., '체험 프로그램'
    title: string;
    instructor: string;
    time: string;
    location: string;
  }
  interface ProgramDetailsProps {
    title: string;
    programs: DetailedProgram[];
  }
  ```
- **Structure**:
  - 카테고리별로 프로그램을 그룹화하여 표시합니다.
  - 각 프로그램은 `ProgramCard.tsx` 컴포넌트로 렌더링될 수 있습니다.

#### `LocationSection.tsx`
- **Description**: 행사장 위치와 오시는 길을 안내하는 섹션입니다.
- **Props**:
  ```typescript
  interface LocationProps {
    title: string;
    address: string;
    transportInfo: string[]; // Array of strings for different transport methods
  }
  ```
- **Structure**:
  - 주소 텍스트
  - 대중교통 정보 목록
  - Kakao Map 임베드 (외부 스크립트 또는 iframe 사용)

### 3.3. UI Components (`components/ui/`)

#### `Button.tsx`
- **Description**: 클릭 가능한 버튼 요소입니다.
- **Props**:
  ```typescript
  interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
  }
  ```
- **Styling**:
  - `variant='primary'`: `bg-[var(--color-accent)]`
  - `variant='secondary'`: `border border-[var(--color-accent)] text-[var(--color-accent)]`
  - `rounded-[var(--border-radius-small)]`

#### `ProgramCard.tsx`
- **Description**: 개별 프로그램을 나타내는 카드 컴포넌트입니다.
- **Props**: `DetailedProgram` 인터페이스와 동일
- **Styling**:
  - `bg-[var(--color-secondary)]` 또는 `border`
  - `rounded-[var(--border-radius-medium)]`
  - 내부 요소 간 간격은 `var(--spacing-medium)` 사용
