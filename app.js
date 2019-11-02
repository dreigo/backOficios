// Requires
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);



// Inicializar Variables
const app = express();

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

// Body Parser
// parse application/x-www-form-urlencoded

app.use(express.urlencoded({extended: true}));
app.use(express.json());   

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser({limit: '50mb'}));
// app.use(bodyParser.json({ type: 'application/*+json' }));

// Conexión a la base de datos
// mongoose.connection.openUri('mongodb://localhost:27017/MedioAmbienteAAO', (err, res) => {
//     if (err) throw err;
//     console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
// });
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost:27017/MedioAmbienteAAO', { useNewUrlParser: true }, (err) => {
        if (err) {
            console.log('Base de datos: \x1b[31m%s\x1b[31m', 'No online');
            throw err
        }else{
            console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
        };
});

// Importar Rutas
const loginRoutes = require('./routes/login_route');
const usuarioRoutes = require('./routes/usuario_route');
const appRoutes = require('./routes/app');

// Rutas
app.use('/login', loginRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/', appRoutes);

// Escuchar peticiones
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');    
});