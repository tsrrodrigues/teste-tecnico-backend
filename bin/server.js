const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

const app = require('../app');
const port = normalizePort(process.env.API_MEDIPRECO_PORT);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${process.env.API_MEDIPRECO_PORT}`);
});
