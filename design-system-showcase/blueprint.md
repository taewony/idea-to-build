# Design System Showcase Blueprint

This document outlines the structure of the Design System Showcase application.

## Pages

The application is a single-page application (SPA) that dynamically renders different component showcases. The main page is responsible for managing the layout and rendering the selected component showcase.

- **Main Page (`/`)**: The main entry point of the application. It displays the header, sidebar, and the selected component showcase.

## Components

### Layout Components

- **`Header`**: The top navigation bar of the application. It displays the application title, the current active component, a theme switcher, and user profile information.
- **`Sidebar`**: The side navigation menu. It allows users to switch between different component showcases.
- **`Footer`**: The footer of the application. It displays copyright information.

### UI Components

- **`Modal`**: A versatile modal component used for alerts, confirmations, and forms.

### Showcase Components

- **`ButtonsShowcase`**: Displays a variety of button styles, including primary, secondary, tertiary, and buttons with icons.
- **`CardsShowcase`**: Showcases different card layouts for displaying content.
- **`InputsShowcase`**: Demonstrates various input field styles and states, including default, focus, and disabled.
- **`ModalsShowcase`**: Provides examples of different modal dialogs, such as alerts, confirmations, and forms.
- **`TablesShowcase`**: Presents different table styles, including basic tables, sortable tables, and tables with pagination.
- **`WelcomeShowcase`**: The default view when no component is selected, providing a brief introduction to the design system.

## Sections

The application is divided into three main sections:

- **Header**: The top section of the application, containing the main navigation and controls.
- **Main Content**: The central part of the application, which is further divided into:
  - **Sidebar**: The left-hand navigation menu.
  - **Content Area**: The right-hand area where the selected component showcase is displayed.
- **Footer**: The bottom section of the application.

## Key DOM Elements and CTAs

- **Theme Switcher**: A button in the header that allows users to toggle between light and dark modes.
- **Sidebar Navigation Links**: A list of links in the sidebar that allow users to select which component showcase to view.
- **Modal Trigger Buttons**: Buttons within the `ModalsShowcase` that open different types of modals.
- **Primary Action Buttons**: The main call-to-action buttons, such as "Primary Action" and "Create New".
- **Secondary Action Buttons**: Buttons for secondary actions, such as "Secondary Action" and "Upload File".
- **Tertiary/Link Buttons**: Buttons that look like links for less prominent actions, such as "View Details".
