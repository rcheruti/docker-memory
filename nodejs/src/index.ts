
import { log } from './config/logger';
import { version } from '../package.json';
log.info(`Versão: ${version}`);

// iniciar env
import { config } from 'dotenv';
config()

// iniciar DB
import * as db from './config/db';
import * as db_associacoes from './config/db-associacoes';

// iniciar Mensageria
import * as kafka from './config/kafka';
import { iniciar } from './ouvintes/my-ouvinte';
(async () => await iniciar())();

// iniciar servidor
import express from 'express';
const app = express();
const port = process.env['server.port'] || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./bordas/pessoa-borda')(app);
require('./bordas/carro-borda')(app);

app.listen(port, () => {
  log.info(`Servidor iniciado em http://localhost:${port}`);
});
