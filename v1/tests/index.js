const rp = require('request-promise');
const assert = require('assert');
const index = require('../src/server.js');
const { port } = require('../config.json');

const testPhrases = [
  // search term
  'search=cat&category=entertainment&type=boolean&difficulty=easy&limit=5',
  'search=a&category=entertainment&type=boolean&difficulty=medium&limit=5',
  'search=the&category=entertainment&type=boolean&difficulty=hard&limit=5',
  'search=apple&category=entertainment&difficulty=medium&limit=5',
  'search=half&category=history&type=multiple&limit=1',
  'search=cat&category=celebrities&type=boolean&limit=1',
  'search=help&category=history',
  'search=me&type=multiple',
  'search=hello&type=multiple&difficulty=hard',
  'search=how&type=multiple&difficulty=medium',
  'search=are&type=multiple&difficulty=easy',
  'search=you&difficulty=easy',
  'search=doing&difficulty=medium',
  'search=today&difficulty=hard',
  'search=',

  // no search term
  'category=entertainment&type=boolean&difficulty=easy&limit=5',
  'category=entertainment&type=boolean&difficulty=medium&limit=5',
  'category=entertainment&type=boolean&difficulty=hard&limit=5',
  'category=entertainment&difficulty=medium&limit=5',
  'category=history&type=multiple&limit=1',
  'category=celebrities&type=boolean&limit=1',
  'category=history',
  'type=multiple',
  'type=multiple&difficulty=hard',
  'type=multiple&difficulty=medium',
  'type=multiple&difficulty=easy',
  'difficulty=easy',
  'difficulty=medium',
  'difficulty=hard',
  '',
];


const testRequest = async phrase => rp({
  uri: `http://localhost:${port}/v1/trivia/?${phrase}`,
  method: 'GET',
  resolveWithFullResponse: true,
  headers: {
    'Content-type': 'application/json',
  },
});

setTimeout(async () => {
  for (let i = 0; i < testPhrases.length; i += 1) {
    const tp = testPhrases[i];
    console.log(i + 1, tp);
    const request = await testRequest(testPhrases[i]);
    assert(request.statusCode, 200);
  }
  console.log(testPhrases.length, ' returned OK');
  process.exit(1);
}, 2000);
