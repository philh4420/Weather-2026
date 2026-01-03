# Meteoro Weather Application

## Overview

Meteoro is a modern, visually-driven weather application built with Next.js and Tailwind CSS. It provides real-time weather information, a 5-day forecast, and detailed atmospheric data in a beautiful and intuitive interface. The application's theme dynamically adapts to the current weather conditions, with a light theme for sunny days and a dark theme for all other conditions.

## Core Features

*   **Dynamic Theming:** The application's theme automatically switches between light and dark modes based on the current weather. A light theme is used for sunny or clear conditions, while a dark theme is used for cloudy, rainy, or misty weather.
*   **"Frosted Glass" UI:** The UI features "frosted glass" cards that create a sense of depth and make the content more readable. This effect is achieved with a combination of `backdrop-blur` and semi-transparent background colors.
*   **Dynamic Backgrounds:** The background of the application is a looping video that changes based on the weather conditions. There are videos for sunny, rainy, misty, and cloudy weather.
*   **Geolocation and Search:** Users can either get weather information for their current location using the browser's geolocation API or search for a specific city.
*   **Comprehensive Weather Data:** The application displays a wealth of weather information, including:
    *   Current weather with temperature, feels-like temperature, and high/low temperatures.
    *   Hourly and 5-day forecasts.
    *   Air quality index.
    *   UV index.
    *   Sunrise and sunset times.
    *   Wind status.
    *   Atmospheric pressure and humidity.
    *   Moon phase.
    *   Weather alerts.

## Design and Styling

*   **Typography:** The application uses a clean, modern font stack with a clear typographic hierarchy. The primary font is a sans-serif font, with different weights and sizes used to distinguish between headings, body text, and secondary information.
*   **Color Palette:** The color palette is designed to be both aesthetically pleasing and functional. The light theme uses a light gray background with white cards and dark text, while the dark theme uses a dark background with semi-transparent dark gray cards and light text. The color palette also includes accent colors for links and other interactive elements.
*   **Iconography:** The application uses icons from the `react-icons/fi` library to provide visual cues and enhance the user experience.
*   **Layout:** The layout is responsive and adapts to different screen sizes. On larger screens, the content is organized in a two-column grid, while on smaller screens, the content is stacked vertically.

## Project Structure

*   **/app:** The core directory for file-based routing.
    *   **page.tsx:** The main page component, which orchestrates the fetching of weather data and the rendering of the various weather components.
    *   **/components:** This directory contains all the reusable UI components, such as `WeatherBackground`, `CurrentWeather`, `HourlyForecast`, etc.
*   **tailwind.config.ts:** The Tailwind CSS configuration file, which defines the color palette, box shadows, and other design tokens.
*   **.idx/dev.nix:** The Nix configuration file, which defines the development environment.

## Current Plan and Steps

This section outlines the plan and steps for the current requested change. Since the initial development is complete, this section is currently empty.
