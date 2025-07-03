

function fetchMarketSummary() {
    const contentDiv = document.getElementById('market-overview-content');
    const skeletonDiv = document.getElementById('market-overview-skeleton');

    if (contentDiv && skeletonDiv) {
        contentDiv.classList.add('hidden');
        skeletonDiv.classList.remove('hidden');
    }

    Promise.all([
        fetch(`${API_BASE_URL}/nifty50-basic`).then(res => res.json()),
        fetch(`${API_BASE_URL}/sensex-basic`).then(res => res.json()),
        fetch(`${API_BASE_URL}/nifty-midcap50-basic`).then(res => res.json())
    ])
    .then(([niftyData, sensexData, niftyMidcapData]) => {
        const niftyTicker = document.getElementById('nifty-ticker');
        const sensexTicker = document.getElementById('sensex-ticker');
        const niftyMidcap50 = document.getElementById('nifty-midcap-ticker');

        if (niftyTicker) {
            niftyTicker.innerHTML = `<span style='font-size: 1.5rem; font-weight: 600;'>${niftyData.lastPrice.toLocaleString()}</span> <span style='font-size: 1rem; color:${niftyData.change >= 0 ? '#388e3c' : '#d32f2f'}; font-weight: 600;'>${niftyData.change >= 0 ? '+' : ''}${niftyData.change.toFixed(2)} (${niftyData.pChange >= 0 ? '+' : ''}${niftyData.pChange.toFixed(2)}%)</span>`;
            // Chart data is not available in the current API response
            // renderChart('nifty-chart', niftyData.data, niftyData.change);
        }

        if (sensexTicker) {
            sensexTicker.innerHTML = `<span style='font-size: 1.5rem; font-weight: 600;'>${sensexData.lastPrice.toLocaleString()}</span> <span style='font-size: 1rem; color:${sensexData.change >= 0 ? '#388e3c' : '#d32f2f'}; font-weight: 600;'>${sensexData.change >= 0 ? '+' : ''}${sensexData.change.toFixed(2)} (${sensexData.pChange >= 0 ? '+' : ''}${sensexData.pChange.toFixed(2)}%)</span>`;
            // Chart data is not available in the current API response
            // renderChart('sensex-chart', sensexData.data, sensexData.change);
        }

        if (niftyMidcap50) {
            niftyMidcap50.innerHTML = `<span style='font-size: 1.5rem; font-weight: 600;'>${niftyMidcapData.lastPrice.toLocaleString()}</span> <span style='font-size: 1rem; color:${niftyMidcapData.change >= 0 ? '#388e3c' : '#d32f2f'}; font-weight: 600;'>${niftyMidcapData.change >= 0 ? '+' : ''}${niftyMidcapData.change.toFixed(2)} (${niftyMidcapData.pChange >= 0 ? '+' : ''}${niftyMidcapData.pChange.toFixed(2)}%)</span>`;
            // Chart data is not available in the current API response
            // renderChart('nifty-midcap-chart', niftyMidcapData.data, niftyMidcapData.change);
        }

        if (contentDiv && skeletonDiv) {
            contentDiv.classList.remove('hidden');
            skeletonDiv.classList.add('hidden');
        }
    })
        .catch(error => {
            console.error('Error fetching market summary:', error);
            if (contentDiv && skeletonDiv) {
                contentDiv.classList.remove('hidden');
                skeletonDiv.classList.add('hidden');
                contentDiv.innerHTML = '<p class="text-red-500 text-center">Failed to load market data. Please try again later.</p>';
            }
        });
}

function renderChart(elementId, seriesData, change) {
    const chartColor = change >= 0 ? '#388e3c' : '#d32f2f';
    const options = {
        series: [{
            data: seriesData
        }],
        chart: {
            type: 'line',
            height: 80,
            sparkline: {
                enabled: true
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            }
        },
        stroke: {
            width: 2,
            curve: 'smooth',
            colors: [chartColor]
        },
        tooltip: {
            enabled: false // Disable tooltip for sparklines
        },
        grid: {
            show: false
        },
        xaxis: {
            labels: {
                show: false
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            labels: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: 'vertical',
                shadeIntensity: 0.5,
                gradientToColors: [chartColor],
                inverseColors: true,
                opacityFrom: 0.7,
                opacityTo: 0.1,
                stops: [0, 100]
            }
        }
    };

    const chartElement = document.getElementById(elementId);
    if (chartElement) {
        // Clear existing chart if any
        chartElement.innerHTML = '';
        const chart = new ApexCharts(chartElement, options);
        chart.render();
    }
}
