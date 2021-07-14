const express = require("express");
const router = express.Router();

const ChampionshipRepositorie = require('../repositories/championship')

router.get("/winners-teams", async (request, response, next) => {
  try {
    const championshipRepositorie = new ChampionshipRepositorie();
    const winners = await championshipRepositorie.getWinners(request.query.numberOfWins);
    response.status(200).json({ result: winners });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

router.get("/gunners-teams", async (request, response, next) => {
  try {
    const championshipRepositorie = new ChampionshipRepositorie();
    const teamWithMostGunners = await championshipRepositorie.getTeamWithMostGunners();
    response.status(200).json({ result: teamWithMostGunners });
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: error.message });
  }
});

router.get("/gunners", async (request, response, next) => {
  try {
    const championshipRepositorie = new ChampionshipRepositorie();
    const gunners = await championshipRepositorie.getGunners(request.query.numberOfGoals);
    response.status(200).json({ result: gunners });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

router.get("/most-vice-team", async (request, response, next) => {
  try {
    const championshipRepositorie = new ChampionshipRepositorie();
    const vices = await championshipRepositorie.getMostViceTeam();
    response.status(200).json({ result: vices });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

module.exports = router;
