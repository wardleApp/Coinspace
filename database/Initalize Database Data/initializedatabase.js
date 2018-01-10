const { Pool, Client } = require('pg');
const btcHistory = './BTCUSDHistoricalData.js';
const ethHistory = './ETHUSDHistoricalData.js';
const ltcHistory = './LTCUSDHistoricalData.js';
const xrpHistory = './XRPUSDHistoricalData.js';

const pool = new Pool({
  user: 'decross',
  host: 'localhost',
  database: 'postgres',
  password: '',
  port: 5432,
});

pool.query('SELECT now()', (err, res) => {
  console.log('Pool Connected');
  pool.end();
});

const client = new Client({
  user: 'decross',
  host: 'localhost',
  database: 'postgres',
  password: '',
  port: 5432,
});
client.connect();

client.query('SELECT now()', (err, res) => {
  console.log('Client Connected');
  console.log(btcHistory);
  client.end();
});


