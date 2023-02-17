const winston = require('winston');
const path = require('path');

module.exports.logger =  winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: path.join( __dirname, `../logs/logs.log` ),
      json: true,
      format: winston.format.combine(winston.format.timestamp(), winston.format.json())
    }),
    new winston.transports.File({
      level: 'error',
      filename: path.join( __dirname, `../logs/error-logs.log` ),
      json: true,
      format: winston.format.combine(winston.format.timestamp(), winston.format.json())
    })
  ]
});