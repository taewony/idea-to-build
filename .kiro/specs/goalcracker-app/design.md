# Design Document

## Overview

This document outlines the technical design for "GoalCracker", an AI-powered goal management application. The application enables students to set, track, and achieve goals through AI-based encouragement and "nagging". The system combines personal goal management with social features, public challenges, and a configurable AI assistant to create a motivating environment.

The application will be built as a modern web application using Next.js 15+ with App Router, TypeScript, and Tailwind CSS 4.1, following a pixel-perfect replication approach based on the existing React prototype in `source/goalcracker`.

## Architecture

### High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client Side   │    │   Server Side   │    │   Data Layer    │
│                 │    │                 │    │                 │
│ Next.js App     │◄──►│ API Routes      │◄──►│ In-Memory Store │
│ React Components│    │ Server Actions  │    │ (Initial Phase) │
│ Tailwind CSS    │    │ Middleware      │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Technology Stack

- **Frontend Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1 (CSS-first approach)
- **State Management**: Zustand (for client-side state)
- **Data Storage**: In-memory store (initial phase)
- **UI Components**: Custom components based on source design
- **Icons**: Material Symbols (as used in source)
- **Routing**: Next.js App Router with dynamic routes

### Project Structure

```
goalcracker/
├── app/
│   ├── (main)/
│   │   ├── challenges/
│   │   │   └── page.tsx
│   │   ├── goals/
│   │   │   ├── [goalId]/
│   │   │   │   └── tasks/
│   │   │   │       └── page.tsx
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   ├── wall/
│   │   │   └── page.tsx
│   │   ├── community/
│   │   │   └── page.tsx
│   │   ├── goal/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── style-guide/
│   │   └── page.tsx
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── layout/
│   │   └── Header.tsx
│   ├── ui/
│   │   ├── ChallengeCard.tsx
│   │   ├── GoalCard.tsx
│   │   ├── TaskItem.tsx
│   │   ├── WallPost.tsx
│   │   └── AIResponseModal.tsx
│   └── forms/
│       ├── GoalForm.tsx
│       ├── TaskForm.tsx
│       └── SettingsForm.tsx
├── lib/
│   ├── store.ts
│   ├── types.ts
│   └── constants.ts
└── public/
    └── (static assets)
```

## Components and Interfaces

### Core Data Types

Based on the source application, the following TypeScript interfaces will be implemented:

```typescript
export interface Challenge {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
  isUpcoming: boolean;
  participantCount: number;
  interestCount: number;
}

export interface UserGoal {
  id: string;
  challengeId?: string;
  title: string;
  description: string;
  isPersonal: boolean;
  participantCount: number;
  interestCount: number;
}

export interface Task {
  id: string;
  goalId: string;
  content: string;
  isCompleted: boolean;
}

export interface AIMessage {
  id: string;
  type: 'critic' | 'swearer';
  title: string;
  content: string;
  timestamp: string;
  goalId: string;
  rotation: number;
}

export interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  timestamp: string;
  type: '질문' | '요청' | '일반';
  title: string;
  content: string;
}

export type AIPersona = 'critic' | 'swearer' | 'realist';

export interface AISettings {
  persona: AIPersona;
  tone: 'gentle' | 'normal' | 'harsh';
}
```

### Key Components

#### 1. Header Component
- **Purpose**: Main navigation and branding
- **Features**: Logo, navigation links, user avatar, notifications
- **Responsive**: Mobile hamburger menu (hidden in initial scope)

#### 2. Page Components

**HomePage**
- Hero section with background image and CTA
- Popular challenges preview
- Latest AI messages preview
- My goals preview (when logged in)

**ChallengesPage**
- Grid layout of challenge cards
- Active and upcoming challenges sections
- Challenge filtering and search capabilities

**MyGoalsPage**
- Personal goals grid with progress indicators
- Add new goal functionality
- Goal type indicators (personal vs official)

**GoalTasksPage**
- Task list for specific goal
- Add/edit/delete task functionality
- AI Nudge button integration
- Progress tracking

**WallPage**
- Masonry layout of AI messages
- Message cards with rotation effects
- Different styling for critic vs swearer messages

**SettingsPage**
- AI persona selection
- Tone adjustment slider
- Settings persistence

#### 3. UI Components

**ChallengeCard**
- Image, title, description
- Participant and interest counts
- Join/View buttons
- Upcoming state handling

**GoalCard**
- Goal information display
- Progress bar
- Personal/Official indicators
- Navigation to tasks

**WallPost**
- AI message display with persona styling
- Rotation effects for visual variety
- Associated goal linking

**AIResponseModal**
- Modal for AI nudge responses
- Persona-specific styling and icons
- Post to wall functionality

## Data Models

### In-Memory Data Store

For the initial implementation, data will be stored in memory using the existing store pattern from `my-project/lib/store.ts`, adapted to match the source application's data structure.

