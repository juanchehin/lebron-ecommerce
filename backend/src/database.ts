const mysql = require('mysql2');
import keys from './keys';

const pool = mysql.createPool(keys.database);

pool.getConnection((err: any, connection: { release: () => void; }) => {
    if (err) throw err; connection.release(); 
    console.log('Base de datos conectada'); 

});

export default pool;
