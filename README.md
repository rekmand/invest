# Rekmand Investment

Rekmand Investment is a web application designed to provide professional mutual fund management and investment services. It offers a user-friendly interface to explore mutual funds, view market summaries, and access various investment tools.

## Features

*   **Market Overview**: Displays real-time data for Nifty 50, Sensex, and Nifty Midcap 50, including sparkline graph animations.
*   **Top Mutual Funds**: Showcases the top 3 equity mutual funds with enhanced card designs and hover effects.
*   **Investment Tools**: Includes functional SIP Calculator, Lumpsum Calculator, Risk Profiler, and Goal Planning tools.
*   **Interactive UI**: Modern and responsive design built with Tailwind CSS, featuring smooth animations and a mobile-friendly interface.
*   **Contact Form**: A functional contact form with client-side validation and a loading indicator for a better user experience.

## Technologies Used

*   **Frontend**: HTML, CSS, JavaScript
*   **Styling**: Tailwind CSS, Google Fonts
*   **Charts**: ApexCharts
*   **Animations**: Animate On Scroll (AOS)
*   **Deployment**: GitHub Pages

## Getting Started

To run this project locally, you will need a web server to serve the `index.html` file and a backend API to provide the necessary data.

### Prerequisites

*   A modern web browser.
*   A local web server (e.g., Python's `http.server`, Node.js `serve`).
*   A backend API running at `http://127.0.0.1:8000` that exposes the following endpoints:
    *   `/api/market-summary`
    *   `/api/top-funds`

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/dheemankumar/invest.git
    cd invest
    ```

2.  **Set up the backend API:**
    Ensure your backend API is running and accessible at `http://127.0.0.1:8000`.

3.  **Serve the frontend:**
    You can use Python's built-in HTTP server for a quick setup:
    ```bash
    python -m http.server
    ```
    Or, if you have Node.js installed, you can use `serve`:
    ```bash
    npm install -g serve
    serve .
    ```

### Usage

Open your web browser and navigate to `http://localhost:8000` (or the port your server is running on).

## Project Structure

*   `index.html`: The main HTML file for the application.
*   `css/styles.css`: Custom CSS for animations and styles not covered by Tailwind CSS.
*   `js/`: Contains the JavaScript files:
    *   `script.js`: Main script for initializing the application and handling UI interactions.
    *   `marketSummary.js`: Fetches and displays the market summary data and charts.
    *   `topFunds.js`: Fetches and displays the top mutual funds.
    *   `calculators.js`: Provides the logic for the investment calculators.
*   `images/`: Contains images used in the application.
*   `.github/workflows/static.yml`: GitHub Actions workflow for automatic deployment to GitHub Pages.

## Deployment

This project is automatically deployed to GitHub Pages whenever changes are pushed to the `main` branch. The deployment process is managed by the `.github/workflows/static.yml` file.

## Support

For more detailed documentation on the project structure, API usage, and code, please refer to the `support.md` file.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
