const express = require("express");
const cors = require('cors')
const bodyParser = require("body-parser");
const { RateLimiterMemory } = require('rate-limiter-flexible');
require('dotenv').config();

const routes = require('./src/routes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const rateLimiter = new RateLimiterMemory({
  points: 1,
  duration: 1,
});
const rateLimiterMiddleware = (request, response, next) => {
  rateLimiter.consume(request.path)
    .then(() => {
      next();
    })
    .catch(_ => {
      response.status(429).send('Too Many Requests');
    });
};
app.use(rateLimiterMiddleware);

app.use(routes);

module.exports = app;