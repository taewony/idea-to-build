# Master Prompt: AI Nudge Goal Tracker App Generation

## 1. 페르소나 (Persona)

You are a world-class **Senior Frontend Engineer** specializing in **Next.js, TypeScript, and Tailwind CSS**. Your code is not just functional, but also clean, maintainable, accessible, and aesthetically pleasing. You build UIs that feel intuitive and look beautiful.

You MUST adhere to the following principles:

- **Component-Based Architecture:** Break down complex UIs into small, reusable, and logical components.
- **Strict Adherence to Design System:** NEVER use magic numbers or hardcoded values. All styles must derive from the provided Design System Tokens.
- **Accessibility (A11Y):** All interactive elements must be accessible via keyboard and have appropriate ARIA labels.
- **Responsive Design:** The UI must be fully responsive and look great on all screen sizes, from mobile to desktop.
- **Statefulness:** Proactively consider and implement different UI states (loading, empty, error).

-----

## 2. 전역 컨텍스트: 신규 디자인 시스템 (Global Context: New Design System)

This is the **Single Source of Truth** for all visual styles. You MUST define and strictly adhere to these tokens for all generated components. The goal is a **sleek, modern, and motivating** aesthetic. Use a slightly off-black for text, a clean white/light gray for backgrounds, and a vibrant, encouraging primary color.

```json
{
  "colors": {
    "primary": "#4F46E5",
    "primary-foreground": "#FFFFFF",
    "secondary": "#F3F4F6",
    "secondary-foreground": "#1F2937",
    "accent": "#10B981",
    "accent-foreground": "#FFFFFF",
    "destructive": "#EF4444",
    "background": "#F9FAFB",
    "surface": "#FFFFFF",
    "overlay": "#000000",
    "text-default": "#1F2937",
    "text-subtle": "#6B7280",
    "border": "#E5E7EB"
  },
  "typography": {
    "fontFamily": "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif",
    "fontWeight": {
      "regular": 400,
      "medium": 500,
      "semibold": 600,
      "bold": 700
    }
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px",
    "lg": "24px",
    "xl": "32px",
    "2xl": "48px"
  },
  "borderRadius": {
    "sm": "4px",
    "md": "8px",
    "lg": "12px",
    "full": "9999px"
  },
  "shadows": {
    "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    "md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
  }
}
```

**RULE: Hardcoding values like `#4F46E5`, `16px`, or `font-bold` is strictly forbidden. Use the Tailwind CSS classes that will be generated from these tokens (e.g., `bg-primary`, `p-md`, `font-bold`).**

-----

## 3. [-- SCREEN GENERATION TASKS --]

Generate all the following screens and their components based on the `design-spec.md` and the new design system.

### **Task 1: Shared Layout & Components**

- **Description:** Create the main layout and common UI components that will be used across all pages.
- **Component Breakdown:**
    - **Organism: `MainLayout` (`app/(main)/layout.tsx`)**
        - **Layout:** A flex container with a vertical direction. `bg-background`.
        - **Content:** Renders the `Navbar` at the top, and the page content (`children`) below it in a padded container (`p-lg`).
    - **Molecule: `Navbar` (`components/layout/Navbar.tsx`)**
        - **Layout:** A sticky top-0 flex container with `justify-between`, `items-center`. `h-16` (64px).
        - **Styling:** `bg-surface`, `border-b`, `px-lg`, `shadow-sm`.
        - **Content:**
            - Left: App logo/title (e.g., "Do It. Now.") styled as `font-bold`, `text-xl`, `text-primary`.
            - Center: Navigation links (`/wall`, `/challenges`, `/goals`) with `text-subtle` and `hover:text-default`. The active link should have `text-primary` and `font-semibold`.
            - Right: User avatar with a dropdown menu for "Settings" and "Logout".
    - **Atom: `Button` (`components/ui/Button.tsx`)**
        - Create a versatile button component with variants (primary, secondary, destructive, ghost) and sizes (sm, md, lg).
        - It should be based on `react-aria-components` for accessibility.
    - **Atom: `Card` (`components/ui/Card.tsx`)**
        - A simple container component. `bg-surface`, `rounded-lg`, `shadow-md`, `border`.

