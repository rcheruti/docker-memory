
const log = require('./config/logger');
const version = require('../package.json').version;
log.info(`Versão: ${version}`);

// iniciar env
require('dotenv').config()

// iniciar DB
require('./config/db');
require('./config/db-associacoes');

// iniciar Mensageria
// require('./config/kafka');
// require('./ouvintes/my-ouvinte');

// iniciar servidor
const express = require('express');
const app = express();
const port = process.env['server.port'] || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./bordas/pessoa-borda')(app);
require('./bordas/carro-borda')(app);

app.listen(port, () => {
  log.info(`Servidor iniciado em http://localhost:${port}`);
});
