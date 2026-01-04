
# **Project Blueprint: Meteoro Weather App**

## **1. Overview**

This document outlines the design, features, and development plan for the Meteoro Weather App. The application is a modern, Apple-inspired weather forecasting tool built with Next.js and deployed on Firebase. It aims to provide a beautiful, intuitive, and highly responsive user experience with a "2026+" futuristic aesthetic, evolving into a personal wellness advisor.

---

## **2. Project Outline (Current State)**

This section details the application's features and styles as they currently exist.

### **Styling & Design**

*   **Global Styles (`globals.css`):**
    *   **Tailwind CSS:** Utility-first styling.
    *   **"Liquid Light" Effect:** A custom, theme-aware text animation for a shimmering, liquid-like gradient on text.
    *   **Modern Scrollbar:** A custom, minimalist scrollbar.
    *   **Noise Background:** A subtle noise texture on the main background for a premium, tactile feel.
*   **Font:** "Poppins" from Google Fonts.
*   **Layout Consistency:** All component cards feature centered headings for a balanced and professional layout.

### **Core Components**

*   **`Loading.tsx`:** A futuristic "Quantum Spinner" loading animation.
*   **`WeatherBackground.tsx`:** A dynamic background that changes based on the current weather conditions and time of day.
*   **Full Suite of Weather Cards:** The application includes a comprehensive set of components for displaying all aspects of the weather (`CurrentWeather`, `HourlyForecast`, `DailyForecastCard`, `AirQuality`, `UvIndex`, `SunriseSunset`, `WindStatus`, `Atmosphere`, `MoonPhase`, `WeatherAlerts`).
*   **`WellnessDashboard.tsx`:** A 2x2 grid displaying wellness-related advice.
    *   **`ActivityAdvisor.tsx`:** Provides advice on the best time for outdoor activities.
    *   **`SkinAdvisor.tsx`:** Offers skin protection advice based on UV index.
    *   **`PollenForecast.tsx`:** Displays pollen levels for tree, grass, and weed.
    *   **`BreathingAdvisor.tsx`:** Gives advice based on air quality and pollen levels.
*   **`WeatherMap.tsx`:** An interactive map with selectable data layers (Temperature, Wind Speed, Clouds) and an optional precipitation overlay. It includes a legend and allows users to click to get weather for a new location.

### **Application Structure (App Router)**

*   **`layout.tsx`:** The root layout, applying global styles.
*   **`page.tsx`:** The main page that orchestrates the layout and data fetching for all weather components.

---

## **3. Development Plan**

This section outlines the development history and next steps.

### **Current Plan: Hyper-Local, Minute-by-Minute Forecast**

The next goal is to implement a "killer feature" that provides an immediate, short-term precipitation forecast.

*   **Concept:** Answer the user's most immediate weather question: "Is it going to rain on me *right now*?"
*   **Features:**
    *   A dedicated component that displays a summary like "Light rain starting in 12 minutes" or "Rain stopping in 25 minutes."
    *   A simple, visual timeline showing rain intensity over the next 60 minutes.
*   **APIs:** OpenWeatherMap and WeatherAPI both offer minutely precipitation forecasts.
*   **Implementation Steps:**
    1.  **Backend Update:** Modify the `/api/weather` endpoint to fetch and include minutely forecast data.
    2.  **Component Creation:** Create a new `MinutelyForecast.tsx` component.
    3.  **Visualization:** Design a visual timeline to represent rain intensity over the next hour.
    4.  **Summary Logic:** Implement the logic to generate the human-readable summary message.
    5.  **Frontend Integration:** Add the new `MinutelyForecast` component to the main page.

### **Completed Milestones**

1.  **Modernized Loading State:** Implemented the "Quantum Spinner."
2.  **Layout Refinement:** Centered all component headings.
3.  **Core Weather Suite:** Built a comprehensive set of components for displaying weather data.
4.  **Advanced Health & Activity Dashboard:** Implemented the "Wellness Dashboard" with activity, skin, pollen, and breathing advisors.
5.  **Interactive, Layered Weather Map:** Created an interactive map with selectable data layers, a legend, and click-to-update functionality.
