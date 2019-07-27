const { pool } = require('./pool');

/**
 * gets a random trivia question
 * @param limit the user's limit from 1 to 10
 * @returns {Promise<void>}
 */
const randomTrivia = async (limit) => {
  const client = await pool.connect();
  try {
    return await client.query(`
      SELECT * 
      FROM trivia_table 
      OFFSET floor(random()*5272)
      LIMIT $1;
    `, [limit]);
  } finally {
    client.release();
  }
};

/**
 * gets random trivia questions based off the
 * category, type, difficulty, and limit.
 * @param category the category.
 * @param type the type (boolean or multiple) ONLY THESE TWO.
 * @param difficulty the difficulty (easy OR medium OR hard OR nothing)
 * @param limit the amount to retrieve from 1 to 10
 * @returns {Promise<void>}
 */
const randomTriviaCatTypeDif = async (category, type, difficulty, limit) => {
  const client = await pool.connect();
  try {
    return await client.query(`
      SELECT * 
      FROM trivia_table 
      WHERE 
        category ILIKE '%' || $1 || '%'
        AND type = $2
        AND difficulty = $3
      ORDER BY random() 
      LIMIT $4;
    `, [category, type, difficulty, limit]);
  } finally {
    client.release();
  }
};

/**
 * gets random trivia questions based off the
 * type, difficulty, and limit.
 * @param category the category.
 * @param difficulty the difficulty (easy OR medium OR hard OR nothing)
 * @param limit the amount to retrieve from 1 to 10
 * @returns {Promise<void>}
 */
const randomTriviaCatDif = async (category, difficulty, limit) => {
  const client = await pool.connect();
  try {
    return await client.query(`
      SELECT * 
      FROM trivia_table 
      WHERE 
        category ILIKE '%' || $1 || '%'
        AND difficulty = $2
      ORDER BY random() 
      LIMIT $3;
    `, [category, difficulty, limit]);
  } finally {
    client.release();
  }
};

/**
 * gets random trivia questions based off the category and limit.
 * @param category the category.
 * @param type the type (boolean or multiple) ONLY THESE TWO.
 * @param limit the amount to retrieve from 1 to 10
 * @returns {Promise<void>}
 */
const randomTriviaCatType = async (category, type, limit) => {
  const client = await pool.connect();
  try {
    return await client.query(`
      SELECT * 
      FROM trivia_table 
      WHERE 
        category ILIKE '%' || $1 || '%'
        AND type = $2
      ORDER BY random() 
      LIMIT $3;
    `, [category, type, limit]);
  } finally {
    client.release();
  }
};

/**
 * gets random trivia questions based off the category and limit.
 * @param category the category.
 * @param limit the amount to retrieve from 1 to 10
 * @returns {Promise<void>}
 */
const randomTriviaCategory = async (category, limit) => {
  const client = await pool.connect();
  try {
    return await client.query(`
      SELECT * 
      FROM trivia_table 
      WHERE 
        category ILIKE '%' || $1 || '%'
      ORDER BY random() 
      LIMIT $2;
    `, [category, limit]);
  } finally {
    client.release();
  }
};

/**
 * gets random trivia questions based off the category and limit.
 * @param type the type (boolean or multiple) ONLY THESE TWO.
 * @param difficulty the difficulty (easy OR medium OR hard OR nothing)
 * @param limit the amount to retrieve from 1 to 10
 * @returns {Promise<void>}
 */
const randomTriviaTypeDif = async (type, difficulty, limit) => {
  const client = await pool.connect();
  try {
    return await client.query(`
      SELECT * 
      FROM trivia_table 
      WHERE 
        type = $1
        AND difficulty = $2
      ORDER BY random() 
      LIMIT $3;
    `, [type, difficulty, limit]);
  } finally {
    client.release();
  }
};

/**
 * gets random trivia questions based off the category and limit.
 * @param difficulty the difficulty (easy OR medium OR hard OR nothing)
 * @param limit the amount to retrieve from 1 to 10
 * @returns {Promise<void>}
 */
const randomTriviaDif = async (difficulty, limit) => {
  const client = await pool.connect();
  try {
    return await client.query(`
      SELECT * 
      FROM trivia_table 
      WHERE difficulty = $1
      ORDER BY random() 
      LIMIT $2;
    `, [difficulty, limit]);
  } finally {
    client.release();
  }
};

/**
 * gets random trivia questions based off the category and limit.
 * @param type the type (boolean or multiple) ONLY THESE TWO.
 * @param limit the amount to retrieve from 1 to 10
 * @returns {Promise<void>}
 */
const randomTriviaType = async (type, limit) => {
  const client = await pool.connect();
  try {
    return await client.query(`
      SELECT * 
      FROM trivia_table 
      WHERE type = $1
      ORDER BY random() 
      LIMIT $2;
    `, [type, limit]);
  } finally {
    client.release();
  }
};

/**
 * gets a random trivia question
 * @param search the phrase to search
 * @param limit the user's limit from 1 to 10
 * @returns {Promise<void>}
 */
const randomTriviaName = async (search, limit) => {
  const client = await pool.connect();
  try {
    return await client.query(`
      SELECT * 
      FROM trivia_table
      WHERE question ILIKE '%' || $1 || '%'
      ORDER BY random()
      LIMIT $2;
    `, [search, limit]);
  } finally {
    client.release();
  }
};

