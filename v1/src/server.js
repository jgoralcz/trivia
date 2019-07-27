const app = require('./app');
const config = require('../config.json');

const { port } = config;

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Express server listening on port ${port}`);
});
