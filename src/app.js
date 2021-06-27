const express = require('express');
const path = require('path');

const app = express();

//Inicion la conexion a la base de datos mysql
require('./util/conexion_db');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Importo las rutas que voy a utilizar en el servidor
const empleadosRutas = require('./rutas/empleado_rutas');

//Configuro mi carpeta publica la cual va obtener todos los archivos estaticos como estilos css, archivos js y imagenes
app.use(express.static(path.join(__dirname, 'publico')))


//configuro las rutas que voy a utilizar en el servidor
app.use('/', empleadosRutas);

//Configuro las vistas o el frontend que voy a utilizar en el servidor
//Declaro que formato voy a utilizar para las vistas, en este caso se va a utilizar el formato EJS
app.set('view engine', 'ejs');
//Se configura la carpeta que va a contener todos nuestros archivos EJS con las vistas
app.set('views', path.join(__dirname, 'vistas'));


app.set('port', process.env.PORT || 3000);

const puerto = app.get('port');

app.listen(puerto, ()=>{
    console.log('Servidor corriendo en el puerto ' + puerto);
});