# idea-to-build: 진화형 디자인 프레임워크

**요약**

이 문서는 "AI가 만든 Tailwind 결과를 **시각적 데이터셋**으로 보고, 인간이 패턴·미감을 추출해 점진적으로 통합(공통 디자인 시스템)하고, Storybook을 통해 일관적으로 관리·적용하는" 진화형 `idea-to-build` 프레임워크를 정의합니다. 이 접근법은 **자동 선언(token → globals.css)** 에 의존하지 않고, 대신 **관찰·비교·수동 리팩터링**을 통해 디자인 품질을 올립니다.

---

## 핵심 원칙

1. **디자인은 관찰에서 시작한다**: AI가 생성한 UI를 데이터로 보고 시각적 패턴(색, 타이포, 간격, 컴포넌트 변형)을 인간이 식별한다.
2. **점진적 표준화**: 한 번에 전체를 규격화하지 말고, 자주 등장하는 패턴부터 globals.css의 `@layer`로 옮겨 통합한다.
3. **Storybook은 ‘디자인 미러’**: Storybook을 규격서(단일 소스)로 만들기보다는 여러 앱 UI를 나란히 비교하는 도구로 사용한다.
4. **PDSA(Plan-Do-Study-Act) 루프 적용**: 디자인 변경은 작은 실험으로 반복하고, 측정·학습 후 확대 적용한다.
5. **사람 중심의 최종 판단**: AI는 제안·분류·비교를 돕지만 최종 디자인 결정은 사람(디자이너 또는 제품 리더)이 내린다.

---

## 목표

* 4개(또는 N개) Next.js + Tailwind 앱에서 공통으로 적용 가능한 **시각적 언어**(색/타이포/스케일/컴포넌트)를 형성
* Storybook을 통해 시각적 비교와 의사결정을 빠르게 진행
* 점진적, 안전한 마이그레이션으로 품질 저하 없이 통합

---

## 주요 산출물(Artifacts)

1. **Visual Dataset**: 앱별 컴포넌트 스냅샷(이미지 + 메타데이터)을 수집한 레코드
2. **Design Mirror Storybook**: 각 앱의 대표 컴포넌트를 나란히 놓고 비교 가능한 Storybook
3. **Core globals.css**: `@layer base/components/utilities`로 정의한 최소 공통 스타일
4. **Migration Guide**: 앱별 적용 가이드(파일 패치, 클래스 매핑 테이블)
5. **Change Log & Experiment Log**: PDSA 실험 결과 기록

---

## 프로세스 (워크플로우)

### 1) 수집(Observe)
- 각 앱에서 대표 페이지와 컴포넌트 스크린샷을 자동/수동으로 수집
- 수집 항목: 스크린샷(정적), 사용된 Tailwind 클래스 리스트, DOM 스니펫
- 결과: `visual-dataset/` 폴더 구조

### 2) 분류(Classify)
- 자주 나타나는 색상, 폰트, 모서리, 간격, 카드/버튼 유형을 분류
- AI 도구는 "빈도 분석"과 "시각적 클러스터링"(비슷한 색·모양 그룹화)을 지원하도록 사용
- 결과: 우선순위 리스트 (예: primary button patterns, card variants)

### 3) 실험(Plan → Do)
- 우선순위 상위 패턴 1~2개를 선택해 **작은 실험**을 설계
- 실험 작업: globals.css에 최소 정의 추가 → 특정 컴포넌트에서 통일된 class로 교체
- 구현은 한 앱에서 먼저 적용

### 4) 관찰(Study)
- Storybook(Design Mirror)에서 변경 전/후를 나란히 비교
- 사용자 / 팀 내부 피드백 수집(퀄리테이티브)과 간단한 정량 지표(로드 시간, CSS 번들 크기, 접근성 체크)

### 5) 확대(Act)
- 성공적으로 검증되면 다른 앱으로 순차 적용
- 실패하면 롤백하고 토큰/컴포넌트 설계를 재검토

> 이 사이클을 반복하면서 **globals.css**가 점점 성숙해진다.

---

## Storybook 활용법 (Design Mirror)

