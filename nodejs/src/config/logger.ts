import winston from 'winston';

const loggerFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.cli(),
  winston.format.printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
  }),
);

export const log = winston.createLogger({
  level: 'info',
  format: loggerFormat,
  transports: [
    new winston.transports.Console(),
  ]
});
