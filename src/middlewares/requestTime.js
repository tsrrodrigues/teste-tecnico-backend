const logger = require('./utility/logger')

const initialRequestTime = (request, response, next) => {
  try {
    request.initialTime = new Date().getTime();
    next();
  } catch (error) {
    logger.error('Error on execute method transactionMiddleware.initialRequestTime - ' + error, { message: error.message });
    response.status(500).json({ error: 'Error on generate request transaction id' });
  }
}

module.exports = initialRequestTime