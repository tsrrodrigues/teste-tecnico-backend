const express = require("express");
const router = express.Router();

router.get('/', (request, response, next) => {
  response.status(200).json({
    title: "Api Medipreco",
    version: process.env.API_MEDIPRECO_VERSION,
    description: "Versao Inicial",
  });
});

module.exports = router;
