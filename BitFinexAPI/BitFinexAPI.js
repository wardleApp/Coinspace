var axios = require('axios');

var BitfinexAPI = () => {
	return new Promise(function(resolve, reject) {
		axios.get(`https://api.bitfinex.com/v2/tickers?symbols=tBTCUSD,tETHUSD,tXRPUSD,tLTCUSD`)
		.then(function(response) {
			response = response.data;
			resolve(response)
		})
		.catch((error) => {
			reject(error)
		})
	})
};

exports.BitfinexAPI = BitfinexAPI
