const express = require('express');
const bodyParser = require('body-parser');
const cryptoAPI = require('../BitFinexAPI/BitFinexAPI.js');
// const CronJob = require('cron').CronJob;
const moment = require('moment');
const db = require('../database/index.js').client;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

// new CronJob('*/30 * * * *', () => {
// API call
cryptoAPI.BitfinexAPI()
  .then((data) => {
    console.log('This is the data', data);
    Promise.all(data.map((coin, index) => {
      // then write to dB
      let now = moment(new Date()).format(`MM/DD/YYYY`);
      return db.query(`insert into price_history (coin_id, time_stamp, price) values (${index + 1}, ${now}, ${coin[1]})`)
        .then(result => {
          console.log('insert sucess', result);
        })
        .catch(err => {
          console.log('insert err', err);
        });
    }));
  }).catch(err => {
    console.log('api err', err);
  });

// sample result [[ 'tBTCUSD', // SYMBOL
//                 14721, // BID
//                 192.76423686, // BID_SIZE
//                 14722, // ASK
//                 51.69043092, // ASK_SIZE
//                 -348.49653855, // DAILY_CHANGE
//                 -0.0231, // DAILY_CHANGE_PERC
//                 14719.50346145, // LAST_PRICE
//                 45888.69199867, // VOLUME
//                 15355, // HIGH
//                 14122 // LOW]]
// }, null, true, 'America/Los_Angeles');

app.get('/update', (req, res) => {
  // front end has cronJob to ask for new update every half hour
  // Read from db and then respond with latest prices
  db.query(`select *, to_date(time_stamp, 'MM/DD/YYYY') as new_date from price_history order by new_date desc limit 3`)
    .then(results => {
      // TO DO
    }).catch(err => {
      console.log('get current price err', err);
    });
});

app.get('/init', (req, res) => {
  // load historical data into client
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
