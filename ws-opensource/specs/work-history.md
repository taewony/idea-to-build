# 원본 사이트를 클론하여 Next.js webapp 개발
- webapp name: ws-opensource
- 원본 사이트: 'https://slei10th.com/' 클론

이 문서는 'https://slei10th.com/' 원본 사이트를 Next.js 앱으로 구축하는 전체 과정을 기록합니다.

---

## 전체 작업 계획

### 0단계: Project 준비
  - ws-opensource NextJS project 생성.
  
### 1단계: `ds:extract` - 디자인 시스템 및 구성 요소 추출 (완료)
- **목표:** 'https://slei10th.com/'의 시각적 요소와 구조를 분석하여 디자인 토큰(`tokens.json`)과 UI 구성 요소(`specs/extract.md`)를 생성했습니다.
- **결과물:**
  - `ws-opensource/tokens.json`
  - `ws-opensource/specs/extract.md`

### 2단계: `ds:visualize` - 디자인 시스템 시각화 (완료)
- **목표:** 추출된 `tokens.json`을 Tailwind CSS v4.1의 CSS-first 접근 방식에 따라 변환하고, 스타일 가이드 페이지를 생성하여 디자인 시스템을 시각적으로 검증했습니다.
- **결과물:**
    - `ws-opensource/app/globals.css`
    - `ws-opensource/app/style-guide/page.tsx`

### 3단계: `spec:design` & `app:build` - 앱 구조 설계 및 구축 (진행중)
- **목표:** 원본 사이트의 구조를 분석하여 `design-spec.md`를 작성하고, 이를 기반으로 실제 Next.js 페이지와 컴포넌트를 생성합니다.
- **작업 내용:**
    1. **`design-spec.md` 작성 (완료)**: `specs/extract.md`를 기반으로 컴포넌트 구조, props, 페이지 레이아웃을 상세히 기술하는 `ws-opensource/specs/design-spec.md` 파일을 작성했습니다.
    2. **레이아웃 및 컴포넌트 구현 (진행중)**: `design-spec.md`에 따라 `app/layout.tsx`, `app/page.tsx` 및 `components/` 하위의 UI 컴포넌트들을 구현합니다.
        - `Header` / `Footer` 구현 완료
        - `HeroSection` 구현 완료
        - `InvitationSection` 구현 완료
        - `ProgramGuideSection` 구현 완료
        - `CeremonyDetailsSection` 구현 완료
        - `ForumDetailsSection` 구현 완료
        - `SessionDetailsSection` (`ProgramCard` 포함) 구현 완료
        - `LocationSection` 구현 완료

### 4단계: 검토 및 반복 개선
- **목표:** 빌드된 프로-토타입을 원본 사이트와 비교하며 차이점을 수정하고 완성도를 높입니다.
- **작업 내용:**
    1. **`Header`** 반응형 및 모바일 메뉴 구현 완료
		- 데스크탑 메뉴: 화면이 중간 크기(md) 이상일 때만 표시됩니다. <div className="hidden md:flex items-center space-x-6">
		- 모바일 메뉴: 화면이 중간 크기(md) 이하일 때, 버튼이 표시되고 누르면 dropdown 메뉴가 표시됨.
    2. **`SessionDetailsSection`** tab 구현 완료
	    - ForumDetailsSection.tsx 컴포넌트를 탭 인터페이스를 사용하도록 수정하여, 각 탭에 해당하는 프로그램 목록이 그리드 카드 형태로 표시
		- SessionDetailsSection 컴포넌트를 탭 인터페이스를 사용하도록 수정하여, 각 탭에 해당하는 프로그램 목록이 그리드 카드 형태로 표시
    3. **다크 모드 테마 적용 및 UI 일관성 개선**
        - `globals.css`를 수정하여 전역 배경색을 `#211d21`로, 기본 텍스트 색상을 흰색으로 변경.
        - `HeroSection`을 포함한 모든 섹션과 `Footer` 컴포넌트의 배경색을 제거하고, 텍스트, 카드, 구분선 등의 색상을 어두운 테마에 맞게 통일하여 일관성 있는 UI를 구현.
    4. **카드 컴포넌트 디자인 개선 및 리팩터링**
        - `ProgramCard.tsx`의 디자인을 그라데이션 배경, 보더, 호버 효과 등을 추가하여 입체적이고 세련되게 개선.
        - `ForumDetailsSection.tsx`의 카드 디자인 일관성을 위해 `ForumProgramCard.tsx` 컴포넌트를 신규 생성.
        - `ForumDetailsSection.tsx`를 리팩터링하여 `ForumProgramCard`를 사용하도록 변경, 코드 재사용성 및 유지보수성 향상.