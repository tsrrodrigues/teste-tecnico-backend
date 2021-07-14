const express = require("express");
const router = express.Router();

const transactionMiddleware = require('../middlewares/transaction')

const healthRoutes = require('./health')
const championshipRoutes = require('./championship')

router.use(`/${process.env.API_MEDIPRECO_VERSION}/health`, healthRoutes);
router.use(`/${process.env.API_MEDIPRECO_VERSION}/championship`, transactionMiddleware, championshipRoutes);

module.exports = router;