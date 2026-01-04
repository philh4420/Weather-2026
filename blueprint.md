
# **Project Blueprint: Meteoro Weather App**

## **1. Overview**

This document outlines the design, features, and development plan for the Meteoro Weather App. The application is a modern, Apple-inspired weather forecasting tool built with Next.js and deployed on Firebase. It aims to provide a beautiful, intuitive, and highly responsive user experience.

---

## **2. Project Outline (Current State)**

This section details the application's features and styles as they currently exist.

### **Styling & Design**

*   **Global Styles (`globals.css`):**
    *   **Tailwind CSS:** The project uses Tailwind CSS for utility-first styling.
    *   **"Liquid Light" Effect:** A custom, theme-aware text animation that creates a shimmering, liquid-like gradient on text. It is defined directly in `globals.css` and applied with the `.liquid-light` class.
        *   **Light Mode:** A subtle gradient moving from dark gray to a lighter gray.
        *   **Dark Mode:** A bright, near-white gradient with a soft white text shadow to ensure high contrast and readability.
    *   **Modern Scrollbar:** A custom, minimalist scrollbar for a cleaner look.
    *   **Noise Background:** A subtle noise texture is applied to the main background for a premium, tactile feel.
*   **Font:** The application uses the "Poppins" font from Google Fonts for a clean, modern aesthetic.

### **Components**

*   **`DateTime.tsx`:**
    *   A client-side component that displays the current time and date.
    *   The time display utilizes the "Liquid Light" effect for a dynamic visual.
    *   The date is formatted for the UK (enGB) locale.
    *   The component features a theme-aware design with a rounded, pill-shaped background and a pulsing border animation.

### **Application Structure (App Router)**

*   **`layout.tsx`:** The root layout for the application. It applies the global font, background styles, and the noise texture effect.
*   **`page.tsx`:** The main page of the application, which currently displays the `DateTime` component.

### **Dependencies**

*   **`date-fns`:** Used for robust and consistent date and time formatting.

---

## **3. Current Plan**

The immediate goal was to resolve a critical issue where CSS styles were not being applied, preventing the "Liquid Light" effect from rendering. This has been resolved.

**Next Steps:**

1.  **Finalize Clock Appearance:** Ensure the "Liquid Light" effect on the clock is visually appealing and highly readable in both light and dark modes.
2.  **Continue Feature Development:** Proceed with building the core weather forecasting features of the application.
