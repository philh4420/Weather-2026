# Meteoro Weather App Blueprint

## 1. Overview

Meteoro is a modern, design-focused weather application. It provides real-time weather data, multi-day forecasts, air quality information, and other meteorological details. The interface is designed to be beautiful, intuitive, and fully responsive, with a dynamic theme system that adapts to the current weather conditions.

## 2. Implemented Features & Design

This section documents all features, styles, and architectural decisions implemented in the application to date.

### 2.1. Core Architecture
*   **Framework:** Next.js 14+ with App Router.
*   **Language:** TypeScript.
*   **Package Manager:** npm.

### 2.2. Styling & Theming
*   **CSS Framework:** Tailwind CSS.
*   **Font:** Poppins.
*   **Base Styles:** A custom theme is defined in `tailwind.config.ts` for consistent colors, spacing, and typography across light and dark modes.
*   **Background:** A subtle `bg-noise` texture is applied over a dark base (`#121212`) for a premium feel.
*   **Dynamic Theme:** The background color and accent elements change dynamically based on the current weather condition (`WeatherBackground` component).
*   **Cards:** UI cards feature a modern glassmorphism effect (`shadow-glass-light`, `dark:shadow-glass-dark`, `backdrop-blur-sm`).

### 2.3. Backend API (`/api/weather`)
*   **Data Aggregation:** A single server-side route fetches data from two external sources: **WeatherAPI** and **OpenWeatherMap**.
*   **Data Merging:** The route merges the responses to create a unified data structure, combining the strengths of both APIs.
*   **Air Quality:** It makes a third call to fetch detailed air pollution data based on the location coordinates.
*   **Error Handling:**
    *   Includes a fallback mechanism: If the primary API fails on a location search, it attempts a second search using coordinates from the other API.
    *   Returns clear error messages in a JSON object.
    *   **Data Integrity:** Gracefully handles missing `uv` data at the source, returning `null` instead of `undefined` to prevent client-side `NaN` errors.

### 2.4. Components
*   **`CurrentWeather`**: Displays primary weather info: location, temperature, condition, and high/lows.
*   **`HourlyForecast`**: A horizontally scrollable list of the weather for the next several hours.
*   **`DailyForecastCard`**: Compact cards for the 5-day forecast.
*   **`AirQuality`**: Shows the Air Quality Index (AQI) and breaks down individual pollutant levels.
*   **`UvIndex`**:
    *   Displays the UV index value with a corresponding status level (Low, Moderate, etc.).
    *   Features a circular SVG progress indicator that visually represents the UV level.
    *   The indicator color and text are dynamically styled using themed Tailwind classes (e.g., `text-green-500`).
    *   Includes a smooth, theme-compliant CSS transition for the progress animation.
    *   Displays a skeleton loader during data fetching and correctly handles `null` or invalid data.
*   **`SunriseSunset`**: Shows sunrise and sunset times with a dynamic arc that tracks the sun's position during the day.
*   **`WindStatus`**: Displays wind speed, gust speed, and direction with a compass-like indicator.
*   **`Atmosphere`**: Shows humidity, pressure, and visibility.
*   **`MoonPhase`**: Shows the current moon phase and rise/set times.
*   **`WeatherAlerts`**: Lists any active weather alerts for the location.
*   **`ErrorDisplay`**: A dedicated component to show API or network errors with a retry button.

### 2.5. Client-Side Logic (`page.tsx`)
*   **State Management:** Uses `useState` and `useEffect` hooks for managing location, weather data, loading status, and errors.
*   **Data Fetching:**
    *   Initiates a data fetch on page load using the browser's geolocation API.
    *   Falls back to a default location ('New York') if geolocation is denied or unavailable.
    *   Allows users to manually search for a new location.
*   **Layout:** Currently a single-column layout, which is the subject of the current change request.

## 3. Current Task: Modern Responsive Layout

**Goal:** Rearchitect the main page layout in `src/app/page.tsx` to be more modern, visually balanced, and responsive across all screen sizes, without modifying the internal code of any component.

### 3.1. Plan
1.  **Grid System:** Replace the current single-column structure with a responsive 12-column grid.
    *   `grid-cols-1` (Mobile)
    *   `md:grid-cols-2` (Tablet)
    *   `xl:grid-cols-4` (Desktop)
2.  **Viewport Maximization:** Expand the main container to `max-w-screen-xl` to make better use of horizontal space on large monitors.
3.  **Component Orchestration:** Rearrange the components into a more logical and visually appealing hierarchy.

    *   **Row 1 (Primary Dashboard):**
        *   `CurrentWeather`: Span `xl:col-span-2` and `md:col-span-2` to give it prominence.
        *   `SunriseSunset`: Place next to `CurrentWeather`.
        *   `UvIndex`: Place next to `CurrentWeather`.

    *   **Row 2 (Full-Width Info):**
        *   `HourlyForecast`: Span the full width (`xl:col-span-4`, `md:col-span-2`).
        *   `WeatherAlerts` (if present): Span the full width (`xl:col-span-4`, `md:col-span-2`).

    *   **Row 3 (Detailed Grid):**
        *   `5-Day Forecast`: Span the full width (`xl:col-span-4`, `md:col-span-2`).
        *   `AirQuality`: Span `xl:col-span-2` and `md:col-span-2`.
    
    *   **Row 4 (Secondary Grid):**
        *   `WindStatus`
        *   `MoonPhase`
        *   `Atmosphere`: Span `xl:col-span-2`

4.  **Responsiveness:** Ensure the layout gracefully adapts to smaller screens, stacking elements logically. Add responsive gap utilities for consistent spacing.
