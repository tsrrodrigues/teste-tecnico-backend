const logger = require("../utility/logger");

const LogRoute = (request, response, next) => {
  try {
    logger.info('Request start - route: ' + request.path + '\n',
      {
        parameters: {
          query: request.query,
          params: request.params
        },
        transaction: request.transaction
      });
    next();
  } catch (error) {
    logger.error('Error on execute method routeLogger.LogRoute - ' + error, { message: error.message });
    response.status(500).json({ error: 'Error on generate route log' })
  }
}

module.exports = LogRoute