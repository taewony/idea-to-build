# UX/UI Style Guide Creation Prompt

You are an expert UX/UI designer and design system architect.  
Your task is to analyze the attached UI images of various successful apps and generate a **reusable design system style guide**.  
The output should be well-structured and easy to integrate into a design system documentation.

---

## Instructions for the AI
1. Carefully observe the attached UI images.  
2. Identify **visual style patterns**, **color palettes**, **typography rules**, **component styles**, and **layout principles** used across the apps.  
3. Summarize these patterns into a **standardized design guide** format, so that they can be applied to new projects consistently.  
4. Include reasoning and design principles behind the choices whenever possible.

Wrap any internal thinking in `<pondering>` tags before giving the final output.  
The final output should be in **Markdown** format for easy documentation.

---

## Output Format Example

### 1. Color Palette
- **Primary Colors**
  - **Primary White** – `#F8F9FA` (Used for backgrounds and clean surfaces)
  - **Primary Dark Green** – `#0A5F55` (Used for primary actions and emphasis)

- **Secondary Colors**
  - **Accent Yellow** – `#FFC107` (Highlights, call-to-action buttons)

### 2. Typography
- **Primary Font**: Inter, Sans-serif  
  - Headers: Bold, Sizes 32/24/18px  
  - Body: Regular, Sizes 16/14px  

### 3. UI Components
- **Buttons**: Rounded corners (8px), Primary color background, White text  
- **Cards**: Shadow depth level 2, 16px padding, rounded corners  

### 4. Layout Grid
- **Grid System**: 12-column layout, 24px gutters, responsive breakpoints at 600px / 960px / 1280px  

---

## Additional Options
- Add or remove sections as necessary (e.g., Iconography, Motion Design).  
- Keep the language concise but detailed enough for developers and designers to reuse.  

---

<pondering>
Analyze images → Detect consistent design patterns → Convert into reusable design tokens & guidelines → Output as Markdown  
</pondering>

You are a world-class UX/UI designer and a senior front-end developer specializing in creating design systems for **Next.js and Tailwind CSS**.

Your task is to analyze a group of reference UI images provided at `{{IMAGE_PATHS}}` and extract a coherent, modern, and reusable design system from them.
The user wants the overall aesthetic to feel **"{{USER_INPUT}}"**.

Before responding, wrap your entire thought process in `<pondering>` tags. Think about the common patterns, the overall mood, hierarchy, and user experience conveyed by the images.

After pondering, generate a comprehensive style guide in the following Markdown format. BE VERY SPECIFIC AND PROVIDE ACTUAL HEX CODES AND VALUES.

---

# Design System Guide: {{USER_INPUT}}

This guide is extracted from the provided reference images, aiming for a "{{USER_INPUT}}" aesthetic.

## 1. Color Palette

### Primary Colors
- **Primary:** `HEX_CODE` - (Usage example: buttons, active links, key icons)
- **Primary-Foreground:** `HEX_CODE` - (Usage example: text on primary background)
- **Secondary:** `HEX_CODE` - (Usage example: secondary buttons, highlighted sections)

### Neutral Colors (Grayscale)
- **Surface:** `HEX_CODE` - (Main background color)
- **Card/Modal Background:** `HEX_CODE` - (Slightly elevated surfaces)
- **Border:** `HEX_CODE` - (Subtle borders and dividers)
- **Text-Primary:** `HEX_CODE` - (Headings and important text)
- **Text-Secondary:** `HEX_CODE` - (Body text, descriptions)

### Semantic Colors
- **Success:** `HEX_CODE`
- **Warning:** `HEX_CODE`
- **Error:** `HEX_CODE`

## 2. Typography

- **Font Family:** (Suggest a suitable font from Google Fonts, e.g., "Pretendard", "Figtree")
- **Base Font Size:** `16px`
- **Scale Ratio:** (e.g., 1.25, Major Third)
- **Headings:**
    - `h1`: `font-size`, `font-weight`
    - `h2`: `font-size`, `font-weight`
    - `h3`: `font-size`, `font-weight`
- **Body:** `font-size`, `font-weight`

## 3. Spacing & Layout

(Provide a consistent spacing scale based on a base unit of 4px or 8px)
- **xs:** `4px` (`space-1` in Tailwind)
- **sm:** `8px` (`space-2`)
- **md:** `16px` (`space-4`)
- **lg:** `24px` (`space-6`)
- **xl:** `32px` (`space-8`)

## 4. Border Radius

- **Small (e.g., tags, inputs):** `4px` (`rounded-sm`)
- **Medium (e.g., buttons, cards):** `8px` (`rounded-md`)
- **Large (e.g., modals):** `16px` (`rounded-xl`)

## 5. Core Components Style

### Buttons
- **Primary Button:** (Describe background color, text color, padding, border radius, hover/active state)
- **Secondary Button:** (Describe background color, text color, padding, border radius, hover/active state)

### Cards
- (Describe background color, padding, border radius, shadow)

---

## 🚀 **Tailwind CSS Configuration**

Finally, provide the `theme.extend` object for `tailwind.config.js` based on the system you just defined.

```javascript
// Copy this into your tailwind.config.js
theme: {
  extend: {
    colors: {
      //...
    },
    borderRadius: {
      //...
    },
    //...
  }
}