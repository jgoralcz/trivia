const { Pool } = require('pg');
const logger = require('log4js').getLogger();

const { api } = require('../util/constants/paths');
const { db } = require(api);

const pool = new Pool(db);

pool.on('error', (error) => {
  logger.error(error);
});

const poolQuery = async (query, paramsArray) => {
  const client = await pool.connect();
  try {
    const result = await client.query(query, paramsArray);
    if (!result || !result.rows || !result.rowCount || result.rows.length <= 0) return undefined;

    return result.rows;
  } catch (error) {
    logger.error(error);
  } finally {
    client.release();
  }
  return undefined;
};

module.exports = {
  poolQuery,
};
