const express = require("express");
const router = express.Router();
const logger = require('../utility/logger')
const { calculateRequestTime } = require('../utility/otherUtils')

const ChampionshipRepositorie = require('../repositories/championship')

router.get("/winners-teams", async (request, response, next) => {
  try {
    const championshipRepositorie = new ChampionshipRepositorie();
    const { status, body } = await championshipRepositorie.getWinners(request.query.minimumNumberOfWins);

    response.status(status).json({ ...body, transaction: request.transaction });
  } catch (error) {
    response.status(500).json({ error: error.message, transaction: request.transaction });
  } finally {
    logger.info('Request finished in ' + calculateRequestTime(request.initialTime) + 'ms\n', { transaction: request.transaction });
  }
});

router.get("/most-gunners-team", async (request, response, next) => {
  try {
    const championshipRepositorie = new ChampionshipRepositorie();
    const { status, body } = await championshipRepositorie.getTeamWithMostGunners();
    response.status(status).json({ ...body, transaction: request.transaction });
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: error.message, transaction: request.transaction });
  } finally {
    logger.info('Request finished in ' + calculateRequestTime(request.initialTime) + 'ms\n', { transaction: request.transaction });
  }
});

router.get("/top-gunners", async (request, response, next) => {
  try {
    const championshipRepositorie = new ChampionshipRepositorie();
    const { status, body } = await championshipRepositorie.getTopGunners(request.query.top);
    response.status(status).json({ ...body, transaction: request.transaction });
  } catch (error) {
    response.status(500).json({ error: error.message, transaction: request.transaction });
  } finally {
    logger.info('Request finished in ' + calculateRequestTime(request.initialTime) + 'ms\n', { transaction: request.transaction });
  }
});

router.get("/most-vice-team", async (request, response, next) => {
  try {
    const championshipRepositorie = new ChampionshipRepositorie();
    const { status, body } = await championshipRepositorie.getMostViceTeam();
    response.status(status).json({ ...body, transaction: request.transaction });
  } catch (error) {
    response.status(500).json({ error: error.message, transaction: request.transaction });
  } finally {
    logger.info('Request finished in ' + calculateRequestTime(request.initialTime) + 'ms\n', { transaction: request.transaction });
  }
});

router.get("/best-winless-teams", async (request, response, next) => {
  try {
    const championshipRepositorie = new ChampionshipRepositorie();
    const { status, body } = await championshipRepositorie.getBestWinlessTeams();
    response.status(status).json({ ...body, transaction: request.transaction });
  } catch (error) {
    response.status(500).json({ error: error.message, transaction: request.transaction });
  } finally {
    logger.info('Request finished in ' + calculateRequestTime(request.initialTime) + 'ms\n', { transaction: request.transaction });
  }
});

router.get("/gunners", async (request, response, next) => {
  try {
    const championshipRepositorie = new ChampionshipRepositorie();
    if (!request.query.numberOfGoals) return response.status(400).json({ error: 'Parameter numberOfGoals is missing', transaction: request.transaction });
    const { status, body } = await championshipRepositorie.getGunners(request.query.numberOfGoals);
    response.status(status).json({ ...body, transaction: request.transaction });
  } catch (error) {
    response.status(500).json({ error: error.message, transaction: request.transaction });
  } finally {
    logger.info('Request finished in ' + calculateRequestTime(request.initialTime) + 'ms\n', { transaction: request.transaction });
  }
});
module.exports = router;
