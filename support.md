# Project Support Documentation

This document provides an overview of the project's file structure, API usage, and HTML content, serving as a guide for understanding and maintaining the application.

## 1. File Descriptions

*   **`index.html`**:
    *   This is the main HTML file that structures the entire web application. It has been extensively refactored to leverage Tailwind CSS for a modern, responsive, and interactive design. It includes meta-information, links to Tailwind CSS CDN, custom `styles.css` (for animations), Google Fonts (Poppins), and AOS (Animate On Scroll) library. It integrates all JavaScript files (`marketSummary.js`, `topFunds.js`, `script.js`, `calculators.js`). It defines the layout and content of the Rekmand Investment website, featuring enhanced layouts, interactive elements, and smooth entry animations. Skeleton loaders have been added for market data and top funds sections to improve user experience during data fetching. New sections for Testimonials and FAQ have been added. Images are now responsive using `srcset` and `sizes` attributes, and the `logo_medium.png` reference was removed as the file was not present. The contact form includes a loading indicator and client-side validation.

*   **`css/styles.css`**:
    *   Contains custom `@keyframes` for `fade-in` and `slide-up` animations, along with utility classes for applying animation delays. This file complements the Tailwind CSS framework by providing specific animation effects not directly available as Tailwind utilities. All animations have been reviewed and are considered smooth and non-distracting.

*   **`js/script.js`**:
    *   This is the primary JavaScript file that orchestrates the loading of dynamic content. It listens for the `DOMContentLoaded` event and, once the page is fully loaded, calls functions from other JavaScript files (`fetchMarketSummary()`, `fetchTopFunds()`) to populate the respective sections with data. It also includes `js/calculators.js` and handles the dropdown functionality for the navigation bar, including closing the mobile menu when clicking outside. It now includes AOS initialization, client-side form validation for the contact form, and a loading indicator for form submission.

*   **`js/marketSummary.js`**:
    *   Responsible for fetching real-time stock market summary data (Nifty 50, Sensex, Nifty Midcap 50) from the `/api/market-summary` endpoint. It then dynamically updates the `index.html` with the latest values, changes, and percentage changes for these indices, and renders sparkline charts using ApexCharts for each index. The `API_BASE_URL` is now defined at the top of this file. The font sizes have been adjusted to prevent text overflow within the cards.

*   **`js/topFunds.js`**:
    *   Handles the retrieval and dynamic display of the top 3 mutual funds. It fetches data from the `/api/top-funds` endpoint and generates visually enhanced HTML cards using Tailwind CSS. These cards now feature improved styling, hover effects, and conditional text coloring for 1-year returns (green for positive, red for negative), providing a more interactive and informative user experience in the "Top 3 Mutual Funds" section. The card size issue has been fixed by removing redundant classes and the data is fetched on page load.



*   **`js/calculators.js`**:
    *   Contains the JavaScript logic for the investment calculators (SIP, Lumpsum, Risk Profiler, Goal Planning). It handles the display of calculator forms within a modal, dynamically setting the modal title and content based on the calculator type. It performs calculations (for SIP, Lumpsum, and Goal Planning), and implements a question-based assessment for the Risk Profiler to determine a user's risk tolerance.

*   **`apiinfo.txt`**:
    *   This text file serves as a documentation for the backend API endpoints that the frontend consumes. It describes the endpoint paths, HTTP methods, descriptions of what each API returns, and provides example JSON responses.

## 2. API Usage

The frontend application interacts with a backend API (assumed to be running locally at `http://127.0.0.1:8000`) to fetch dynamic investment-related data. The following endpoints are utilized:

*   **`/api/market-summary`**
    *   **Method**: `GET`
    *   **Description**: This API endpoint provides the latest summary data for key stock market indices like Nifty 50, Sensex, and Nifty Midcap 50.
    *   **Used by**: `js/marketSummary.js` to display current market performance in the "Market Overview" section.

*   **`/api/top-funds`**
    *   **Method**: `GET`
    *   **Description**: This API endpoint returns a curated list of the top 3 equity mutual funds, likely scraped from financial news sources like Moneycontrol.
    *   **Used by**: `js/topFunds.js` to populate the "Top 3 Mutual Funds" section with fund details.

*   **`/api/amfi-data`**
    *   **Method**: `GET`
    *   **Description**: This API endpoint provides a comprehensive dataset of Net Asset Value (NAV) data for all mutual funds from AMFI (Association of Mutual Funds in India).
    *   **Used by**: `js/amfiData.js` (currently inactive) for displaying a detailed table of mutual fund NAVs.

## 3. HTML Structure (`index.html`)

The `index.html` file is organized into several semantic sections, each serving a distinct purpose:

