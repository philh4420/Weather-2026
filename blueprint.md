
# **Project Blueprint: Meteoro Weather App**

## **1. Overview**

This document outlines the design, features, and development plan for the Meteoro Weather App. The application is a modern, Apple-inspired weather forecasting tool built with Next.js and deployed on Firebase. It aims to provide a beautiful, intuitive, and highly responsive user experience with a "2026+" futuristic aesthetic.

---

## **2. Project Outline (Current State)**

This section details the application's features and styles as they currently exist.

### **Styling & Design**

*   **Global Styles (`globals.css`):**
    *   **Tailwind CSS:** The project uses Tailwind CSS for utility-first styling.
    *   **"Liquid Light" Effect:** A custom, theme-aware text animation that creates a shimmering, liquid-like gradient on text. Applied with the `.liquid-light` class.
    *   **Modern Scrollbar:** A custom, minimalist scrollbar for a cleaner look.
    *   **Noise Background:** A subtle noise texture is applied to the main background for a premium, tactile feel.
*   **Font:** The application uses the "Poppins" font from Google Fonts.
*   **Layout Consistency:** All component cards feature centered headings for a balanced and professional layout.

### **Components**

*   **`Loading.tsx`:**
    *   A futuristic and theme-aware loading animation that replaces the generic default spinner.
    *   **"Quantum Spinner":** A visually captivating animation featuring multiple concentric, rotating rings with different colors and timings.
    *   **"Liquid Light" Text:** Displays "Fetching Weather..." with the `.liquid-light` class.
*   **`DateTime.tsx`:**
    *   A client-side component displaying the current time and date with the "Liquid Light" effect.
    *   Features a theme-aware design with a rounded, pill-shaped background and a pulsing border animation.
*   **`WeatherAlerts.tsx`:**
    *   Displays weather alerts with dynamic, color-coded icons corresponding to the event type.
    *   The layout is clean and refined, featuring a curly brace motif.
*   **`UvIndex.tsx`:**
    *   Displays the UV index in a visually engaging, circular progress bar.
    *   The progress bar and text change color based on the UV index level.
*   **(Other Components):** The application includes a full suite of weather components (`CurrentWeather`, `SunriseSunset`, `WindStatus`, `Atmosphere`, `MoonPhase`, `HourlyForecast`, `DailyForecastCard`, `AirQuality`), all styled to be consistent with the overall modern aesthetic.

### **Application Structure (App Router)**

*   **`layout.tsx`:** The root layout, applying the global font and background styles.
*   **`page.tsx`:** The main page that orchestrates the layout and data fetching for all weather components.

### **Dependencies**

*   **`date-fns`:** Used for robust date and time formatting.
*   **`react-icons`:** Provides a comprehensive library of icons.

---

## **3. Current Plan**

This section outlines the most recent changes and the next steps.

### **Completed Steps**

1.  **Layout Refinement:** Refactored all component cards to center their headings, ensuring a consistent and professional UI across the application.
2.  **Modernize Loading State:** Designed and implemented a modern, theme-aware "Quantum Spinner" loading animation to replace the generic default. This aligns the loading state with the "2026+" aesthetic.

### **Next Steps**

*   Conduct a full review of the application's responsiveness and visual consistency across different screen sizes (mobile, tablet, and desktop) to ensure a flawless user experience on all devices.
