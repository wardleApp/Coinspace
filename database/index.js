const { Pool, Client } = require('pg');
require('dotenv').config();

// FOR HEROKU DEPLOYMENT
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
  ssl: true,
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
  ssl: true,
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
<<<<<<< c3c998b4438fd4c0f152649d793e688c77296e7a

=======
>>>>>>> refactor and add default anonymous

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
      `select a.name, b.coin_id, b.price, to_timestamp(time_stamp, 'mm/dd/yy HH24') as date
      from coin a
      inner join price_history b on a.id = b.coin_id
      where to_timestamp(time_stamp, 'mm/dd/yy HH24')
      between current_date - 7 and current_date + 1`,
      (err, res) => {
        if (err) {
          console.log('History err', err);
          return reject(err);
        }
        console.log('Query success');
        return resolve(res.rows);
      });
  });
};

var getMonthData = () => {
  return new Promise(function(resolve, reject) {
    client.query(
      `select a.name, b.coin_id, b.price, to_timestamp(time_stamp, 'mm/dd/yy HH24') as date
      from coin a
      inner join price_history b on a.id = b.coin_id
      where to_timestamp(time_stamp, 'mm/dd/yy HH24')
      between current_date - 30 and current_date + 1`,
      (err, res) => {
        if (err) {
          console.log('History err', err);
          return reject(err);
        }
        console.log('Query success');
        return resolve(res.rows);
      });
  });
};

var getYearData = () => {
  return new Promise(function(resolve, reject) {
    client.query(
      `select a.name, b.coin_id, b.price, to_timestamp(time_stamp, 'mm/dd/yy HH24') as date
      from coin a
      inner join price_history b on a.id = b.coin_id
      where to_timestamp(time_stamp, 'mm/dd/yy HH24')
      between current_date - 365 and current_date + 1`,
      (err, res) => {
        if (err) {
          console.log('History err', err);
          return reject(err);
        }
        console.log('Query success');
        return resolve(res.rows);
      });
  });
};

var insertNewUser = (username, hashedPassword) => {
  return new Promise(function(resolve, reject) {
    client.query(
      `insert into users (email, password) values ('${username}', '${hashedPassword}')`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
  });
};

var findExistingUser = () => {
  return new Promise(function(resolve, reject) {
    client.query(
      `select * from users`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
  });
};

// var getYearData = () => {
//   return new Promise(function(resolve, reject) {
//     client.query(
//       `select a.name, a.coin_id, a.monthName, a.avgMonthPrice from
//       (
//         select a.name, b.coin_id, to_char(to_timestamp(time_stamp, 'mm/dd/yy HH24'), 'Month') as monthName, avg(price) over (partition by to_char(to_timestamp(time_stamp, 'mm/dd/yy HH24'), 'Month')) as avgMonthPrice
//         from coin a
//         inner join price_history b on a.id = b.coin_id
//         where to_timestamp(time_stamp, 'mm/dd/yy HH24')
//         between current_date - 365 and current_date
//       ) as a
//       group by 1, 2, 3, 4
//       order by name, monthName`,
//       (err, res) => {
//         if (err) {
//           console.log('History err', err);
//           return reject(err);
//         }
//         return resolve(res.rows);
//       });
//   });
// };

module.exports = {
  client,
  pool,
  getWeeklyData,
  getMonthData,
  getYearData,
  insertNewUser,
  findExistingUser
};
