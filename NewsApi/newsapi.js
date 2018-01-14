var axios = require('axios');
require('dotenv').config();

/* https://newsapi.org/s/crypto-coins-news-api */

var CryptoNewsAPI = () => {
  return new Promise((resolve, reject) => {
    axios.get(`https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey=${process.env.NEWSAPI}`)
      .then((response) => {
        response = response.data;
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

exports.CryptoNewsAPI = CryptoNewsAPI;