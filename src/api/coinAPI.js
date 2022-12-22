// "use strict";
exports.__esModule = true;
exports.fetchAssets = void 0;
var axios = require('axios');
// Fetch assets from Coin API
var fetchAssets = function () {
    axios.get("https://rest.coinapi.io/v1/assets?", { headers: { "X-CoinAPI-Key": process.env.REACT_APP_COIN_API_KEY } })
        .then(function (response) {
        console.log(response.data);
    });
};
exports.fetchAssets = fetchAssets;
