const express = require('express');

const router = express.Router();
const triviaHelper = require('./TriviaHelper');

router.route('/:id')
  .get(triviaHelper.getTriviaByID);

router.route('/')
  .get(triviaHelper.getRandomTrivia);

module.exports = router;
