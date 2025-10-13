# GameFinder (NextJS) Application Blueprint

This document outlines the architectural blueprint for the GameFinder application, detailing its pages, components, and key interactive elements.

## 1. Pages & Views

The application operates as a Single Page Application (SPA) with three primary views rendered within the main `HomePage` component.

-   **Home View (`'home'`)**: The default landing page. It focuses on searching for games.
-   **Game Detail View (`'detail'`)**: Displays comprehensive, AI-generated details for a selected game.
-   **Personalized View (`'personalized'`)**: Shown after a user "logs in." It displays curated and trending game lists.

---

## 2. Core Components

### `HomePage` (`page.tsx`)

-   **Purpose**: The main entry point and view controller for the application.
-   **State Management**: Handles top-level state including `isLoggedIn`, current `view`, `selectedGame`, search results, and wishlist.
-   **Sections**:
    -   **Header**: Contains the main navigation and login/logout controls.
    -   **View Container**: Dynamically renders one of the three main views (`GameSearch`, `GameDetailPage`, `PersonalizedPage`).
    -   **Footer**: Displays copyright information.
    -   **Login Modal**: A modal that appears when a login-required action is triggered.

### `Header.tsx`

-   **Purpose**: Provides consistent branding and primary user action controls.
-   **Key DOM Elements**:
    -   Application Title (`<span>GameFinder</span>`).
-   **CTA Buttons**:
    -   `Sign In for More`: Appears when the user is logged out.
    -   `Logout`: Appears when the user is logged in.

### `GameSearch.tsx`

-   **Purpose**: Allows users to search for games based on a query.
-   **Sections**:
    -   **Title Section**: "Find Your Next Favorite Game".
    -   **Search Form**: Contains the input field and search button.
    -   **Results Display**: A list of `GameCard` components populated from search results.
    -   **Loading State**: An animated spinner shown while waiting for search results.
    -   **Empty/Error State**: A message shown if no games are found or if an error occurs.
-   **Key DOM Elements**:
    -   Search Input (`<input type="text">`).
-   **CTA Buttons**:
    -   `Search`: Submits the user's query.

### `GameDetailPage.tsx`

-   **Purpose**: Shows in-depth information about a single game.
-   **Sections**:
    -   **Game Header**: Displays the game's image (`<div>` with background image).
    -   **About the Game**: A detailed text description.
    -   **Reviews**: A list of simulated user reviews.
    -   **User Ratings**: A breakdown of the rating distribution.
    -   **Premium CTA Section**: A promotional block for a premium subscription.
-   **Key DOM Elements**:
    -   Game Title (`<h1>`).
    -   `StarRating` component for visual rating display.
-   **CTA Buttons**:
    -   `Back to Search`: Navigates the user back to the home view.
    -   `Learn More`: (Inside Premium CTA) A button for the fictional premium plan.

### `PersonalizedPage.tsx`

-   **Purpose**: Provides a dashboard of recommended games for the user.
-   **Sections**:
    -   **Page Header**: "Discover Your Next Adventure".
    -   **Curated For You**: A section displaying `PersonalizedRecommendations`.
    -   **Trending Now**: A section displaying `HottestGames`.
-   **CTA Buttons**:
    -   `Back to Search`: Navigates the user back to the home view.

---

## 3. Reusable & UI Components

### `GameCard.tsx`

-   **Purpose**: A card to display a summary of a single game in a list.
-   **Key DOM Elements**:
    -   Game Image (`<img>`).
    -   Game Title (`<h3>`).
    -   Review Summary (`<p>`).
    -   Recommendation Reason (`<p>`).
-   **CTA Buttons**:
    -   `View Details`: Selects the game and switches to the Game Detail View.
    -   `Add to Wishlist` / `Added to Wishlist ✓`: Toggles the wishlist status for the game.

### `LoginModal.tsx`

-   **Purpose**: A modal dialog to prompt the user to log in.
-   **Key DOM Elements**:
    -   Modal Title (`<h2>Login Required</h2>`).
    -   Disabled Username/Password inputs (for demo purposes).
-   **CTA Buttons**:
    -   `Login`: Simulates a successful login event.
    -   `Close Button` (X icon): Closes the modal.

### Icon Components (`/icons/*.tsx`)

-   **Purpose**: A set of simple, reusable SVG icon components used throughout the application (e.g., `StarIcon`, `ArrowLeftIcon`, `CloseIcon`).
