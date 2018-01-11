const { Pool, Client } = require('pg');
require('dotenv').config();
const btcHistory = require('./BTCUSDHistoricalData.js');
const ethHistory = require('./ETHUSDHistoricalData.js');
const ltcHistory = require('./LTCUSDHistoricalData.js');
const xrpHistory = require('./XRPUSDHistoricalData.js');

const client = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  ssl: true
});

client.connect();

client.query(`CREATE TABLE IF NOT EXISTS coin (
  id int NOT NULL PRIMARY KEY,
  name varchar(50) NOT NULL
)`);

client.query(`insert into coin (id, name) values (${1}, '${'BitCoin'}')`, (err, res) => {
  if (err) {
    console.log('BTC Coin Insertion Error', err);
  }
  console.log('BTC Coin Insertion Success');
});

client.query(`insert into coin (id, name) values (${2}, '${'Ethereum'}')`, (err, res) => {
  if (err) {
    console.log('ETH Coin Insertion Error', err);
  }
  console.log('ETH Coin Insertion Success');
});

client.query(`insert into coin (id, name) values (${3}, '${'LiteCoin'}')`, (err, res) => {
  if (err) {
    console.log('LTC Coin Insertion Error', err);
  }
  console.log('LTC Coin Insertion Success');
});

client.query(`insert into coin (id, name) values (${4}, '${'Ripple'}')`, (err, res) => {
  if (err) {
    console.log('Ripple Coin Insertion Error', err);
  }
  console.log('Ripple Coin Insertion Success');
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
