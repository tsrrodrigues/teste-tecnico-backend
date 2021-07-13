const express = require("express");
var cors = require('cors')
const bodyParser = require("body-parser");
require('dotenv').config();
const { RateLimiterMemory } = require('rate-limiter-flexible');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const rateLimiter = new RateLimiterMemory({
  points: 1,
  duration: 1,
});
const rateLimiterMiddleware = (req, res, next) => {
  rateLimiter.consume(req.path)
    .then(() => {
      next();
    })
    .catch(_ => {
      res.status(429).send('Too Many Requests');
    });
};
app.use(rateLimiterMiddleware);

app.get(`/health`, (req, res) => {
  res.status(200).json({
    title: "Api Medipreco",
    version: process.env.API_MEDIPRECO_VERSION,
    description: "Versao Inicial",
  });
});

module.exports = app;