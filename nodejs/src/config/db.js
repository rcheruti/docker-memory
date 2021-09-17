const log = require('./logger');
log.info('Criando configuração para DB (Sequelize)');

const { Sequelize, Model, DataTypes } = require('sequelize');

const dialect = process.env['database_dialect'] || 'mysql';
const url = process.env['database_url'];
const port = process.env['database_port'];
const username = process.env['database_username'];
const password = process.env['database_password'];
const schema = process.env['database_schema'];

const sequelize = new Sequelize(schema,username,password, 
  { 
    dialect:dialect, 
    host:url,
    port:port,
    define: {
      freezeTableName: true
    }
  }
);

module.exports = sequelize;