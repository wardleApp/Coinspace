// const { Pool, Client } = require('pg');
// const connectionString = process.env.DATABASE_URL;


// const pool = new Pool({
//   connectionString: connectionString,
// });

// pool.query('SELECT NOW()', (err, res) => {
//   console.log('Pool Connected');
//   console.log(err, res);
//   pool.end();
// });

// const client = new Client({
//   connectionString: connectionString,
// });
// client.connect();

// client.query('SELECT NOW()', (err, res) => {
//   console.log('Client Connected');
//   console.log(err, res);
//   client.end();
// });


const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'decross',
  host: 'localhost',
  database: 'postgres',
  password: '',
  port: 5432,
});

pool.query('SELECT now()', (err, res) => {
  console.log('Pool Connected');
  // console.log(res);
  // pool.end();
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
  // console.log(res);
  // client.end();
});

client.query('select * from price_history order by coin_id desc limit 1;', (err, res) => {
  // console.log(res.rows);
  console.log(res.rows);
  // client.end();
});

module.exports = {
  client
}
