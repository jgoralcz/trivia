const router = require('express-promise-router')();

const { getTriviaByID, getRandomTrivia } = require('../handlers');

router.get('/:id', getTriviaByID);
router.get('/', getRandomTrivia);

module.exports = router;
