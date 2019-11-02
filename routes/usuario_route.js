const express = require('express');
// let mdAut = require('../middlewares/autenticacion'); // desactivar cuando se llegue a login
const app = express();

const ctrl = require('../controller/usuario/usuarioCtrl');


// app.get('/', [colocar middlewares] (req, res, next) => {   
app.post('/', (req, res, next) => {   
    return ctrl.PostUsuario(req,res,next);
});

app.get('/', (req,res,next) => {
    return ctrl.GetUsuario(req,res,next);
});

app.put('/pass/:id', (req,res,next) => {
    return ctrl.PutUsuarioPass(req,res,next);
});


app.put('/:id', (req,res,next) => {
    return ctrl.PutUsuario(req,res,next);
});


module.exports = app;