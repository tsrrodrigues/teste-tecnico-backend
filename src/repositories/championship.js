const Database = require('../../database/database')
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
    gunners[index] = gunners[index].split(' (')
    gunnerNames.add(gunners[index][0])
  }

  return [...gunnerNames]
}

const getWinnestlessTeams = (championship) => {
  const teams = [championship.segundo, championship.terceiro, championship.quarto]
  return teams
}

class ChampionshipRepositorie {
  constructor() {
    this.championships = database.championships
  }

  async getWinners(minimumNumberOfWins = 1) {
    const numberOfWinsOfEachTeam = {}

    this.championships.forEach(row => {
      numberOfWinsOfEachTeam[row.primeiro] ? numberOfWinsOfEachTeam[row.primeiro] += 1 : numberOfWinsOfEachTeam[row.primeiro] = 1
    })

    let winners = [...new Set(this.championships.map(championship => championship.primeiro))]
    winners = winners.filter(winner => numberOfWinsOfEachTeam[winner] >= minimumNumberOfWins)

    return winners
  }

  async getTeamWithMostGunners() {
    const numberOfGunnersPerTeam = {}
    for (let championship of this.championships) {
      for (let gunnerTeam of Object.keys(getGunnersTeamsFromRow(championship.artilheiros))) {
        numberOfGunnersPerTeam[gunnerTeam] ? numberOfGunnersPerTeam[gunnerTeam] += 1 : numberOfGunnersPerTeam[gunnerTeam] = 1
      }
    }

    let teamWithMostGunners = null
    for (let team of Object.keys(numberOfGunnersPerTeam)) {
      if (numberOfGunnersPerTeam[team] > numberOfGunnersPerTeam[teamWithMostGunners] || !numberOfGunnersPerTeam[teamWithMostGunners]) {
        teamWithMostGunners = team
      }
    }

    return teamWithMostGunners
  }

  async getTopGunners(top = 1) {
    const gunners = this.championships
      .sort((championshipA, championshipB) => championshipB.gols - championshipA.gols)
      .flatMap(championship => getGunnersNamesFromRow(championship.artilheiros))
      .slice(0, top)

    return gunners
  }

  async getMostViceTeam() {
    const numberOfVicesOfEachTeam = {}

    this.championships.forEach(row => {
      numberOfVicesOfEachTeam[row.segundo] ? numberOfVicesOfEachTeam[row.segundo] += 1 : numberOfVicesOfEachTeam[row.segundo] = 1
    })

    let vices = [...new Set(this.championships.map(championship => championship.segundo))]

    let teamWithMostVices = null
    for (let team of vices) {
      if (numberOfVicesOfEachTeam[team] > numberOfVicesOfEachTeam[teamWithMostVices] || !numberOfVicesOfEachTeam[teamWithMostVices]) {
        teamWithMostVices = team
      }
    }

    return teamWithMostVices
  }

  async getBestWinnestlessTeams(top = 1) {
    let winnestlessTeamsBestParticipationsCount = {}
    for (let championship of this.championships) {
      for (let winnestlessTeam of getWinnestlessTeams(championship)) {
        winnestlessTeamsBestParticipationsCount[winnestlessTeam] ?
          winnestlessTeamsBestParticipationsCount[winnestlessTeam] += 1 :
          winnestlessTeamsBestParticipationsCount[winnestlessTeam] = 1
      }
    }

    const bestWinnestlessTeams = Object.keys(winnestlessTeamsBestParticipationsCount)
      .sort((teamA, teamB) => winnestlessTeamsBestParticipationsCount[teamB] - winnestlessTeamsBestParticipationsCount[teamA])

    return bestWinnestlessTeams.slice(0, top)
  }

  async getGunners(numberOfGoals) {
    const gunners = this.championships
      .filter(championship => championship.gols === numberOfGoals)
      .flatMap(championship => getGunnersNamesFromRow(championship.artilheiros))

    return gunners
  }
}

module.exports = ChampionshipRepositorie
