const express = require("express");
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const documentation = require('../../doc/swaggerDocumentation');

const transactionMiddleware = require('../middlewares/transaction')
const initialRequestTime = require('../middlewares/requestTime')
const routeLogger = require('../middlewares/routeLogger')

const healthRoutes = require('./health')
const championshipRoutes = require('./championship')

router.use('/' + process.env.API_MEDIPRECO_VERSION + '/api-docs', swaggerUi.serve, swaggerUi.setup(documentation));
router.use(`/${process.env.API_MEDIPRECO_VERSION}/health`, healthRoutes);
router.use(`/${process.env.API_MEDIPRECO_VERSION}/championship`, initialRequestTime, transactionMiddleware, routeLogger, championshipRoutes);

module.exports = router;