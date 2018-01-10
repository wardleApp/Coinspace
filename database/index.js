const { Pool, Client } = require('pg');
const connectionString = process.env.DATABASE_URL;


const pool = new Pool({
  connectionString: connectionString,
});

pool.query('SELECT NOW()', (err, res) => {
  console.log('Pool Connected');
  pool.end();
});

const client = new Client({
  connectionString: connectionString,
});
client.connect();

client.query('SELECT NOW()', (err, res) => {
  console.log('Client Connected');
  client.end();
});

module.exports = {
  client
};
