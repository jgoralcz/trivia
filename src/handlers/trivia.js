const db = require('../db/queries');

const getTriviaByID = async (req, res) => {
  const { id } = req.params;

  // TODO: use ajv? that'd be lit
  if (id == null || isNaN(id)) {
    return res.status(400).send({ error: `${id} is not a valid id.`, status: 400 });
  }

  const rows = await db.getTriviaByID(id);
  if (!rows || rows.length <= 0) {
    return res.status(400).send({ error: `could not find a trivia by id ${id}`, status: 404 });
  }

  return res.status(200).send(rows);
};

const getRandomTrivia = async (req, res) => {
  const {
    search,
    category,
    type,
    difficulty,
    limit,
  } = req.query;

  if (search) {
    const rows = await db.searchTriviaQuestions(search, category, type, difficulty, limit);
    return res.status(200).send(rows);
  }

  const rows = await db.getRandomTrivia(category, type, difficulty, limit);
  if (!rows || rows.length <= 0) {
    return res.status(400).send({ error: `error fetching random trivia question with limit: ${limit}`, status: 400 });
  }

  return res.status(200).send(rows);
};

module.exports = {
  getTriviaByID,
  getRandomTrivia,
};