```typescript
// Store structure based on source constants
export const CHALLENGES: Challenge[] = [...];
export const AI_MESSAGES: AIMessage[] = [...];
export const MY_GOALS: UserGoal[] = [...];
export const TASKS: Task[] = [...];
export const COMMUNITY_POSTS: CommunityPost[] = [...];
export const DEFAULT_AI_SETTINGS: AISettings = {...};
```

### State Management

- **Global State**: Zustand store for user goals, tasks, AI settings
- **Local State**: React useState for component-specific state
- **Server State**: Not applicable in initial phase (in-memory only)

## Error Handling

### Client-Side Error Handling

1. **Component Error Boundaries**: Wrap major page components
2. **Form Validation**: Input validation with user-friendly messages
3. **Loading States**: Proper loading indicators for async operations
4. **Fallback UI**: Graceful degradation when data is unavailable

### Error Types

- **Navigation Errors**: 404 pages for invalid routes
- **Data Errors**: Empty states when no data is available
- **User Input Errors**: Form validation feedback
- **AI Integration Errors**: Fallback messages when AI responses fail

## Testing Strategy

### Component Testing

1. **Unit Tests**: Individual component functionality
2. **Integration Tests**: Component interaction testing
3. **Visual Regression Tests**: Pixel-perfect comparison with source
4. **Accessibility Tests**: WCAG compliance verification

### Test Structure

```
__tests__/
├── components/
│   ├── Header.test.tsx
│   ├── ChallengeCard.test.tsx
│   └── GoalCard.test.tsx
├── pages/
│   ├── HomePage.test.tsx
│   ├── ChallengesPage.test.tsx
│   └── MyGoalsPage.test.tsx
└── lib/
    └── store.test.ts
```

### Testing Tools

- **Jest**: Test runner and assertion library
- **React Testing Library**: Component testing utilities
- **Playwright**: End-to-end testing (future phase)

## Design System Integration

### Tailwind CSS 4.1 Implementation

The application will use Tailwind CSS 4.1's CSS-first approach with custom design tokens extracted from the source application:

```css
@theme inline {
  --color-primary: #FF9966;
  --color-accent: #82E3E1;
  --color-background-light: #ffffff;
  --color-background-dark: #0a0a0a;
  --color-text-light: #171717;
  --color-text-dark: #ededed;
  --color-card-light: #f8f9fa;
  --color-card-dark: #1a1a1a;
  /* Additional tokens based on source design */
}
```

### Style Guide Page

A dedicated `/style-guide` page will showcase:
- Color palette and usage
- Typography scales
- Component variations
- Spacing and layout examples
- Interactive component states

### Responsive Design

- **Mobile-first approach**: Base styles for mobile, enhanced for larger screens
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible layouts**: CSS Grid and Flexbox for adaptive layouts
- **Touch-friendly**: Appropriate touch targets and interactions

## Performance Considerations

### Optimization Strategies

1. **Code Splitting**: Automatic route-based splitting with Next.js
2. **Image Optimization**: Next.js Image component for optimized loading
3. **Bundle Analysis**: Regular bundle size monitoring
4. **Lazy Loading**: Defer non-critical component loading

### Metrics to Monitor

- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms

## Security Considerations

### Client-Side Security

1. **Input Sanitization**: Prevent XSS attacks
2. **Content Security Policy**: Restrict resource loading
3. **Secure Headers**: Implement security headers
4. **Data Validation**: Validate all user inputs

### Future Considerations

- **Authentication**: Secure user authentication system
- **Authorization**: Role-based access control
- **Data Encryption**: Sensitive data protection
- **API Security**: Rate limiting and input validation

## Deployment Strategy

### Development Workflow

1. **Local Development**: Next.js development server
2. **Build Process**: Production build optimization
3. **Quality Assurance**: Automated testing and linting
4. **Deployment**: Vercel deployment with automatic previews

### Environment Configuration

- **Development**: Local development with hot reloading
- **Preview**: Branch-based preview deployments
- **Production**: Optimized production build

## Migration Path

### Phase 1: Core Implementation
- Pixel-perfect replication of source design
- In-memory data storage
- Core functionality implementation

### Phase 2: Enhanced Features
- Database integration (Supabase)
- User authentication
- Real-time features

### Phase 3: Advanced Features
- AI integration for dynamic responses
- Advanced analytics
- Mobile application

## Accessibility

### WCAG 2.1 Compliance

1. **Keyboard Navigation**: Full keyboard accessibility
2. **Screen Reader Support**: Proper ARIA labels and roles
3. **Color Contrast**: Minimum 4.5:1 contrast ratio
4. **Focus Management**: Clear focus indicators
5. **Alternative Text**: Descriptive alt text for images

### Testing Tools

- **axe-core**: Automated accessibility testing
- **WAVE**: Web accessibility evaluation
- **Screen Readers**: Manual testing with NVDA/JAWS

This design document provides a comprehensive foundation for implementing the GoalCracker application while maintaining pixel-perfect fidelity to the source design and ensuring scalability for future enhancements.