const axios = require('axios');
require('../src/server');

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

(async () => {
  for (let i = 0; i < testPhrases.length; i += 1) {
    const phrase = testPhrases[i];
    const { status, data } = await axios.get(`http://localhost:8443/v1/trivia/?${phrase}`);
    if (status !== 200 || !data) {
      console.error(`\nFailed with phrase ${phrase}: status=${status}, data=${data}\n`);
    }
  }
  process.exit(1);
})();