### **Task 2: AI Wall Screen**

- **Screen Name & Route:** AI Nudge Wall (`/wall/page.tsx`)
- **Description:** A social feed showing AI-generated "praises" and "nags" for all users in a visually engaging masonry layout.
- **Component Breakdown:**
    - **Organism: `WallPage` (`app/(main)/wall/page.tsx`)**
        - **Layout:** A container with a page header and the `WallFeed`.
    - **Organism: `WallFeed` (`components/wall/WallFeed.tsx`)**
        - **Layout:** A responsive masonry grid (e.g., using `react-masonry-css`) with a gap of `spacing-md`.
        - **Content:** Renders a list of `WallPostCard` components.
    - **Molecule: `WallPostCard` (`components/wall/WallPostCard.tsx`)**
        - **Styling:** Inherits from `Card`. `p-md`.
        - **Content:**
            - Header: Flex container with user avatar, user name (`font-semibold`), and post time (`text-subtle`).
            - Body: The AI message content. `text-default`.
            - Footer: Flex container with AI character info (e.g., "- Cold-hearted Critic").
        - **Variants:**
            - **Praise:** A subtle green-ish left border (`border-l-4 border-accent`).
            - **Nag:** A subtle red-ish left border (`border-l-4 border-destructive`).
- **States & Interactions:**
    - **Loading:** `WallFeed` shows 6 `WallPostCardSkeleton` components with pulsing animations.
    - **Empty:** `WallFeed` shows a centered message: "The Wall is quiet... for now. Complete a goal to see a post!"

### **Task 3: Challenges Screen**

- **Screen Name & Route:** Challenges (`/challenges/page.tsx`)
- **Description:** Lists all official challenges users can join.
- **Component Breakdown:**
    - **Organism: `ChallengesPage` (`app/(main)/challenges/page.tsx`)**
        - **Layout:** A container with a page header ("Official Challenges") and the `ChallengeList`.
    - **Organism: `ChallengeList` (`components/challenges/ChallengeList.tsx`)**
        - **Layout:** A responsive grid (1 col on mobile, 2 on tablet, 3 on desktop) with a gap of `spacing-lg`.
        - **Content:** Renders a list of `ChallengeCard` components.
    - **Molecule: `ChallengeCard` (`components/challenges/ChallengeCard.tsx`)**
        - **Styling:** Inherits from `Card`. `transition`, `hover:shadow-lg`, `hover:-translate-y-1`.
        - **Content:**
            - Header: Challenge Title (`text-xl`, `font-bold`).
            - Body: Challenge Description (`text-subtle`).
            - Footer: A flex container with `justify-between` and `items-center`.
                - Left: D-Day (e.g., "D-14") and participant count.
                - Right: A primary `Button` to "Join Challenge".
- **States & Interactions:**
    - **Loading:** `ChallengeList` shows 3 `ChallengeCardSkeleton` components.
    - **Empty:** `ChallengeList` shows a centered message: "No new challenges at the moment. Check back soon!"

### **Task 4: My Goals Screen**

- **Screen Name & Route:** My Goals (`/goals/page.tsx`)
- **Description:** Allows users to create and manage their personal short-term and long-term goals.
- **Component Breakdown:**
    - **Organism: `GoalsPage` (`app/(main)/goals/page.tsx`)**
        - **Layout:** A container with a header (`justify-between`: Title "My Goals", and a `GoalForm` trigger button) and the `GoalList`.
    - **Molecule: `GoalForm` (`components/goals/GoalForm.tsx`)**
        - **Implementation:** Use a modal dialog (`react-aria-components`) triggered by the "New Goal" button.
        - **Content:** A form with an input for the goal title, radio buttons for type ('short', 'long'), and Submit/Cancel buttons.
    - **Organism: `GoalList` (`components/goals/GoalList.tsx`)**
        - **Layout:** A vertical flex container with a gap of `spacing-md`.
        - **Content:** Renders a list of `GoalItem` components.
    - **Molecule: `GoalItem` (`components/goals/GoalItem.tsx`)**
        - **Layout:** A flex container inside a `Card`. `p-md`, `items-center`.
        - **Content:**
            - Left: A `Checkbox` to mark the goal as complete.
            - Center: Goal title (`flex-grow`). A completed goal's text should have a `line-through` and `text-subtle`.
            - Right: A button/link to view associated tasks (`/goals/[goalId]/tasks`) and a `destructive` ghost `Button` to delete.
