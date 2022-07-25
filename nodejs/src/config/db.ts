import { log } from './logger';
log.info('Criando configuração para DB (Sequelize)');

import { Sequelize, Model, DataTypes } from 'sequelize';

const dialect = process.env['database_dialect'] || 'mysql';
const url = process.env['database_url'];
const port = parseInt( process.env['database_port'] );
const username = process.env['database_username'];
const password = process.env['database_password'];
const schema = process.env['database_schema'];

export const db = new Sequelize(schema,username,password, 
  { 
    dialect: dialect as 'mysql'|'postgres'|'sqlite'|'mariadb'|'mssql', 
    host:url,
    port:port,
    define: {
      freezeTableName: true
    }
  }
);
