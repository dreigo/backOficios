const express = require('express');
const mdAut = require('../middlewares/autenticacion'); // desactivar cuando se llegue a login
const app = express();

const ctrl = require('../controller/usuario/usuarioCtrl');

app.post('/', (req, res) => {   
    return ctrl.PostUsuario(req,res);
});

app.get('/', mdAut.verificaToken, (req,res) => {
    return ctrl.GetUsuario(req,res);
});

app.put('/pass/:id', (req,res) => {
    return ctrl.PutUsuarioPass(req,res);
});

app.put('/:id', (req,res) => {
    return ctrl.PutUsuario(req,res);
});

module.exports = app;
