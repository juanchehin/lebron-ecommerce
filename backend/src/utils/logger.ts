const winston = require('winston');
const path = require('path');

const timezoned = () => {
  return new Date().toLocaleString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires'
  });
}


module.exports.logger =  winston.createLogger({
  transports: [
    // ===== Mensaje informativo ======
    new winston.transports.File({
      level: 'info',
      filename: path.join( __dirname, `../logs/logs.log` ),
      datePattern: 'HH-MM:ss YYYY-MM-DD',
      json: true,
      format: winston.format.combine(winston.format.timestamp({ format: timezoned }), winston.format.json())
    }),
    // ===== Mensaje de error ======
    new winston.transports.File({
      level: 'error',
      filename: path.join( __dirname, `../logs/error-logs.log` ),
      datePattern: 'HH-MM:ss YYYY-MM-DD',
      json: true,
      format: winston.format.combine(winston.format.timestamp({ format: timezoned }), winston.format.json())
    })
  ]
});