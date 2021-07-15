const crypto = require('crypto');

const GenerateTransaction = (request, response, next) => {
  try {
    request.transaction = crypto.randomBytes(9).toString('hex');
    next();
  } catch (error) {
    console.log(error)
    response.status(500).json({ error: 'Erro ao gerar transacao de requisição' })
  }
}

module.exports = GenerateTransaction