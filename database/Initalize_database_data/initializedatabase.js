const { Pool, Client } = require('pg');
require('dotenv').config();
const btcHistory = require('./BTCUSDHistoricalData.js');
const ethHistory = require('./ETHUSDHistoricalData.js');
const ltcHistory = require('./LTCUSDHistoricalData.js');
const xrpHistory = require('./XRPUSDHistoricalData.js');

// FOR REAL LIFE HEROKU DEPLOYMENT
const client = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  ssl: true
});

// FOR LOCAL DATABASE TESTING
// const client = new Client({
//   user: 'dillonlin',
//   host: 'localhost',
//   database: 'coinspace',
//   password: '',
//   ssl: false,
// });

client.connect();

client.query(`CREATE TABLE IF NOT EXISTS coin (
  id int NOT NULL PRIMARY KEY,
  name varchar(50) NOT NULL
)`);

const coins = ['BitCoin', 'Ethereum', 'LiteCoin', 'Ripple'];

coins.forEach((coin, index) => {
  client.query(`insert into coin (id, name) values (${index + 1}, '${coin}')`, (err, res) => {
    if (err) {
      console.log(`${coin} Insertion Error`, err);
    }
    console.log(`${coin} Insertion Success`);
  });
});

client.query(`CREATE TABLE IF NOT EXISTS price_history (
  id serial PRIMARY KEY,
  coin_id int NOT NULL,
  time_stamp varchar(50) NOT NULL,
  price decimal NOT NULL
)`);

btcHistory.map((dateObj) => {
  let date = dateObj.Date;
  let coinId = 1;
  let price = dateObj.Open;
  client.query(`insert into price_history (coin_id, time_stamp, price) values (${coinId}, '${date} 12', ${price})`
    , (err, res) => {
      if (err) {
        console.log('Insertion Error', err);
      }
      console.log('BTC Daily Data Insertion Success');
    });
});

ethHistory.map((dateObj) => {
  let date = dateObj.Date;
  let coinId = 2;
  let price = dateObj.Open;
  client.query(`insert into price_history (coin_id, time_stamp, price) values (${coinId}, '${date} 12', ${price})`
    , (err, res) => {
      if (err) {
        console.log('Insertion Error', err);
      }
      console.log('ETH Daily Data Insertion Success');
    });
});

ltcHistory.map((dateObj) => {
  let date = dateObj.Date;
  let coinId = 3;
  let price = dateObj.Open;
  client.query(`insert into price_history (coin_id, time_stamp, price) values (${coinId}, '${date} 12', ${price})`
    , (err, res) => {
      if (err) {
        console.log('Insertion Error', err);
      }
      console.log('LTC Daily Data Insertion Success');
    });
});

xrpHistory.map((dateObj) => {
  let date = dateObj.Date;
  let coinId = 4;
  let price = dateObj.Open;
  client.query(`insert into price_history (coin_id, time_stamp, price) values (${coinId}, '${date} 12', ${price})`
    , (err, res) => {
      if (err) {
        console.log('Insertion Error', err);
      }
      console.log('XRP Daily Data Insertion Success');
    });
});
