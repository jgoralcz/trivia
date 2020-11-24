const { levels, connectLogger } = require('log4js');
const log4js = require('log4js');

log4js.configure({
  appenders: {
    console: { type: 'stdout' },
    everything: { type: 'dateFile', filename: 'logs/trvia.log' },
  },
  categories: {
    default: { appenders: ['console', 'everything'], level: 'debug' },
  },
});

const logger = log4js.getLogger();
logger.level = 'info';

const statusRules = [
  { from: 200, to: 299, level: levels.INFO },
  { from: 300, to: 399, level: levels.WARN },
  { from: 400, to: 1000, level: levels.ERROR },
];

const httpLogger = () => connectLogger(logger, {
  level: 'auto',
  statusRules,
  format: (req, res, format) => {
    if (!req || !req.headers) return undefined;

    return format(`{ "User Agent": "${req.headers['user-agent']}", "Host": "${req.headers.host}", "Url": "${req.originalUrl}", "Method": "${req.method}", "Params": ${JSON.stringify(req.params)}, "Query": ${JSON.stringify(req.query)}, "Body": ${JSON.stringify(req.body)}, "Status Code": "${res.statusCode}", "Status Message": "${res.statusMessage}", "Response Time": ${res.responseTime}, "Content-Type": "${req.headers['content-type']}", "Content-Length": "${req.headers['content-length']}"}`);
  },
});

module.exports = {
  httpLogger,
};
