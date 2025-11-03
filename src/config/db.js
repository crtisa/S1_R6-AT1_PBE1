const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'lojaDB',
    port: '3308',
    waitForConnections: true,  //aguarda conexões livres
    connectionLimit: 10,      // limita o número de conexões simultâneas 
    queueLimit: 0             // sem limite para a fila de conexões
});

 (async ()=>{
   try {
       const connection = await pool.getConnection();
        console.log(`Conectado ao Mysql`);
         connection.release();
    } catch (error) {
        console.error(`Erro ao conectar ao mysql: ${error}`);
     }
 })();

module.exports = pool;