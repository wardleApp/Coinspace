const { Pool, Client } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  ssl: true, 
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log('Pool Connection Error', err);
  }
  console.log('Pool Connected');
});

const client = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  ssl: true, 
});
client.connect();

client.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log('Client Connection Error', err);
  }
  console.log('Client Connected');
});

var getMonthData = () => {
  return new Promise(function(resolve, reject) {
    client.query("select coin_id, price from price_history where to_date(time_stamp, 'mm/dd/yy') between current_date - 30 and current_date", (err, res) => {
      if (err) {
        console.log('History err', err);
        return reject(err);
      }
      console.log('Query success', res);
      return resolve(res.rows);
    });
  });
};

module.exports = {
  client, 
  pool, 
  getMonthData
};