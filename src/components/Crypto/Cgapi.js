const CoinGecko = require('coingecko-api')

const CoinGeckoClient = new CoinGecko();

const APICall = async () => {
    let data = await CoinGeckoClient.ping();

    console.log(data)
};

export { APICall }