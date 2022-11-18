require('dotenv').config()

export default {

    database: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    },

    mail: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_SECURE,
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }

}