/**
 * gets random trivia questions based off the
 * category, type, difficulty, and limit.
 * @param search the phrase to search.
 * @param category the category.
 * @param type the type (boolean or multiple) ONLY THESE TWO.
 * @param difficulty the difficulty (easy OR medium OR hard OR nothing)
 * @param limit the amount to retrieve from 1 to 10
 * @returns {Promise<void>}
 */
const randomTriviaNameCatTypeDif = async (search, category, type, difficulty, limit) => {
  const client = await pool.connect();
  try {
    return await client.query(`
      SELECT * 
      FROM trivia_table 
      WHERE
        question ILIKE '%' || $1 || '%' 
        AND category ILIKE '%' || $2 || '%'
        AND type = $3
        AND difficulty = $4
      ORDER BY random() 
      LIMIT $5;
    `, [search, category, type, difficulty, limit]);
  } finally {
    client.release();
  }
};

/**
 * gets random trivia questions based off the
 * type, difficulty, and limit.
 * @param search the phrase to search.
 * @param category the category.
 * @param difficulty the difficulty (easy OR medium OR hard OR nothing)
 * @param limit the amount to retrieve from 1 to 10
 * @returns {Promise<void>}
 */
const randomTriviaNameCatDif = async (search, category, difficulty, limit) => {
  const client = await pool.connect();
  try {
    return await client.query(`
      SELECT * 
      FROM trivia_table 
      WHERE 
        question ILIKE '%' || $1 || '%' 
        AND category ILIKE '%' || $2 || '%'
        AND difficulty = $3
      ORDER BY random() 
      LIMIT $4;
    `, [search, category, difficulty, limit]);
  } finally {
    client.release();
  }
};

/**
 * gets random trivia questions based off the category and limit.
 * @param search the phrase to search.
 * @param category the category.
 * @param type the type (boolean or multiple) ONLY THESE TWO.
 * @param limit the amount to retrieve from 1 to 10
 * @returns {Promise<void>}
 */
const randomTriviaNameCatType = async (search, category, type, limit) => {
  const client = await pool.connect();
  try {
    return await client.query(`
      SELECT * 
      FROM trivia_table 
      WHERE 
        question ILIKE '%' || $1 || '%' 
        AND category ILIKE '%' || $2 || '%'
        AND type = $3
      ORDER BY random() 
      LIMIT $4;
    `, [search, category, type, limit]);
  } finally {
    client.release();
  }
};

/**
 * gets random trivia questions based off the category and limit.
 * @param search the phrase to search.
 * @param category the category.
 * @param limit the amount to retrieve from 1 to 10
 * @returns {Promise<void>}
 */
const randomTriviaNameCategory = async (search, category, limit) => {
  const client = await pool.connect();
  try {
    return await client.query(`
      SELECT * 
      FROM trivia_table 
      WHERE 
        question ILIKE '%' || $1 || '%'
        AND category ILIKE '%' || $2 || '%'
      ORDER BY random() 
      LIMIT $3;
    `, [search, category, limit]);
  } finally {
    client.release();
  }
};

/**
 * gets random trivia questions based off the category and limit.
 * @param search the phrase to search.
 * @param type the type (boolean or multiple) ONLY THESE TWO.
 * @param difficulty the difficulty (easy OR medium OR hard OR nothing)
 * @param limit the amount to retrieve from 1 to 10
 * @returns {Promise<void>}
 */
const randomTriviaNameTypeDif = async (search, type, difficulty, limit) => {
  const client = await pool.connect();
  try {
    return await client.query(`
      SELECT * 
      FROM trivia_table 
      WHERE 
        question ILIKE '%' || $1 || '%'
        AND type = $2
        AND difficulty = $3
      ORDER BY random() 
      LIMIT $4;
    `, [search, type, difficulty, limit]);
  } finally {
    client.release();
  }
};

/**
 * gets random trivia questions based off the category and limit.
 * @param search the phrase to search.
 * @param difficulty the difficulty (easy OR medium OR hard OR nothing)
 * @param limit the amount to retrieve from 1 to 10
 * @returns {Promise<void>}
 */
const randomTriviaNameDif = async (search, difficulty, limit) => {
  const client = await pool.connect();
  try {
    return await client.query(`
      SELECT * 
      FROM trivia_table 
      WHERE 
        question ILIKE '%' || $1 || '%'
        AND difficulty = $2
      ORDER BY random() 
      LIMIT $3;
    `, [search, difficulty, limit]);
  } finally {
    client.release();
  }
};

/**
 * gets random trivia questions based off the category and limit.
 * @param search the phrase to search.
 * @param type the type (boolean or multiple) ONLY THESE TWO.
 * @param limit the amount to retrieve from 1 to 10
 * @returns {Promise<void>}
 */
const randomTriviaNameType = async (search, type, limit) => {
  const client = await pool.connect();
  try {
    return await client.query(`
      SELECT * 
      FROM trivia_table 
      WHERE 
        question ILIKE '%' || $1 || '%'
        AND type = $1
      ORDER BY random() 
      LIMIT $3;
    `, [search, type, limit]);
  } finally {
    client.release();
  }
};


module.exports = {
  randomTrivia,
  randomTriviaCatTypeDif,
  randomTriviaCatDif,
  randomTriviaCatType,
  randomTriviaCategory,
  randomTriviaTypeDif,
  randomTriviaDif,
  randomTriviaType,
  randomTriviaName,
  randomTriviaNameCatTypeDif,
  randomTriviaNameCatDif,
  randomTriviaNameCatType,
  randomTriviaNameCategory,
  randomTriviaNameTypeDif,
  randomTriviaNameDif,
  randomTriviaNameType,
};
