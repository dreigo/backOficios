const express = require('express');
const mdAut = require('../middlewares/autenticacion');
const app = express();

const ctrl = require('../controller/Oficios/oficioCtrl');
const ctrlTurno = require('../controller/Oficios/turnosCtrl');

app.post('/', (req, res) => {   
    return ctrl.PostOficio(req,res);
});

app.get('/', (req, res) => {   
    return ctrl.GetOficios(req,res);
});

app.get('/:id', (req, res) => {   
    return ctrl.GetOficioId(req,res);
});

app.put('/:id', (req, res) => {   
    return ctrl.PutOficioId(req,res);
});

app.post('/turnado/:id', (req, res) => {   
    return ctrlTurno.PostTurnadoId(req,res);
});

app.put('/turnado-delete/:id', (req, res) => {   
    return ctrlTurno.DeleteTurnadoId(req,res);
});

app.put('/turnado-update/:id', (req, res) => {   
    return ctrlTurno.PutTurnoId(req,res);
});

module.exports = app;