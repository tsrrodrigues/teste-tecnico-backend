const express = require("express");
const router = express.Router();

const healthRoutes = require('./health')
const championshipRoutes = require('./championship')

router.use(`/${process.env.API_MEDIPRECO_VERSION}/health`, healthRoutes);
router.use(`/${process.env.API_MEDIPRECO_VERSION}/championship`, championshipRoutes);

module.exports = router;