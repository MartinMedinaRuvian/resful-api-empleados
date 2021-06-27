CREATE DATABASE IF NOT EXISTS empleados;

USE empleados;

CREATE TABLE IF NOT EXISTS empleado(
   nombre_completo CHAR(250) NOT NULL PRIMARY KEY,
   funcion TEXT
);

CREATE TABLE IF NOT EXISTS jefe(
   nombre_completo CHAR(250) NOT NULL PRIMARY KEY,
   FOREIGN KEY (nombre_completo) REFERENCES empleado(nombre_completo) ON DELETE CASCADE
);


