import { log } from './logger';
log.info('Criando configuração para Kafka');

const url = process.env['kafka_url'].split(';');

import { Kafka } from 'kafkajs';
export const kafka = new Kafka({
  clientId: 'teste-nodejs',
  brokers: url,
});
