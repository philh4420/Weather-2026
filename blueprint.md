
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
        *   **Universal:** A bright, near-white gradient is used in both light and dark modes for maximum visibility against all backgrounds.
        *   **Light Mode:** A subtle drop shadow is applied to the text to enhance contrast.
        *   **Dark Mode:** A soft, glowing text shadow is used to create a more vibrant effect.
    *   **Modern Scrollbar:** A custom, minimalist scrollbar for a cleaner look.
    *   **Noise Background:** A subtle noise texture is applied to the main background for a premium, tactile feel.
*   **Font:** The application uses the "Poppins" font from Google Fonts for a clean, modern aesthetic.

### **Components**

*   **`DateTime.tsx`:**
    *   A client-side component that displays the current time and date.
    *   Both the time and date displays utilize the "Liquid Light" effect for a dynamic, unified visual.
    *   The date is formatted for the UK (enGB) locale.
    *   The component features a theme-aware design with a rounded, pill-shaped background and a pulsing border animation.
*   **`WeatherAlerts.tsx`:**
    *   A component that displays weather alerts in a modern, professional format.
    *   **Dynamic Icons & Colors:** Each alert is accompanied by a unique, color-coded icon that corresponds to the type of weather event (e.g., flood, tornado, wind).
    *   **Elegant UI:** The layout is clean and refined, featuring a curly brace motif for a touch of visual sophistication.
*   **`UvIndex.tsx`:**
    *   A component that displays the UV index in a visually engaging, circular progress bar.
    *   **Color-Coded Feedback:** The progress bar and text change color based on the UV index level (Low, Moderate, High, etc.).
    *   **Informative & Actionable:** Provides a clear description of the current UV risk and recommended precautions.

### **Application Structure (App Router)**

*   **`layout.tsx`:** The root layout for the application. It applies the global font, background styles, and the noise texture effect.
*   **`page.tsx`:** The main page of the application, which currently displays the `DateTime` and `WeatherAlerts` components.

### **Dependencies**

*   **`date-fns`:** Used for robust and consistent date and time formatting.
*   **`react-icons`:** Provides a comprehensive library of icons for use throughout the application.

---

## **3. Current Plan**

The immediate goal was to resolve a critical issue where CSS styles were not being applied, preventing the "Liquid Light" effect from rendering. This has been resolved.

**Next Steps:**

1.  **Finalize Component Designs:** Continue to refine the visual appearance of all weather components to ensure a consistent, modern, and professional look. This is an ongoing process.
2.  **Continue Feature Development:** Proceed with building the core weather forecasting features of the application.
