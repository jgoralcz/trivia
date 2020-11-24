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
} = require('./trivia');

const { config } = require('../util/constants/paths');
const { maxQuestions, minQuestions } = require(config); // 10, 1

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

const getTriviaByID = async (id) => getTriviaByIDQuery(id);

/**
 * gets a random trivia, based off the category, type, difficulty, and limit.
 * @param category the category.
 * @param type the type (boolean or multiple) ONLY THESE TWO.
 * @param difficulty the difficulty (easy OR medium OR hard OR nothing)
 * @param limit the amount to retrieve from 1 to 10
 * @returns {Promise<void>}
 */
const getRandomTrivia = async (category, type, difficulty, limit) => {
  const verifiedLimit = (limit && !isNaN(limit) && limit <= maxQuestions && limit >= minQuestions) ? limit : 1;

  // check if they want a category
  if (category != null) {
    // category, difficulty, and type
    if (type != null && difficulty != null) {
      return randomTriviaCatTypeDif(category, type, difficulty, verifiedLimit);
    }

    // category and difficulty
    if (difficulty != null) {
      return randomTriviaCatDif(category, difficulty, verifiedLimit);
    }

    // category and type
    if (type != null) {
      return randomTriviaCatType(category, type, verifiedLimit);
    }

    // just category
    return randomTriviaCategory(category, verifiedLimit);
  }

  // type
  if (type != null) {
    // type and difficulty
    if (difficulty != null) {
      return randomTriviaTypeDif(type, difficulty, verifiedLimit);
    }

    // just type
    return randomTriviaType(type, verifiedLimit);
  }

  // just difficulty
  if (difficulty != null) {
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
    // category, difficulty, and type
    if (type != null && difficulty != null) {
      return randomTriviaNameCatTypeDif(name, category, type, difficulty, verifiedLimit);
    }

    // category and difficulty
    if (difficulty != null) {
      return randomTriviaNameCatDif(name, category, difficulty, verifiedLimit);
    }

    // category and type
    if (type != null) {
      return randomTriviaNameCatType(name, category, type, verifiedLimit);
    }

    // just category
    return randomTriviaNameCategory(name, category, verifiedLimit);
  }

  // type
  if (type != null) {
    // type and difficulty
    if (difficulty != null) {
      return randomTriviaNameTypeDif(name, type, difficulty, verifiedLimit);
    }
    // just type
    return randomTriviaNameType(name, type, verifiedLimit);
  }

  // just difficulty
  if (difficulty != null) {
    return randomTriviaNameDif(name, difficulty, verifiedLimit);
  }

  return randomTriviaName(name, verifiedLimit);
};

module.exports = {
  getTriviaByID,
  getRandomTrivia,
  searchTriviaQuestions,
};
