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
  console.log(res);
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
  console.log(res);
  client.end();
});

client.

