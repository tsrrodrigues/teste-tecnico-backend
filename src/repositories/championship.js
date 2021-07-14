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
  return gunnerNames
}

class ChampionshipRepositorie {
  constructor() {
    this.championships = database.championships
  }

  async getWinners(numberOfWins = 1) {
    const numberOfWinsOfEachTeam = {}

    this.championships.forEach(row => {
      numberOfWinsOfEachTeam[row.primeiro] ? numberOfWinsOfEachTeam[row.primeiro] += 1 : numberOfWinsOfEachTeam[row.primeiro] = 1
    })

    let winners = [...new Set(this.championships.map(championship => championship.primeiro))]
    winners = winners.filter(winner => numberOfWinsOfEachTeam[winner] >= numberOfWins)

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

  async getGunners(numberOfGoals) {
    let gunners = new Set()
    for (let championship of this.championships) {
      if (championship.gols === numberOfGoals) {
        gunners = new Set([...gunners, ...getGunnersNamesFromRow(championship.artilheiros)])
      }
    }

    return [...gunners]
  }
}

module.exports = ChampionshipRepositorie
