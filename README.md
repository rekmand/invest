# Rekmand Investment

Rekmand Investment is a web application designed to provide professional mutual fund management and investment services. It offers a user-friendly interface to explore mutual funds, view market summaries, and access various investment tools.

## Features

*   **Market Overview**: Displays real-time data for Nifty 50, Sensex, and Nifty Midcap 50, including sparkline graph animations.
*   **Top Mutual Funds**: Showcases the top 3 equity mutual funds with enhanced card designs, hover effects, and clear display of returns (green for positive, red for negative).
*   **Investment Tools**: Includes functional SIP Calculator (with frequency option), Lumpsum Calculator, Risk Profiler, and Goal Planning tools, all accessible via pop-up modals.
*   **Testimonials**: A dedicated section showcasing client feedback to build trust.
*   **FAQ**: A section addressing frequently asked questions.
*   **Services**: Details on Portfolio Management, Mutual Fund Investment, Financial Planning, and Personalized Advisory.
*   **Contact**: Contact information and a contact form with client-side validation and a loading indicator.

## Enhancements

*   **Improved User Experience**: Implemented client-side form validation for the contact form, added a loading indicator for form submission, and integrated AOS (Animate On Scroll) library for subtle scroll animations.
*   **Accessibility**: Enhanced accessibility for the calculator modal and mobile menu button with appropriate ARIA attributes.
*   **Performance**: Optimized image loading with `srcset` and `sizes` attributes for responsive images, and removed unused CSS and JavaScript files. The `logo_medium.png` reference was removed as the file was not present.
*   **Code Maintainability**: Defined API base URL in `marketSummary.js` for easier management.

## Getting Started

To run this project locally, you will need a web server to serve the `index.html` file and a backend API running at `http://127.0.0.1:8000` to provide the necessary data.

### Prerequisites

*   A web browser.
*   A local server (e.g., Python's `http.server`, Node.js `serve`, or any other web server).
*   A backend API that exposes the following endpoints:
    *   `/api/market-summary`
    *   `/api/top-funds`
    

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd invest
    ```

2.  **Set up the backend API:**
    Ensure your backend API is running and accessible at `http://127.0.0.1:8000`. The API is expected to provide data as described in `apiinfo.txt`.

3.  **Serve the frontend:**
    You can use Python's built-in HTTP server for a quick setup:
    ```bash
    python -m http.server 8000
    ```
    Or, if you have Node.js installed, you can use `serve`:
    ```bash
    npm install -g serve
    serve .
    ```

### Usage

Open your web browser and navigate to `http://localhost:8000` (or the port your server is running on). The application will load and display the investment dashboard.

## Project Structure

*   `index.html`: Main HTML file, extensively styled with Tailwind CSS for a modern and responsive design.
*   `css/styles.css`: Contains custom CSS for animations (fade-in, slide-up) and minimal overrides, complementing Tailwind CSS.
*   `js/`: Contains JavaScript files for dynamic content and interactivity.
    *   `marketSummary.js`: Fetches and displays market summary data.
    *   `script.js`: Main script to initialize data fetching and handle UI interactions.
    *   `topFunds.js`: Fetches and displays top mutual funds data.
*   `images/`: Contains project images (logo, financial planning image).
*   `apiinfo.txt`: Documents the backend API endpoints.
*   `support.md`: Provides detailed explanations of each script/file, API usage, and HTML sections, including notes on Tailwind CSS integration.

## Support Documentation

For a detailed explanation of each file, API usage, and the structure of the HTML, please refer to the `support.md` file in the project root.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[Specify your license here, e.g., MIT License]