*   **`<head>` Section**:
    *   Contains metadata about the HTML document, including character set, viewport settings, compatibility, description, keywords, author, Open Graph protocol tags for social media sharing, and a favicon.
    *   Links to external resources: Tailwind CSS CDN, custom `styles.css`, Google Fonts (Poppins), and AOS (Animate On Scroll) library.
    *   Sets the page title: "Rekmand Investment".

*   **`<header>` Section**:
    *   The top banner of the website.
    *   Displays the "Rekmand" logo and title, along with a subtitle "Professional Mutual Fund Management".
    *   Uses Tailwind CSS classes for styling (background, text alignment, padding) and enhanced visual appeal.

*   **`<nav>` Section (Navigation Bar)**:
    *   Provides the main navigation links for the website.
    *   Includes links to "Home", "Services", "Contact".
    *   Features dropdown menus for "NJ Portal" (NJ E-Wealth, NJ Client Desk) and "FundzBazzar Portal" (FundzBazzar Signin, FundzBazzar Broking), linking to external investment platforms.
    *   Includes direct links to "Prudent Client Desk" and "Amfiindia".
    *   Uses Tailwind CSS for styling. ARIA attributes have been added to the mobile menu for improved accessibility. The mobile menu button now includes `aria-label`, `aria-expanded`, and `aria-controls` attributes for better accessibility.

*   **`<section class="hero">` (Hero Section)**:
    *   The prominent introductory section of the website.
    *   Features a large "Welcome to Rekmand" heading and a lead paragraph.
    *   Includes call-to-action buttons ("Explore Mutual Funds", "Start Investing Today") that link to other sections of the page.
    *   An overlay image (`Financial_Planning.png`) is positioned at the bottom right for visual flair. The section has been restyled with updated padding, text styles, and button styles for a more polished look.

*   **`<section class="market-overview">` (Market Overview Section)**:
    *   Displays real-time (or near real-time) data for key stock market indices.
    *   Contains three cards, one each for "Nifty 50", "Sensex", and "Nifty Midcap 50".
    *   Each card has a dedicated `div` (`nifty-ticker`, `sensex-ticker`, `nifty-midcap-ticker`) where `js/marketSummary.js` injects the dynamic market data.
    *   Includes placeholder `div`s for charts (`nifty-chart`, `sensex-chart`, `nifty-midcap-chart`), which are intended to be rendered by ApexCharts. The section has been restyled with updated padding and improved card styles to enhance its visual appeal.

*   **`<section class="top-funds">` (Top Mutual Funds Section)**:
    *   Showcases the top 3 mutual funds.
    *   An empty `div` with `id="top-funds-container"` serves as a placeholder where `js/topFunds.js` dynamically inserts the fund details as Bootstrap cards.

*   **`<section class="tools-section">` (Investment Tools Section)**:
    *   Features various investment tools, including SIP Calculator, Lumpsum Calculator, Risk Profiler, and Goal Planning.
    *   Each tool card has an icon, title, brief description, and a "Calculate" button that opens a Bootstrap modal with the respective calculator form or demo content. The section has been restyled with a background gradient and improved card styles to enhance its visual appeal.

*   **`<section class="services-section">` (Our Services Section)**:
    *   Outlines the core services offered by Rekmand.
    *   Contains cards for "Portfolio Management", "Mutual Fund Investment", "Financial Planning", and "Personalized Advisory", each with an icon, title, and a short description. The section has been restyled with a background gradient and improved card styles to enhance its visual appeal.

*   **`<section class="about-us-section">` (About Us Section)**:
    *   Provides information about Rekmand Mutual Fund Services.
    *   Includes an image, a lead paragraph, a list of key principles (Client-Centric Approach, Proven Expertise, Trusted Partnership, Transparency & Integrity), and a concluding statement. The section has been restyled with a background gradient, enhanced typography, and subtle animations to improve visual appeal.

*   **`<section class="contact-section">` (Get in Touch / Contact Section)**:
    *   Provides contact information and a contact form.
    *   **Contact Details**: Displays email, phone number, and a placeholder for a physical address.
    *   **Map Responsive**: A placeholder for map integration.
    *   **Contact Form**: A simple form with fields for Name, Email, and Message, with client-side validation and a loading indicator for form submission. The section has been restyled with a background gradient and improved card styles to enhance its visual appeal.

*   **`<footer>` Section**:
    *   The bottom section of the website.
    *   Displays copyright information for "Rekmand Mutual Fund Services". The section has been restyled with a background gradient and enhanced text styles for a more polished look.

*   **JavaScript Includes (at the end of `<body>`)**:
    
    *   Includes ApexCharts library for potential chart rendering.
    *   Includes the custom JavaScript files (`marketSummary.js`, `topFunds.js`, `script.js`, `calculators.js`) to ensure they execute after the HTML content is loaded. The `amfiData.js` script has been removed, and `aos.js` has been added for animations.
