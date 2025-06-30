document.addEventListener("DOMContentLoaded", () => {
    console.log("Welcome to Rekmand ! Let us know if you need any assistance.");

    fetch("/api/market")
        .then(res => res.json())
        .then(data => {
            // Nifty
            const nifty = data.nifty ? {
                name: 'Nifty 50',
                value: data.nifty.last,
                change: data.nifty.change,
                percent: data.nifty.percentChange,
                data: [] // You can add chart data if available
            } : null;
            // Sensex
            const sensex = data.sensex ? {
                name: 'Sensex',
                value: parseFloat(data.sensex.sensexValue.replace(/,/g, '')),
                change: parseFloat(data.sensex.change.replace(/,/g, '')),
                percent: 0, // Not available in current scrape
                data: []
            } : null;
            // Global (placeholder)
            const global = { name: 'Global', value: 15500.00, change: +50.00, percent: +0.32, data: [15400, 15450, 15500, 15480, 15500] };

            function setTicker(id, info) {
                const el = document.getElementById(id);
                if (el && info) {
                    el.innerHTML = `<span style='font-weight:600;'>${info.value?.toLocaleString()}</span> <span style='color:${info.change>=0?'#388e3c':'#d32f2f'}; font-weight:600;'>${info.change>=0?'+':''}${info.change} ${info.percent?`(${info.percent>=0?'+':''}${info.percent}%)`:''}</span>`;
                }
            }
            setTicker('nifty-ticker', nifty);
            setTicker('sensex-ticker', sensex);
            setTicker('global-ticker', global);

            function renderMiniChart(id, info, color) {
                const options = {
                    chart: { type: 'line', height: 80, sparkline: { enabled: true } },
                    series: [{ data: info.data && info.data.length ? info.data : [info.value] }],
                    stroke: { width: 3, curve: 'smooth', colors: [color] },
                    tooltip: { enabled: false },
                    grid: { show: false },
                    xaxis: { labels: { show: false } },
                    yaxis: { labels: { show: false } },
                };
                const chart = new ApexCharts(document.getElementById(id), options);
                chart.render();
            }
            if (nifty) renderMiniChart('nifty-chart', nifty, '#1976d2');
            if (sensex) renderMiniChart('sensex-chart', sensex, '#d32f2f');
            renderMiniChart('global-chart', global, '#388e3c');
        })
        .catch(err => {
            document.getElementById('nifty-ticker').innerText = 'Error loading data';
            document.getElementById('sensex-ticker').innerText = 'Error loading data';
            document.getElementById('global-ticker').innerText = 'Error loading data';
        });
});
