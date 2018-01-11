const express = require('express');
const bodyParser = require('body-parser');
const cryptoAPI = require('../BitFinexAPI/BitFinexAPI.js');
const CronJob = require('cron').CronJob;
const moment = require('moment');
const db = require('../database/index.js');
const favicon = require('express-favicon');
const socket = require('socket.io');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(favicon(__dirname + '/../client/dist/img/favicon.ico'));

app.use(express.static(__dirname + '../../client/dist'));

new CronJob('*/30 * * * *', () => {
// API call
  cryptoAPI.BitfinexAPI()
    .then((data) => {
      console.log('This is the data', data);
      let now = moment(new Date()).format(`MM/DD/YYYY HH`);
      Promise.all(data.map((coin, index) => {
        // then write to dB
        return db.client.query(`insert into price_history (coin_id, time_stamp, price) values (${index + 1}, '${now}', ${coin[1]})`);
      })).then(result => {
        console.log('insert sucess', result);
      }).catch(err => {
        console.log('insert err', err);
      });
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
}, null, true, 'America/Los_Angeles');

app.get('/update', (req, res) => {
  // front end has cronJob to ask for new update every half hour
  // Read from db and then respond with latest prices
  db.client.query(`select *, to_timestamp(time_stamp, 'MM/DD/YY HH24') as new_date from price_history order by new_date desc limit 4`)
    .then(results => {
      res.json(results);
    }).catch(err => {
      console.log('get current price err', err);
    });
});

app.get('/init', (req, res) => {
  // load historical data into client
  var initialLoadObject = {};
  db.getYearData()
  .then(results => {
    initialLoadObject.yearlyData = results;
  })
  .then(() => {
    db.getMonthData()
    .then(results => {
      initialLoadObject.monthlyData = results;
    })
    .then(() => {
      db.getWeeklyData()
      .then(results => {
        initialLoadObject.weeklyData = results;
      })
      .then(() => {
        // console.log('THIS IS INITIALLOADOBJECT', initialLoadObject);
        res.json(initialLoadObject);
      })
    })
  })
  .catch(err => {
    console.log('init err', err);
  });
});

const port = process.env.SERVER_PORT || 3000;

const server = app.listen(port, () => {
  console.log(`server, listening on port ${port}`);
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log(socket.id);
  socket.on('message', function(data){
    console.log(data);
    io.emit('new message', data);
  });
});

module.exports = app;
