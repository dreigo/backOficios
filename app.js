// Requires
var express = require('express');
var mongoose = require('mongoose');

// Inicializar Variables
var app = express();

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

// Conexión a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/MedioAmbiente', (err, res) => {
    if (err) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
});

// Rutas
 app.get('/', (req, res, next) => {
    return res.status(200).json({
        ok: true,
        mensaje: 'todo bien por el momento'
    });
 });

// Escuchar peticiones
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');    
});