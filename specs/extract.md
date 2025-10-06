# Website Design System and Component Structure Analysis for 'ws-opensource' by extracting the design from https://slei10th.com/

## 1. Design Tokens (Inferred)

### Colors
*   **Primary**: `#4A90E2` (Inferred primary branding color, likely a shade of blue or purple for professionalism and trust).
*   **Secondary**: `#F5F5F5` (Inferred for subtle backgrounds or secondary elements, a light grey).
*   **Accent**: `#FF6B6B` (Inferred for interactive elements like buttons or highlights, a vibrant red/coral).
*   **Background**: `#FFFFFF` (Main page background, white).
*   **Text**:
    *   **Default**: `#333333` (Dark grey for main body text, ensuring readability).
    *   **Secondary**: `#666666` (Medium grey for less prominent text, like descriptions or metadata).

### Typography
*   **Main Font Families**: `Noto Sans KR`, `sans-serif` (A common and highly readable Korean sans-serif font, with a generic sans-serif fallback).
*   **Headings**:
    *   **H1**: `3em` (approx. 48px), `font-weight: 700` (bold), `line-height: 1.2`.
    *   **H2**: `2em` (approx. 32px), `font-weight: 700` (bold), `line-height: 1.2`.
    *   **H3**: `1.5em` (approx. 24px), `font-weight: 700` (bold), `line-height: 1.3`.
*   **Body Text**:
    *   `1em` (approx. 16px), `font-weight: 400` (regular), `line-height: 1.5`.

### Spacing
*   **Small**: `8px` (Used for small gaps, icon-text spacing).
*   **Medium**: `16px` (Standard padding/margin for elements, spacing between list items).
*   **Large**: `32px` (Spacing between major content blocks or sections).
*   **X-Large**: `64px` (Larger section separators, hero section padding).

### Border Radius
*   **Small**: `4px` (Applied to interactive elements like buttons, input fields).
*   **Medium**: `8px` (Used for card components, giving a softer, modern look).

## 2. UI Structure and Components

### Overall Layout
The website follows a standard web layout structure:
*   **Header**: Positioned at the top, containing the main navigation menu.
*   **Main Content**: Encompasses all the distinct sections of the page, presented vertically.
*   **Footer**: Located at the bottom, providing contact information and organizational details.

### Sections
The main page is divided into several distinct sections:
*   **Intro/Hero Section**: The initial prominent section featuring the event title ("서울특별시 평생교육진흥원 10주년 기념식 10년의 선물 평생교육 미래를 열다"), event date, and location.
*   **Invitation Message Section**: A textual block titled "10주년 초대글" (10th Anniversary Invitation) providing context and a welcome message.
*   **Program Guide Section**: An overview section titled "10주년 프로그램 안내" (10th Anniversary Program Guide), summarizing the three main event categories: "10주년 기념식", "평생학습포럼", and "시민 체험 세션".
*   **10th Anniversary Ceremony Details Section**: Provides a detailed schedule and description for the "10주년 기념식".
*   **Lifelong Learning Forum Details Section**: Outlines the "평생학습포럼" with specific topics, speakers, and their affiliations.
*   **Citizen Experience Session Details Section**: A comprehensive section listing various programs under "체험 프로그램" (Experience Programs), "강의형 프로그램" (Lecture Programs), "홍보부스" (Promotional Booths), and "명사특강 프로그램" (Special Lecture Programs). Each program is presented as a distinct block.
*   **Location/Directions Section**: Titled "오시는 길" (Directions), this section provides the event address, public transportation instructions, and an embedded Kakao Map.
*   **Pre-registration Section**: A form titled "사전신청" (Pre-registration) for attendees to sign up for the event.

### UI Elements
*   **Navigation Links**: Found in the header, these are text-based links that allow users to jump to different sections of the single-page website (e.g., "Intro", "초대 메시지", "오시는 길").
*   **Buttons**:
    *   **Primary Action Buttons**: "신청하기" (Apply) buttons are prominent, likely with an accent background color and slight border-radius, used for program registration.
    *   **Secondary Buttons**: "현장접수" (On-site registration) buttons, possibly with a different styling (e.g., outline or lighter background).
*   **Cards**: Used extensively to display individual programs within the "시민참여 세션". Each card typically includes a title, a brief description, location, time, instructor, and current capacity. They likely have a background color (e.g., white or light grey) and a medium border-radius.
*   **Input Fields**: Standard text input fields for collecting user information in the pre-registration form (e.g., Name, Affiliation, Contact, Email).
*   **Dropdowns/Selects**: Used in the pre-registration form for selecting contact number prefixes and email domains.
*   **Radio Buttons**: Used for selecting gender and age group in the pre-registration form.
*   **Checkboxes**: Used for consent (e.g., "초상권 · 개인정보의 제3자 제공에 동의 합니다.").
*   **Images/Logos**: The "서울특별시 평생교육진흥원 10주년 기념 로고" is present, serving as a branding element.
*   **Map Embed**: An interactive Kakao Map is embedded in the "오시는 길" section to provide visual directions.
*   **Lists/Tables**: Program schedules and speaker details are presented in a structured, list-like or table-like format for clarity.
