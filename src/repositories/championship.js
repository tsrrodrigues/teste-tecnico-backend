const Database = require('../../database/database')
const logger = require('../utility/logger')
const database = new Database()
database.load()

const getGunnersTeamsFromRow = (gunnersRow) => {
  gunnersRow = gunnersRow.trim()
  const gunners = gunnersRow.split(')')
  gunners.pop();

  const gunnersTeams = {}
  for (let index = 0; index < gunners.length; index++) {
    gunners[index] = gunners[index].trim()
    gunners[index] = gunners[index].split(' (')
    gunnersTeams[gunners[index][1]] ? gunnersTeams[gunners[index][1]] += 1 : gunnersTeams[gunners[index][1]] = 1
  }
  return gunnersTeams
}

const getGunnersNamesFromRow = (gunnersRow) => {
  gunnersRow = gunnersRow.trim()
  const gunners = gunnersRow.split(')')
  gunners.pop();

  const gunnerNames = new Set()
  for (let index = 0; index < gunners.length; index++) {
    gunners[index] = gunners[index].trim()
    gunnerNames.add(gunners[index] + ')')
  }

  return [...gunnerNames]
}

class ChampionshipRepositorie {
  constructor() {
    this.championships = database.championships
  }

  async getWinners(minimumNumberOfWins = 2) {
    try {
      const numberOfWinsOfEachTeam = {};

      this.championships.forEach(row => {
        numberOfWinsOfEachTeam[row.primeiro] ? numberOfWinsOfEachTeam[row.primeiro] += 1 : numberOfWinsOfEachTeam[row.primeiro] = 1;
      })

      let winners = [...new Set(this.championships.map(championship => championship.primeiro))];
      winners = winners.filter(winner => numberOfWinsOfEachTeam[winner] >= minimumNumberOfWins);

      logger.info('Search winners from database completed');

      return { status: 200, body: { result: winners, success: true } };
    } catch (error) {
      logger.error('Error on execute method ChampionshipRepositorie.getWinners - ' + error, { message: error.message });
      return { status: 500, body: { error: error.message } };
    }
  }

  async getTeamWithMostGunners() {
    try {
      const numberOfGunnersPerTeam = {};
      for (let championship of this.championships) {
        for (let gunnerTeam of Object.keys(getGunnersTeamsFromRow(championship.artilheiros))) {
          numberOfGunnersPerTeam[gunnerTeam] ? numberOfGunnersPerTeam[gunnerTeam] += 1 : numberOfGunnersPerTeam[gunnerTeam] = 1;
        }
      }

      let teamWithMostGunners = null;
      for (let team of Object.keys(numberOfGunnersPerTeam)) {
        if (numberOfGunnersPerTeam[team] > numberOfGunnersPerTeam[teamWithMostGunners] || !numberOfGunnersPerTeam[teamWithMostGunners]) {
          teamWithMostGunners = team;
        }
      }

      return { status: 200, body: { result: teamWithMostGunners, success: true } };
    } catch (error) {
      logger.error('Error on execute method ChampionshipRepositorie.getTeamWithMostGunners - ' + error, { message: error.message });
      return { status: 500, body: { error: error.message } };
    }
  }

  async getTopGunners(top = 5) {
    try {
      const gunners = this.championships
        .sort((championshipA, championshipB) => championshipB.gols - championshipA.gols)
        .flatMap(championship => getGunnersNamesFromRow(championship.artilheiros))
        .slice(0, top);

      return { status: 200, body: { result: gunners, success: true } };
    } catch (error) {
      logger.error('Error on execute method ChampionshipRepositorie.getTopGunners - ' + error, { message: error.message });
      return { status: 500, body: { error: error.message } };
    }
  }

  async getMostViceTeam() {
    try {
      const numberOfVicesOfEachTeam = {};

      this.championships.forEach(row => {
        numberOfVicesOfEachTeam[row.segundo] ? numberOfVicesOfEachTeam[row.segundo] += 1 : numberOfVicesOfEachTeam[row.segundo] = 1;
      })

      let vices = [...new Set(this.championships.map(championship => championship.segundo))];

      let teamWithMostVices = null;
      for (let team of vices) {
        if (numberOfVicesOfEachTeam[team] > numberOfVicesOfEachTeam[teamWithMostVices] || !numberOfVicesOfEachTeam[teamWithMostVices]) {
          teamWithMostVices = team;
        }
      }

      return { status: 200, body: { result: teamWithMostVices, success: true } };
    } catch (error) {
      logger.error('Error on execute method ChampionshipRepositorie.getMostViceTeam - ' + error, { message: error.message });
      return { status: 500, body: { error: error.message } };
    }
  }

  async getBestWinlessTeams() {
    try {
      let winlessTeams = new Set()
      let winners = this.championships.map(championship => championship.primeiro);
      this.championships.forEach(championship => {
        const championshipWinlessTeams = [championship.segundo, championship.terceiro, championship.quarto];
        const addTeamsList = []
        for (let championshipWinlessTeam of championshipWinlessTeams) {
          if (winners.findIndex(winner => winner === championshipWinlessTeam) === -1) addTeamsList.push(championshipWinlessTeam)
        }
        winlessTeams = new Set([...winlessTeams, ...addTeamsList])
      })

      return { status: 200, body: { result: [...winlessTeams], success: true } };
    } catch (error) {
      console.log(error)
      logger.error('Error on execute method ChampionshipRepositorie.getBestWinlessTeams - ' + error, { message: error.message });
      return { status: 500, body: { error: error.message } };
    }
  }

  async getGunners(numberOfGoals) {
    try {
      const gunners = this.championships
        .filter(championship => championship.gols === numberOfGoals)
        .flatMap(championship => getGunnersNamesFromRow(championship.artilheiros));

      return { status: 200, body: { result: gunners, success: true } };
    } catch (error) {
      logger.error('Error on execute method ChampionshipRepositorie.getGunners - ' + error, { message: error.message });
      return { status: 500, body: { error: error.message } };
    }
  }
}

module.exports = ChampionshipRepositorie
