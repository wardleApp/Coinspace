const { Pool, Client } = require('pg');
require('dotenv').config();

// FOR HEROKU DEPLOYMENT
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
  // ssl: true,
});

// FOR LOCAL DATABASE TESTING
// const pool = new Pool({
//   user: 'dillonlin',
//   host: 'localhost',
//   database: 'coinspace',
//   password: '',
//   port: 5432,
//   ssl: false,
// });

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log('Pool Connection Error', err);
  }
  console.log('Pool Connected');
});

// FOR HEROKU DEPLOYMENT
const client = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
  // ssl: true,
});

// FOR LOCAL DATABASE TESTING
// const client = new Client({
//   user: 'dillonlin',
//   host: 'localhost',
//   database: 'coinspace',
//   password: '',
//   port: 5432,
//   ssl: false,
// });

client.connect();

client.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log('Client Connection Error', err);
  }
  console.log('Client Connected');
});

var getData = () => {
  return new Promise((resolve, reject) => {
    client.query(
      `select a.name, b.coin_id, b.price, to_timestamp(time_stamp, 'mm/dd/yy HH24') as date
      from coin a
      inner join price_history b on a.id = b.coin_id`,
      // where to_timestamp(time_stamp, 'mm/dd/yy HH24')
      // between current_date - ${time} and current_date + 1`,
      (err, res) => {
        if (err) {
          console.log('History err', err);
          reject(err);
        }
        console.log('Query success');
        resolve(res.rows);
      });
    });
};

var insertNewUser = (username, hashedPassword) => {
  return new Promise(function(resolve, reject) {
    client.query(
      `insert into users (email, password) values ('${username}', '${hashedPassword}')`, (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res.rows);
      });
  });
};

var findExistingUser = () => {
  return new Promise(function(resolve, reject) {
    client.query(
      `select * from users`, (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res.rows);
      });
  });
};

module.exports = {
  client,
  pool,
  getData,
  insertNewUser,
  findExistingUser
};
