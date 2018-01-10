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

var getWeeklyData = () => {
  return new Promise(function(resolve, reject) {
    client.query(
      `select a.name, b.coin_id, b.price 
      from coin a
      inner join price_history b on a.id = b.coin_id
      where to_date(time_stamp, 'mm/dd/yy') 
      between current_date - 7 and current_date`, 
      (err, res) => {
        if (err) {
          console.log('History err', err);
          return reject(err);
        }
        console.log('Query success', res);
        return resolve(res.rows);
      });
  });
};

var getMonthData = () => {
  return new Promise(function(resolve, reject) {
    client.query(
      `select a.name, b.coin_id, b.price 
      from coin a
      inner join price_history b on a.id = b.coin_id
      where to_date(time_stamp, 'mm/dd/yy') 
      between current_date - 30 and current_date`, 
      (err, res) => {
        if (err) {
          console.log('History err', err);
          return reject(err);
        }
        console.log('Query success', res);
        return resolve(res.rows);
      });
  });
};

var getYearData = () => {
  return new Promise(function(resolve, reject) {
    client.query(
      `select a.name, a.coin_id, a.monthName, a.avgMonthPrice from 
      (
        select a.name, b.coin_id, to_char(to_date(time_stamp, 'mm/dd/yy'), 'Month') as monthName, avg(price) over (partition by to_char(to_date(time_stamp, 'mm/dd/yy'), 'Month')) as avgMonthPrice
        from coin a
        inner join price_history b on a.id = b.coin_id
        where to_date(time_stamp, 'mm/dd/yy') 
        between current_date - 365 and current_date
      ) as a
      group by 1, 2, 3, 4 
      order by name, monthName`, 
      (err, res) => {
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
  getWeeklyData, 
  getMonthData, 
  getYearData
};