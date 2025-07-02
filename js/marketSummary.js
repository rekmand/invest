

function fetchMarketSummary() {
    const contentDiv = document.getElementById('market-overview-content');
    const skeletonDiv = document.getElementById('market-overview-skeleton');

    if (contentDiv && skeletonDiv) {
        contentDiv.classList.add('hidden');
        skeletonDiv.classList.remove('hidden');
    }

    fetch(`${API_BASE_URL}/market-summary`)
        .then(response => response.json())
        .then(data => {
            const niftyTicker = document.getElementById('nifty-ticker');
            const sensexTicker = document.getElementById('sensex-ticker');
            const niftyMidcap50 = document.getElementById('nifty-midcap-ticker');

            if (niftyTicker) {
                niftyTicker.innerHTML = `<span style='font-size: 1.5rem; font-weight: 600;'>${data.nifty_50.value.toLocaleString()}</span> <span style='font-size: 1rem; color:${data.nifty_50.change >= 0 ? '#388e3c' : '#d32f2f'}; font-weight: 600;'>${data.nifty_50.change >= 0 ? '+' : ''}${data.nifty_50.change} (${data.nifty_50.percent >= 0 ? '+' : ''}${data.nifty_50.percent}%)</span>`;
                renderChart('nifty-chart', data.nifty_50.data, data.nifty_50.change);
            }

            if (sensexTicker) {
                sensexTicker.innerHTML = `<span style='font-size: 1.5rem; font-weight: 600;'>${data.sensex.value.toLocaleString()}</span> <span style='font-size: 1rem; color:${data.sensex.change >= 0 ? '#388e3c' : '#d32f2f'}; font-weight: 600;'>${data.sensex.change >= 0 ? '+' : ''}${data.sensex.change} (${data.sensex.percent >= 0 ? '+' : ''}${data.sensex.percent}%)</span>`;
                renderChart('sensex-chart', data.sensex.data, data.sensex.change);
            }

            if (niftyMidcap50) {
                niftyMidcap50.innerHTML = `<span style='font-size: 1.5rem; font-weight: 600;'>${data.nifty_midcap_50.value.toLocaleString()}</span> <span style='font-size: 1rem; color:${data.nifty_midcap_50.change >= 0 ? '#388e3c' : '#d32f2f'}; font-weight: 600;'>${data.nifty_midcap_50.change >= 0 ? '+' : ''}${data.nifty_midcap_50.change} (${data.nifty_midcap_50.percent >= 0 ? '+' : ''}${data.nifty_midcap_50.percent}%)</span>`;
                renderChart('nifty-midcap-chart', data.nifty_midcap_50.data, data.nifty_midcap_50.change);
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
