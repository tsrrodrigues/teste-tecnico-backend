const fs = require('fs')
const parse = require('csv-parse')

const loadDatabase = async () => {
  let records = []

  const parser = fs
    .createReadStream(`./database/campeoes_brasileiro.csv`)
    .pipe(parse({}));

  for await (const record of parser) {
    const row = {
      ano: record[0],
      primeiro: record[1],
      segundo: record[2],
      terceiro: record[3],
      quarto: record[4],
      artilheiros: record[5],
      gols: record[6]
    }
    records.push(row)
  }

  return records
}

class Database {
  constructor() {
    this.championships = []
  }

  async load() {
    this.championships = await loadDatabase()
    this.championships.shift()
  }
}

module.exports = Database