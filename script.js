// Function to create and render the CoinGecko token widget
function renderCoinGeckoWidget(tokenName) {
    const widgetContainer = document.getElementById('coin-widget');
    
    // Make an API request to CoinGecko to fetch token details and logo
    fetch(`https://api.coingecko.com/api/v3/coins/${tokenName}`)
        .then(response => response.json())
        .then(data => {
            const tokenDetails = data;
            if (tokenDetails) {
                const widgetHTML = `
                    <div class="token-details">
                    <div class="token-image-name">
                    <img src="${tokenDetails.image.small}" alt="${tokenName} Logo">    
                    <h2>${tokenName} Token</h2>
                        
                    </div>
                    <div class ="token-data">
                        <p>Price: $${tokenDetails.market_data.current_price.usd}</p>
                        <p>Market Cap: $${tokenDetails.market_data.market_cap.usd}</p>
                        <p>24hr Trading Volume: $${tokenDetails.market_data.total_volume.usd}</p>
                    </div>
                    </div>
                `;
                widgetContainer.innerHTML = widgetHTML;
                widgetContainer.classList.remove('hidden');
            } else {
                widgetContainer.innerHTML = 'Token not found';
                widgetContainer.classList.remove('hidden');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            widgetContainer.innerHTML = 'Error fetching data';
            widgetContainer.classList.remove('hidden');
        });
}

// Fetch button click event
document.getElementById('fetch-button').addEventListener('click', () => {
    const tokenName = document.getElementById('token-name').value.trim();
    if (tokenName) {
        renderCoinGeckoWidget(tokenName);
    }
});