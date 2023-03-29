const winston = require('winston');
const path = require('path');
require('winston-daily-rotate-file');

const timezoned = () => {
  return new Date().toLocaleString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires'
  });
}


module.exports.logger =  winston.createLogger({
  transports: [
    new winston.transports.DailyRotateFile({
      filename: path.join( __dirname, `../../logs/info-%DATE%.log` ),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      level: 'info',
      format: winston.format.combine(winston.format.timestamp({ format: timezoned }), winston.format.json())
   }),
   new winston.transports.DailyRotateFile({
    filename: path.join( __dirname, `../../logs/error-logs-%DATE%.log` ),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    level: 'error',
    format: winston.format.combine(winston.format.timestamp({ format: timezoned }), winston.format.json())
  })
  ]
});