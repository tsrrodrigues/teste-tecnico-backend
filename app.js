const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const { RateLimiterMemory } = require('rate-limiter-flexible');
require('dotenv').config();

const routes = require('./src/routes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const rateLimiter = new RateLimiterMemory({
  points: 1,
  duration: process.env.API_MEDIPRECO_MULTIPLE_REQUESTS_DELAY
});
const rateLimiterMiddleware = (request, response, next) => {
  rateLimiter.consume(request.path)
    .then(() => {
      next();
    })
    .catch(_ => {
      response.status(429).json({ error: 'Too many requests, wait 1 second before doing another request to the same endpoint' });
    });
};
app.use(rateLimiterMiddleware);

app.use(routes);

module.exports = app;