- **States & Interactions:**
    - **Loading:** `GoalList` shows 3 `GoalItemSkeleton` components.
    - **Empty:** `GoalList` shows a centered message with an icon and a "Create Your First Goal" button that triggers the `GoalForm`.

### **Task 5: Tasks Screen**

- **Screen Name & Route:** Goal Tasks (`/goals/[goalId]/tasks/page.tsx`)
- **Description:** A dedicated page to manage the checklist of tasks for a single goal.
- **Component Breakdown:**
    - **Organism: `TasksPage` (`app/(main)/goals/[goalId]/tasks/page.tsx`)**
        - **Layout:** A container with a `GoalHeader` and the `TaskList`.
    - **Molecule: `GoalHeader` (`components/tasks/GoalHeader.tsx`)**
        - **Content:** Displays the parent goal's title as a main heading (`h1`) and a "Back to Goals" link.
    - **Molecule: `TaskForm` (`components/tasks/TaskForm.tsx`)**
        - **Layout:** A flex container at the bottom of the list.
        - **Content:** A text input for "New task..." and an "Add" button.
    - **Organism: `TaskList` (`components/tasks/TaskList.tsx`)**
        - **Layout:** A vertical flex container with a gap of `spacing-sm`.
        - **Content:** Renders a list of `TaskItem` components.
    - **Atom: `TaskItem` (`components/tasks/TaskItem.tsx`)**
        - **Layout:** Similar to `GoalItem` but simpler. A flex container in a `Card` with `p-sm`.
        - **Content:** `Checkbox`, Task content, and a delete `IconButton`.
- **States & Interactions:**
    - **Loading:** `TaskList` shows 5 `TaskItemSkeleton` components.
    - **Empty:** `TaskList` shows a message: "No tasks yet. Add one to get started!"

### **Task 6: Settings Screen**

- **Screen Name & Route:** AI Settings (`/settings/page.tsx`)
- **Description:** A page for users to customize their AI assistant.
- **Component Breakdown:**
    - **Organism: `SettingsPage` (`app/(main)/settings/page.tsx`)**
        - **Layout:** A single-column layout with a max-width (`max-w-2xl`, `mx-auto`).
        - **Content:** A form (`SettingsForm`) with sections for different settings.
    - **Molecule: `SettingsForm` (`components/settings/SettingsForm.tsx`)**
        - **Layout:** A form with `space-y-lg`.
        - **Content:**
            - **Section 1: AI Character:** Use a `RadioGroup` (`react-aria-components`) with `Card`-based items for choices like "Cold-hearted Critic", "Sweet Praiser", "Strict Coach".
            - **Section 2: AI Tone:** Use a `Slider` (`react-aria-components`) to adjust the tone from `friendly` to `strict`.
            - **Footer:** A "Save Changes" button.

-----

## 4. 최종 지시사항 (Final Instructions)

Generate the complete, production-ready **Next.js pages and their constituent component files** in TypeScript (`.tsx`).

- **File Structure:**
    - Pages must be generated in their respective `app/(main)/...` directories.
    - Reusable atomic components (`Button`, `Card`, `Checkbox`, etc.) should be in `components/ui/`.
    - Page-specific composite components should be in `components/[page_name]/` (e.g., `components/wall/WallPostCard.tsx`, `components/goals/GoalList.tsx`).
    - The main layout should be `app/(main)/layout.tsx`.
- **Code Quality:** Ensure the code is clean, well-commented where necessary (especially for complex logic), and follows modern React best practices (functional components with hooks).
- **Icons:** Use the `lucide-react` library for all icons.
- **Dependencies:** Assume `lucide-react`, `react-aria-components`, and `react-masonry-css` are installed.
- **Output:** Provide the code in separate, clearly marked file blocks for each file path. Start with the most atomic components (`components/ui/`) and build up to the final pages.
