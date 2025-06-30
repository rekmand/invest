document.addEventListener("DOMContentLoaded", () => {
    console.log("Welcome to Rekmand ! Let us know if you need any assistance.");

    // Static demo data for now
    const nifty = { name: 'Nifty 50', value: 23450.25, change: +120.45, percent: +0.52, data: [23200, 23300, 23350, 23400, 23450] };
    const sensex = { name: 'Sensex', value: 78200.10, change: -80.15, percent: -0.10, data: [78300, 78250, 78200, 78250, 78200] };
    const global = { name: 'Global', value: 15500.00, change: +50.00, percent: +0.32, data: [15400, 15450, 15500, 15480, 15500] };

    function setTicker(id, info) {
        const el = document.getElementById(id);
        if (el) {
            el.innerHTML = `<span style='font-weight:600;'>${info.value.toLocaleString()}</span> <span style='color:${info.change>=0?'#388e3c':'#d32f2f'}; font-weight:600;'>${info.change>=0?'+':''}${info.change} (${info.percent>=0?'+':''}${info.percent}%)</span>`;
        }
    }
    setTicker('nifty-ticker', nifty);
    setTicker('sensex-ticker', sensex);
    setTicker('global-ticker', global);

    function renderMiniChart(id, info, color) {
        const options = {
            chart: { type: 'line', height: 80, sparkline: { enabled: true } },
            series: [{ data: info.data }],
            stroke: { width: 3, curve: 'smooth', colors: [color] },
            tooltip: { enabled: false },
            grid: { show: false },
            xaxis: { labels: { show: false } },
            yaxis: { labels: { show: false } },
        };
        const chart = new ApexCharts(document.getElementById(id), options);
        chart.render();
    }
    renderMiniChart('nifty-chart', nifty, '#1976d2');
    renderMiniChart('sensex-chart', sensex, '#d32f2f');
    renderMiniChart('global-chart', global, '#388e3c');
});
