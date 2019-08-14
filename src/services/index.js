const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: 'postgres://postgres:anuoluwa@127.0.0.1:5432/barefoot_nomad',
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const createTable = () => {
  // users
  const Users = `CREATE TABLE IF NOT EXISTS 
  users (
    user_id SERIAL PRIMARY KEY,
   )`;

  pool.query(Users).then((res) => {
    console.log(res);
    console.log('users');
    pool.end();
  }).catch((err) => {
    console.log(err);
    pool.end();
  });
};


pool.on('remove', () => {
  console.log();
  process.exit(0);
});

module.exports = createTable;

require('make-runnable');
