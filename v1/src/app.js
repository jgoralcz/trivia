const express = require('express');
const bodyParser = require('body-parser');
const triviaController = require('./trivia/TriviaController');
require('./db/pool');

/**
 * app configuration for express.
 * We need to use a json.
 * @type {Function|*}
 */
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/v1/trivia', triviaController);

module.exports = app;
