const express = require("express");
const router = express.Router();

const ChampionshipRepositorie = require('../repositories/championship')

router.get("/winners-teams", async (request, response, next) => {
  try {
    const championshipRepositorie = new ChampionshipRepositorie();
    const winners = await championshipRepositorie.getWinners(request.query.minimumNumberOfWins);
    response.status(200).json({ success: true, result: winners, transaction: request.transaction });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

router.get("/most-gunners-team", async (request, response, next) => {
  try {
    const championshipRepositorie = new ChampionshipRepositorie();
    const teamWithMostGunners = await championshipRepositorie.getTeamWithMostGunners();
    response.status(200).json({ success: true, result: teamWithMostGunners, transaction: request.transaction });
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: error.message });
  }
});

router.get("/top-gunners", async (request, response, next) => {
  try {
    const championshipRepositorie = new ChampionshipRepositorie();
    const gunners = await championshipRepositorie.getTopGunners(request.query.top);
    response.status(200).json({ success: true, result: gunners, transaction: request.transaction });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

router.get("/gunners", async (request, response, next) => {
  try {
    const championshipRepositorie = new ChampionshipRepositorie();
    const gunners = await championshipRepositorie.getGunners(request.query.numberOfGoals);
    response.status(200).json({ success: true, result: gunners, transaction: request.transaction });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

router.get("/best-winnestless-teams", async (request, response, next) => {
  try {
    const championshipRepositorie = new ChampionshipRepositorie();
    const teams = await championshipRepositorie.getBestWinnestlessTeams(request.query.top);
    response.status(200).json({ success: true, result: teams, transaction: request.transaction });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

router.get("/most-vice-team", async (request, response, next) => {
  try {
    const championshipRepositorie = new ChampionshipRepositorie();
    const vices = await championshipRepositorie.getMostViceTeam();
    response.status(200).json({ success: true, result: vices, transaction: request.transaction });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

module.exports = router;
