const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool
  .connect()
  .then(() => console.log('connected to db'))
  .catch(err => console.error('connection error', err.stack));

module.exports = {
  /**
   * DB Query
   * @param {string} text
   * @param {Array} params
   * @returns {object} object
   */
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool.query(text, params)
        .then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
    });
  },
};