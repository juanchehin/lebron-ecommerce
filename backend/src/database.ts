const mysql = require('mysql2');

const pool = mysql.createPool(
    process.env.DB_HOST,
    process.env.DB_USER,
    process.env.DB_PASS,
    process.env.DB_NAME
);

pool.getConnection((err: any, connection: { release: () => void; }) => {
    if (err) throw err; connection.release(); 
    console.log('Base de datos conectada'); 

});

export default pool;
