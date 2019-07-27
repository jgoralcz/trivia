const db = require('../db/queries.js');
const { maxQuestions, minQuestions } = require('../../config.json'); // 10, 1

/**
 * Gets the user's request based off an ID.
 * @param req the user's request.
 * @param res my response.
 * @returns {Promise<void>}
 */
const getTriviaByID = async (req, res) => {
  const { id } = req.params;

  if (id != null && !isNaN(id)) {
    try {
      const triviaQuery = await db.getTriviaByID(id);
      if (triviaQuery.rowCount > 0) {
        res.status(200)
          .contentType('application/json')
          .send(triviaQuery.rows);
      } else {
        res.status(400)
          .contentType('application/json')
          .send('{ "error": "Not a valid ID." }');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500)
        .contentType('application/json')
        .send('{ "error": "Internal error fetching trivia question by ID." }');
    }
  }
};
/**
 * Gets a random trivia question
 * @param req the user's request.
 * @param res the user's response.
 * @returns {Promise<void>}
 */
const getRandomTrivia = async (req, res) => {
  // search, limit, nsfw, queries.
  const { name, category, type, difficulty } = req.query;
  let { limit } = req.query;

  // check limit, max of 10, min of 1
  if (limit != null && !isNaN(limit)) {
    const limitInt = parseInt(limit, 10);
    if (limitInt > maxQuestions) {
      limit = maxQuestions;
    } else if (limitInt < 0) {
      limit = minQuestions;
    }
  } else {
    limit = maxQuestions;
  }

  // search for trivia question with this name
  if (name != null) {
    try {
      const triviaQuery = await db.searchTriviaQuestions(name, category, type, difficulty, limit);
      res.status(200)
        .contentType('application/json')
        .send(triviaQuery.rows);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500)
        .contentType('application/json')
        .send(`{ "error": "Internal error searching for trivia question with name: ${name}, limit: ${limit}" }`);
    }
  } else { // default show random
    try {
      const triviaQuery = await db.getRandomTrivia(category, type, difficulty, limit);
      if (triviaQuery.rowCount > 0) {
        res.status(200)
          .contentType('application/json')
          .send(triviaQuery.rows);
      } else {
        res.status(400)
          .contentType('application/json')
          .send(`{ "error": "Error fetching random trivia question with limit: ${limit}." }`);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500)
        .contentType('application/json')
        .send(`{ "error": "Internal error fetching random trivia question with limit: ${limit}." }`);
    }
  }
};

module.exports = {
  getTriviaByID,
  getRandomTrivia,
};