1. **구성**: Storybook root에는 `apps` 또는 `sources` 섹션을 두고, 각 앱의 동일한 컴포넌트들을 한 화면에 렌더링
2. **비교 뷰**: 같은 스토리(예: Button / Primary / Large)에서 app1/app2/app3의 인스턴스를 가로로 배치
3. **Annotation**: 각 인스턴스에 "사용된 클래스", "출현 빈도" 같은 메타를 붙여 판단 근거 제공
4. **Decision Board**: 팀 투표/코멘트 기능 추가(단순 댓글 + 상태 태그)

---

## 기술 아키텍처(권장)

```
/monorepo
  /apps
    /app1
    /app2
    /app3
    /app4
  /packages
    /design-mirror-storybook
    /design-core   <-- globals.css, common components (minimal)
  /visual-dataset
    /app1
    /app2
    ...
```

- 모노레포 툴: Turborepo 또는 Nx 권장
- Storybook: Vite 기반, 각 앱의 스토리를 design-mirror에 import 가능하게 설정

---

## `design-core` (minimal) 구조 제안

```
design-core/
  package.json
  globals.css    <-- @layer base/components/utilities (최소 범위)
  src/components/
    Button.tsx    <-- 가볍고 접근성 준수
    Card.tsx
  stories/
    Button.stories.tsx
```

> 핵심은 "최소(minimal)"이다. 디자인 완전판을 만들기 전에 자주 쓰이는 패턴만 포함.

---

## 예: globals.css (작고 실용적 예시)

```css
@import "tailwindcss";

@layer base {
  :root{
    --color-bg: 0 0% 100%;
    --color-text: 222.2 84% 4.9%;
    --color-action: 222.2 47.4% 11.2%;
    --radius-md: 0.5rem;
    --spacing-4: 1rem;
  }
  body{ font-family: Inter, system-ui, -apple-system; }
}

@layer components {
  .btn { @apply inline-flex items-center gap-2 text-sm rounded-md px-4 py-2; }
  .btn-primary { @apply bg-[hsl(var(--color-action))] text-white hover:opacity-95; }
  .card { @apply rounded-lg border bg-white shadow-sm p-4; }
}
```

---

## Migration 가이드(핵심 체크포인트)

1. **스냅샷 단계**: 변경 전 각 앱의 해당 컴포넌트 스냅샷 보관
2. **한 앱에서 실험**: globals.css 반영과 하나의 컴포넌트 리팩터링
3. **Storybook 비교**: 변경 전/후를 Design Mirror에서 검증
4. **안정성 검토**: 접근성, 퍼포먼스, CSS 번들 크기 체크
5. **순차 적용**: 1→2→3→4 앱 순으로 확장

---

## 역할과 책임

- **디자인 리서처 / 제품 리더**: 시각적 패턴 선정과 최종 승인
- **프론트엔드 엔지니어**: globals.css 반영·컴포넌트 교체, Storybook 구성
- **AI 어시스턴트(옵션)**: 시각적 클러스터링, 클래스 빈도 분석, 제안 목록 생성
- **QA / PM**: 실험 결과 검증, 사용자 피드백 수집

---

## 측정 지표(간단한 것들)

- 시각적 일관성 지표(주관적 평가 + 팀 투표)
- CSS 번들 크기 변화
- Build/Dev 속도 변화
- 접근성 이슈 수(자동 검사 도구 사용)

---

## 체크리스트(초기 8주 플랜)

- [ ] Visual dataset 수집 자동화 스크립트 작성
- [ ] Design Mirror Storybook 초기 구성
- [ ] `design-core/globals.css` 초안 작성 (base + 3 components)
- [ ] App1에서 버튼/카드 실험 적용
- [ ] Storybook에서 비교 검증 및 피드백 수집
- [ ] 성공 시 App2~4로 순차 적용
- [ ] 실험 로그와 의사결정 기록 문서화

---

## 마무리 메모

이 프레임워크는 "토큰을 선언하자마자 예쁘게 되는 이상적 시나리오"를 목표로 하지 않습니다. 대신, **AI가 만든 방대한 시각적 결과물을 인간 감각으로 읽어내어**, 작은 성공을 쌓아 디자인 언어를 발전시키는 방법론입니다.

실제 리포지토리 템플릿, 스크립트(스크린샷 수집, 클래스 빈도 분석), Storybook 설정 예시 등을 함께 만들어 드릴까요? 원하는 우선순위를 알려주세요.

