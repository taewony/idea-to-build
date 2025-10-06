# Learn Lang Model Blueprint

This document outlines the structure of the Learn Lang Model application.

## Pages

- **`/` (Landing Page)**: The main landing page of the application.
  - Sections:
    - Hero: Introduction to the application.
    - Features: What you can learn.
    - Steps: Learning roadmap.
    - Labs: Hands-on labs.
    - Local LM: Guide to installing a local small language model.
    - Pricing / CTA: Call to action buttons.
- **`/community` (Community Page)**: A forum for users to ask questions and share projects.
  - Sections:
    - Search bar and "New Post" button.
    - List of posts.
- **`/learn/build-llm-from-scratch` (Learning Page)**: A page with articles on how to build a large language model from scratch.
  - Sections:
    - List of articles.

## Components

- **`Header`**: The main navigation header for the application.
  - Contains links to the Home, Community, and Local LM pages.
  - Contains a "Get Started" button.
- **`Footer`**: The main footer for the application.
  - Contains links to Privacy, Terms, and Contact pages.
- **`FeatureCard`**: A card component to display a feature.
- **`Step`**: A component to display a step in the learning roadmap.
- **`LabCard`**: A card component to display a hands-on lab.
- **`LiveDemo`**: A component that allows users to try a live demo of the language model.
- **`PostCard`**: A card component to display a post in the community forum.
- **`Tag`**: A component to display a tag for a post.

## Key DOM Elements

- **CTA Buttons**:
  - "Get Started"
  - "Hands-on Labs"
  - "Install Small-LM"
  - "Full Guide"
  - "Start Free"
  - "Contact Sales"
  - "New Post"
  - "Open Lab"
- **Input Fields**:
  - Search bar on the community page.
  - Text area for the live demo prompt.

| 항목                       | 개선 내용                                                                                  |
| ------------------------ | -------------------------------------------------------------------------------------- |
| **Inline code (`code`)** | 어두운 배경(`bg-slate-800`), 주황색 텍스트(`text-amber-400`), 모노스페이스(`font-mono`)로 가독성 향상         |
| **Code block (```)**     | `bg-gradient-to-br from-slate-800 to-slate-900`로 그라데이션 효과 + `border-slate-700`로 구분감 강화 |
| **Blockquote**           | `border-l-4 border-sky-500` + `bg-slate-800/50` + `rounded-r-lg` 로 명확히 부각              |
| **제목 크기 조정**             | h1~h4에 맞게 크기(`text-3xl`, `text-2xl`, `text-xl`, `text-lg`) 설정                          |
| **리스트 들여쓰기 및 기호 색상**     | `prose-li:marker:text-sky-400`로 들여쓰기 시각화 및 마커 컬러 부여                                    |
