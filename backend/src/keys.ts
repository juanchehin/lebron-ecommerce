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
        user: process.env.MAIL_USER,
        port: process.env.MAIL_PORT,
        mail_from: process.env.MAIL_FROM,
        key: process.env.MAIL_KEY,
        client_id: process.env.MAIL_CLIENT_ID,
        auth_uri: process.env.MAIL_AUTH_URI,
        token_uri: process.env.MAIL_TOKEN_URI,
        client_secret: process.env.MAIL_CLIENT_SECRET,
        auth_code: process.env.MAIL_AUTH_CODE,
        refresh_token: process.env.MAIL_REFRESH_TOKEN,
        access_token: process.env.MAIL_ACCESS_TOKEN
    }

}

