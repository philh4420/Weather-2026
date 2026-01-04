
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
*   **(Other Components):** The application includes a full suite of weather components, all styled to be consistent with the overall modern aesthetic.

### **Application Structure (App Router)**

*   **`layout.tsx`:** The root layout, applying the global font and background styles.
*   **`page.tsx`:** The main page that orchestrates the layout and data fetching for all weather components.

---

## **3. Current Plan**

This section outlines the most recent changes and the next steps.

### **New Feature Plan: "Time Travel" - Historical & Future Weather Insights**

The next major feature is to implement a "Time Travel" module, allowing users to explore past and future weather, transforming the app into an exploratory experience.

*   **Phase 1: Backend API Enhancement**
    1.  **New API Endpoint:** Create a new route, `api/weather/timetravel`, to handle fetching historical and extended forecast data from the OpenWeatherMap API.
    2.  **Historical Logic:** The endpoint will accept a location and a date to fetch data for a specific day.
    3.  **"On This Day" Logic:** The endpoint will also handle requests to fetch weather for the same date in previous years.

*   **Phase 2: Frontend Component Development**
    1.  **`TimeTravel.tsx` Component:** Create a new, dedicated component for the feature's UI.
    2.  **UI - "Chrono-Dial":** Design a sleek, interactive "Chrono-Dial" or a highly-styled linear calendar for intuitive date selection.
    3.  **UI - Data Display:** Create a distinct "archival" card style to display historical weather data, including temperature, precipitation, and a weather icon, using our established modern design language.

*   **Phase 3: Integration**
    1.  **Integrate into `page.tsx`:** Add the new `TimeTravel.tsx` component to the main application grid.
    2.  **State Management:** Implement the necessary state and data-fetching logic to power the component.

### **Previously Completed Steps**

1.  **Layout Refinement:** Centered all component headings for a consistent UI.
2.  **Modernize Loading State:** Implemented the "Quantum Spinner" for a futuristic loading animation.
