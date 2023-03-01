const mysql = require('mysql2');

var database = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
};

const pool = mysql.createPool(database);

pool.getConnection((err: any, connection: { release: () => void; }) => {
    if (err) throw err; connection.release(); 
    console.log('Base de datos conectada'); 

});

export default pool;
