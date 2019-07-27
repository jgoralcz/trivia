const { Pool } = require('pg');
const {
  db: {
    user,
    host,
    database,
    password,
    port,
    max,
    connectionTimeoutMillis,
    idleTimeoutMillis,
  },
} = require('../../config.json');

const pool = new Pool({
  user,
  host,
  database,
  password,
  port,
  max,
  connectionTimeoutMillis,
  idleTimeoutMillis,
});

module.exports = pool;
