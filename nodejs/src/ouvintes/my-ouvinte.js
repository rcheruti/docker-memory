const log = require('../config/logger');
const { kafka } = require('../config/kafka');
const process = require('process');
const topico = process.env['kafka_topic'];

async function iniciar() {

  const consumer = kafka.consumer({ groupId:'grupo1' });
  await consumer.connect();
  await consumer.subscribe({ topic: topico, fromBeginning:false });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      let txt = `Chegando msg: ${message.value} - ${Math.round(Math.random()*10000)}`;
      log.info(`Chegando msg: ${txt}`);
      setTimeout(() => {
        log.info(`Terminando msg: ${txt}`);
      }, 3000);
    },
  });

  const producer = kafka.producer();
  await producer.connect();
  producer.send({ topic: topico, messages:[ { value:'Olá Mundo!' } ] });
  producer.disconnect();
}
(async () => await iniciar())();

