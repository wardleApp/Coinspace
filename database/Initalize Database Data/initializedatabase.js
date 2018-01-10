const { Pool, Client } = require('pg');
const btcHistory = require('./BTCUSDHistoricalData.js');
const ethHistory = require('./ETHUSDHistoricalData.js');
const ltcHistory = require('./LTCUSDHistoricalData.js');
const xrpHistory = require('./XRPUSDHistoricalData.js');

const client = new Client({
  user: 'phtdwlpkawbshv',
  host: 'ec2-23-21-246-25.compute-1.amazonaws.com',
  database: 'd3so2vpgo9l9f1',
  password: '459bfdb9f90b71503b1d7c3d5b2bd924f34022ca44f2a06ae7ccc2e5d50d4ff5',
  port: 5432,
});
client.connect();

btcHistory.map((dateObj) => {
  let date = dateObj.Date;
  let coinId = 1;
  let price = dateObj.Open;
  console.log('date', date);
  client.query(`insert into price_history (coin_id, time_stamp, price) values (${coinId}, '${date}', ${price})`
    , (err, res) => {
      if (err) {
        console.log('Insertion Error', err);
      }
      console.log('Insertion Success', res);
    });
});

ethHistory.map((dateObj) => {
  let date = dateObj.Date;
  let coinId = 2;
  let price = dateObj.Open;
  console.log('date', date);
  client.query(`insert into price_history (coin_id, time_stamp, price) values (${coinId}, '${date}', ${price})`
    , (err, res) => {
      if (err) {
        console.log('Insertion Error', err);
      }
      console.log('Insertion Success', res);
    });
});

ltcHistory.map((dateObj) => {
  let date = dateObj.Date;
  let coinId = 3;
  let price = dateObj.Open;
  console.log('date', date);
  client.query(`insert into price_history (coin_id, time_stamp, price) values (${coinId}, '${date}', ${price})`
    , (err, res) => {
      if (err) {
        console.log('Insertion Error', err);
      }
      console.log('Insertion Success', res);
    });
});

xrpHistory.map((dateObj) => {
  let date = dateObj.Date;
  let coinId = 4;
  let price = dateObj.Open;
  console.log('date', date);
  client.query(`insert into price_history (coin_id, time_stamp, price) values (${coinId}, '${date}', ${price})`
    , (err, res) => {
      if (err) {
        console.log('Insertion Error', err);
      }
      console.log('Insertion Success', res);
    });
});
