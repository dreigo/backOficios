const express = require('express');
const ctrl = require('../controller/usuario/loginCtrl');

// let mdAut = require('../middlewares/autenticacion'); // desactivar cuando se llegue a login
const app = express();


// app.get('/', [colocar middlewares] (req, res, next) => {   
app.post('/', (req, res, next) => {   
    return ctrl.PostLogin(req,res,next);
});


module.exports = app;