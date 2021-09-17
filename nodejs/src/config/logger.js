const winston = require('winston');

const loggerFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.cli(),
  winston.format.printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
  }),
);

const log = winston.createLogger({
  level: 'info',
  format: loggerFormat,
  transports: [
    new winston.transports.Console(),
  ]
});


module.exports = log;
