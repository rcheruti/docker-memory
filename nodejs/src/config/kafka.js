const log = require('./logger');
log.info('Criando configuração para Kafka');

const url = process.env['kafka_url'].split(';');

const { Kafka } = require('kafkajs');
const kafka = new Kafka({
  clientId: 'teste-nodejs',
  brokers: url,
});

module.exports = { kafka };
