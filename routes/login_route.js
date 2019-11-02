const express = require('express');
const ctrl = require('../controller/usuario/loginCtrl');

let mdAut = require('../middlewares/autenticacion'); 
const app = express();


// app.get('/', [colocar middlewares] (req, res, next) => {   
app.post('/', (req, res) => {   
    return ctrl.PostLogin(req,res);
});

app.get('/renueva_token', (req,res) => {
    return ctrl.GetLoginRenewToken(req,res);
})


module.exports = app;