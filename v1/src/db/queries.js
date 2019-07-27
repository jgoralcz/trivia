const { pool } = require('./pool');
const {
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
} = require('./QueryHelper.js');
const { maxQuestions, minQuestions } = require('../../config.json'); // 10, 1

// insert normal trivia
// const insertTrivia = async (trivia) => {
//   const client = await pool.connect();
//   try {
//     return await client.query(`
//       INSERT INTO trivia_table (question, category, type, difficulty, correct_answer, incorrect_answers)
//       VALUES ($1, $2, $3, $4, $5, $6)
//       ON CONFLICT(question) DO UPDATE
//       SET category = $2, type = $3, difficulty = $4, correct_answer = $5, incorrect_answers = $6;
//     `, [trivia.question, trivia.category, trivia.type, trivia.difficulty, trivia.correct_answer, trivia.incorrect_answers]);
//   } finally {
//     client.release();
//   }
// };

/**
 * gets a random trivia question.
 * @returns {Promise<*>}
 */
const getTriviaByID = async (id) => {
  const client = await pool.connect();
  try {
    return await client.query(`
      SELECT * 
      FROM trivia_table 
      WHERE id = $1;
    `, [id]);
  } finally {
    client.release();
  }
};

/**
 * gets a random trivia, based off the category, type, difficulty, and limit.
 * @param category the category.
 * @param type the type (boolean or multiple) ONLY THESE TWO.
 * @param difficulty the difficulty (easy OR medium OR hard OR nothing)
 * @param limit the amount to retrieve from 1 to 10
 * @returns {Promise<void>}
 */
const getRandomTrivia = async (category, type, difficulty, limit) => {
  const verifiedLimit = (limit != null && !isNaN(limit)
    && limit <= maxQuestions && limit >= minQuestions) ? limit : 1;

  // check if they want a category
  if (category != null) {
    if (type != null && difficulty != null) { // category, difficulty, and type
      return randomTriviaCatTypeDif(category, type, difficulty, verifiedLimit);
    } if (difficulty != null) { // category and difficulty
      return randomTriviaCatDif(category, difficulty, verifiedLimit);
    } if (type != null) { // category and type
      return randomTriviaCatType(category, type, verifiedLimit);
    } // just category
    return randomTriviaCategory(category, verifiedLimit);
  } if (type != null) { // type
    if (difficulty != null) { // type and difficulty
      return randomTriviaTypeDif(type, difficulty, verifiedLimit);
    } // just type
    return randomTriviaType(type, verifiedLimit);
  } if (difficulty != null) { // just difficulty
    return randomTriviaDif(difficulty, verifiedLimit);
  }
  return randomTrivia(verifiedLimit);
};


/**
 * search for trivia questions
 * @param name the name to search for in the question.
 * @param category the category.
 * @param type the type (boolean or multiple) ONLY THESE TWO.
 * @param difficulty the difficulty (easy OR medium OR hard OR nothing)
 * @param limit the amount to retrieve from 1 to 10
 * @returns {Promise<void>}
 */
const searchTriviaQuestions = async (name, category, type, difficulty, limit) => {
  const verifiedLimit = (limit != null && !isNaN(limit)
    && limit <= maxQuestions && limit >= minQuestions) ? limit : 1;

  // check if they want a category
  if (category != null) {
    if (type != null && difficulty != null) { // category, difficulty, and type
      return randomTriviaNameCatTypeDif(name, category, type, difficulty, verifiedLimit);
    } if (difficulty != null) { // category and difficulty
      return randomTriviaNameCatDif(name, category, difficulty, verifiedLimit);
    } if (type != null) { // category and type
      return randomTriviaNameCatType(name, category, type, verifiedLimit);
    } // just category
    return randomTriviaNameCategory(name, category, verifiedLimit);
  } if (type != null) { // type
    if (difficulty != null) { // type and difficulty
      return randomTriviaNameTypeDif(name, type, difficulty, verifiedLimit);
    } // just type
    return randomTriviaNameType(name, type, verifiedLimit);
  } if (difficulty != null) { // just difficulty
    return randomTriviaNameDif(name, difficulty, verifiedLimit);
  }
  return randomTriviaName(name, verifiedLimit);
};

module.exports = {
  getTriviaByID,
  getRandomTrivia,
  searchTriviaQuestions,
};
