const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const { RateLimiterMemory } = require('rate-limiter-flexible');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const documentation = require('./doc');

const routes = require('./src/routes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const rateLimiter = new RateLimiterMemory({
  points: 1,
  duration: 1
});
const rateLimiterMiddleware = (request, response, next) => {
  rateLimiter.consume(request.path)
    .then(() => {
      next();
    })
    .catch(_ => {
      response.status(429).json({ error: 'Muitas requisicoes consecutivas' });
    });
};
app.use(rateLimiterMiddleware);

app.use('/' + process.env.API_MEDIPRECO_VERSION + '/api-docs', swaggerUi.serve, swaggerUi.setup(documentation));

app.use(routes);

module.exports = app;