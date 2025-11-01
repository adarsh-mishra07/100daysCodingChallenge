const btn = document.getElementById("getPriceBtn");
const input = document.getElementById("cryptoInput");
const priceInfo = document.getElementById("priceInfo");
const ctx = document.getElementById('priceChart').getContext('2d');
let chart;

btn.addEventListener("click", async () => {
    const coin = input.value.trim().toLowerCase();
    if (!coin) {
        alert("Please enter a coin name!");
        return;
    }

    priceInfo.innerHTML = "Loading...";

    try {
        // Fetch current price
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}`);
        if (!response.ok) throw new Error("Coin not found!");
        const data = await response.json();

        const price = data.market_data.current_price.usd;
        const high = data.market_data.high_24h.usd;
        const low = data.market_data.low_24h.usd;

        priceInfo.innerHTML = `
      <h3>${data.name} (${data.symbol.toUpperCase()})</h3>
      <p>💲 Current Price: $${price}</p>
      <p>📈 24h High: $${high}</p>
      <p>📉 24h Low: $${low}</p>
    `;

        // Prepare chart data
        const timestamps = [];
        const prices = [];

        // Use last 7 days prices (daily)
        const historyRes = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=7`);
        const historyData = await historyRes.json();

        historyData.prices.forEach(p => {
            const date = new Date(p[0]);
            timestamps.push(`${date.getDate()}/${date.getMonth() + 1}`);
            prices.push(p[1]);
        });

        // Destroy old chart if exists
        if (chart) chart.destroy();

        // Draw chart
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: timestamps,
                datasets: [{
                    label: `${data.name} Price ($) Last 7 Days`,
                    data: prices,
                    borderColor: 'blue',
                    fill: false
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: { display: true },
                    y: { display: true }
                }
            }
        });

    } catch (error) {
        priceInfo.innerHTML = `<p style="color:red;">${error.message}</p>`;
        console.error(error);
    }
});
