# Project Support Documentation

This document provides a detailed overview of the project's file structure, API usage, and HTML content, serving as a comprehensive guide for understanding and maintaining the application.

## 1. File Descriptions

*   **`index.html`**: The main HTML file that structures the entire web application. It leverages Tailwind CSS for a modern, responsive, and interactive design. It includes meta-information, links to Tailwind CSS CDN, custom `styles.css`, Google Fonts (Poppins), and the Animate On Scroll (AOS) library. It integrates all JavaScript files (`marketSummary.js`, `topFunds.js`, `script.js`, `calculators.js`) and defines the layout and content of the Rekmand Investment website.

*   **`css/styles.css`**: Contains custom `@keyframes` for `fade-in` and `slide-up` animations, along with utility classes for applying animation delays. This file complements the Tailwind CSS framework by providing specific animation effects.

*   **`js/script.js`**: The primary JavaScript file that orchestrates the loading of dynamic content. It initializes the AOS library, handles UI interactions such as the mobile menu, dropdowns, the "Back to Top" button, and the calculator modal. It also manages the contact form submission, including client-side validation and a loading indicator.

*   **`js/marketSummary.js`**: Responsible for fetching real-time stock market summary data (Nifty 50, Sensex, Nifty Midcap 50) from the `/api/market-summary` endpoint. It dynamically updates the UI with the latest values and renders sparkline charts using ApexCharts.

*   **`js/topFunds.js`**: Handles the retrieval and dynamic display of the top 3 mutual funds. It fetches data from the `/api/top-funds` endpoint and generates HTML cards to display the fund information.

*   **`js/calculators.js`**: Contains the JavaScript logic for the investment calculators (SIP, Lumpsum, Risk Profiler, Goal Planning). It handles the display of calculator forms within a modal and performs the necessary calculations.

*   **`.github/workflows/static.yml`**: A GitHub Actions workflow file that automates the deployment of the website to GitHub Pages whenever changes are pushed to the `main` branch.

## 2. API Usage

The frontend application interacts with a backend API (assumed to be running at `http://127.0.0.1:8000`) to fetch dynamic data.

*   **`/api/market-summary`**
    *   **Method**: `GET`
    *   **Description**: Provides the latest summary data for key stock market indices.
    *   **Used by**: `js/marketSummary.js`

*   **`/api/top-funds`**
    *   **Method**: `GET`
    *   **Description**: Returns a list of the top 3 mutual funds.
    *   **Used by**: `js/topFunds.js`

## 3. HTML Structure (`index.html`)

The `index.html` file is organized into several semantic sections:

*   **`<head>`**: Contains metadata, links to stylesheets (Tailwind CSS, custom styles, Google Fonts, AOS), and the page title.
*   **`<header>`**: The top banner with the logo and company name.
*   **`<nav>`**: The navigation bar with links to different sections and external portals. It includes a mobile-friendly menu.
*   **Hero Section (`#home`)**: The main welcome section with a headline and call-to-action buttons.
*   **Market Overview Section (`#market-overview`)**: Displays market data and charts.
*   **Top Mutual Funds Section (`#top-funds`)**: Showcases the top-performing mutual funds.
*   **Investment Tools Section (`#tools`)**: Provides access to various financial calculators.
*   **Services Section (`#services`)**: Outlines the services offered.
*   **FAQ Section (`#faq`)**: A list of frequently asked questions.
*   **Contact Section (`#contact`)**: Contact information and a contact form.
*   **`<footer>`**: The footer with copyright information.
*   **Modals and Buttons**: Includes a "Back to Top" button and a modal for the calculators.

## 4. Tailwind CSS Integration

The project uses Tailwind CSS for styling, which allows for a utility-first approach to design. This results in a more maintainable and scalable codebase. Custom styles that are not covered by Tailwind's default utilities are defined in `css/styles.css`. The responsive design features of Tailwind are used extensively to ensure the application looks great on all devices.