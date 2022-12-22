const axios = require('axios');

// Fetch assets from Coin API
const fetchAssets = () => {
    axios.get("https://rest.coinapi.io/v1/assets?", { headers: { "X-CoinAPI-Key": process.env.REACT_APP_COIN_API_KEY } })
        .then((response: any) => {
            console.log(response.data)
        })
}

// requestAssets.end();

export { fetchAssets }