const express = require('express');
const ruta = express.Router();

//Modelo o tabla
const modelo = 'empleado';

//Requiero la conexion a mysql
const conexion = require('../util/conexion_db');

//Recupero toda la info 
ruta.get('/', async(req, res)=>{
    const empleados = await conexion.query('SELECT e.nombre_completo, e.funcion FROM empleado e WHERE e.nombre_completo NOT IN (SELECT j.nombre_completo FROM jefe j)');
    const jefes = await conexion.query('SELECT e.nombre_completo, e.funcion FROM empleado e WHERE e.nombre_completo IN (SELECT * FROM jefe)');
    res.render('index', {empleados, jefes});
});

//Recupero info filtrada
ruta.post('/', async (req, res)=>{
    const {nombre_completo} = req.body;
    const empleados = await conexion.query("SELECT e.nombre_completo, e.funcion FROM empleado e WHERE e.nombre_completo LIKE '%" + nombre_completo + "%' AND e.nombre_completo NOT IN (SELECT j.nombre_completo FROM jefe j)");
    const jefes = await conexion.query("SELECT e.nombre_completo, e.funcion FROM empleado e WHERE e.nombre_completo LIKE '%" + nombre_completo + "%' AND e.nombre_completo IN (SELECT j.nombre_completo FROM jefe j)");

    res.render('index', {empleados, jefes});
});

//Guardo un nuevo registro
ruta.post('/agregar', async(req, res)=>{
    const {nombre_completo, funcion} = req.body;

    const yaEsta = await conexion.query('SELECT nombre_completo FROM '+ modelo+ ' WHERE nombre_completo=?', [nombre_completo]);

    if(yaEsta.length > 0){
        alert(nombre_completo + 'Ya esta registrado');
        res.redirect('/')
    }else{
        const dato_guardar = {
            nombre_completo,
            funcion
        }
        await conexion.query('INSERT INTO ' + modelo + ' SET ?', [dato_guardar]);
        res.redirect('/');
    }

});


//Confirmacion para eliminar un registro
ruta.get('/confirmar_eliminar/:nombre_completo', async(req, res)=>{
    const {nombre_completo} = req.params;
    res.render('empleados_confirmar_eliminar', {nombre_completo});
});


//Elimino el registro
ruta.get('/eliminar/:nombre_completo', async(req, res)=>{
     const {nombre_completo} = req.params;
     await conexion.query('DELETE FROM ' + modelo + ' WHERE nombre_completo=?', [nombre_completo]);
     res.redirect('/');
});


//Busco el registro a editar y muestro la info en una nueva vista
ruta.get('/editar/:nombre_completo', async(req, res)=>{
    const {nombre_completo}= req.params;
    const datos = await conexion.query('SELECT * FROM '+ modelo + ' WHERE nombre_completo=?', [nombre_completo]); 
    res.render('empleados_editar', {datos});
});

//Editar registro
ruta.post('/editar/:nombre_completo', async(req, res)=>{
    const {nombre_completo} = req.params;
   const datos = req.body;
   await conexion.query('UPDATE ' + modelo + ' SET ? WHERE nombre_completo=?', [datos, nombre_completo]);
   res.redirect('/')
});


//Guardar un empleado como jefe
ruta.get('/set_boss/:nombre_completo', async(req, res)=>{
    const {nombre_completo} = req.params;

    const yaEsta = await conexion.query('SELECT nombre_completo FROM jefe WHERE nombre_completo=?', [nombre_completo]);

    if(yaEsta.length > 0){
        res.redirect('/')
    }else{

        const dato_guardar = {
            nombre_completo
        }

        await conexion.query('INSERT INTO jefe SET ?', [dato_guardar]);
        res.redirect('/'); 
    }
});


//Guardar un empleado como jefe
ruta.get('/set_employee/:nombre_completo', async(req, res)=>{
    const {nombre_completo} = req.params;
    await conexion.query('DELETE FROM jefe WHERE nombre_completo=?', [nombre_completo]);
    res.redirect('/');
});

module.exports = ruta;