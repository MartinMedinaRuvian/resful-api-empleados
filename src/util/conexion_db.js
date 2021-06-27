const mysql = require('mysql');

//Requiero o importo la funcion o metodo promisify del modulo UTIL que tiene nodejs que me permitira manejar promesas
const {promisify} = require('util');

//Requiero la configuracion mysql
const {configuracion_mysql} = require('../configuracion/credenciales');

//Configuro la conexion a mysql con un metodo o funcion llamado pool que tiene el modulo mysql que me permite manejar las consultas de una manera mas sensilla
const pool = mysql.createPool(configuracion_mysql);

//Preparo la conexion a mysql

pool.getConnection((err, conexion)=>{
    if(err){
        console.log(err);
    }
    if(conexion){
        conexion.release();
        console.log('Conectado a la base de datos');
    }
});

//Para convertir las consultas en promesas utilizamos promisify
pool.query = promisify(pool.query);

module.exports = pool;


