const logger = require('log4js').getLogger();
const { LOCAL } = require('../util/constants/environments');

const errorHandler = (err, _, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  logger.error(err);

  const error = (process.env.NODE_ENV === LOCAL) ? {
    error: {
      name: err.name,
      stack: err.stack,
      message: err.message,
      code: err.code,
    },
  } : {
      error: {
        name: err.name,
        code: err.code,
      },
    };

  return res.status(err.status || 500).json(error);
};

module.exports = {
  errorHandler,
};
