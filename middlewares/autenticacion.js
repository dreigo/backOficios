var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;


/**
 * Verifica el token, y agrega al usuario en req.usuario
 */
exports.verificaToken = function(req, res, next) {
    var token = req.headers.token;
    let token1 = req.get('Authorization');
    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            let mensaje = 'Hubo un problema con la autorización favor de cerrar ' + 
            'la sesion y volverla a abrir, si el problema persiste favor de comunicarse' +
            'con Mauricio Robles H. (error: Token incorrecto)';
            return res.status(401).json({
                ok: false,
                mensaje: mensaje,
                errors: err,
                token: token
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
}


// ==========================================
//  Verificar ADMIN
// ==========================================
exports.verificaADMIN_ROLE = function(req, res, next) {
    var usuario = req.usuario;
    if (usuario.role === 'ADMIN_ROLE') {
        next();
        return;
    } else {
        return res.status(401).json({
            ok: false,
            mensaje: 'Token incorrecto - No es administrador',
            errors: { message: 'No es administrador, no puede hacer eso' }
        });
    }
}

/**
 * Verifica que el usuario logueado sea un usuario de Arbolado
 */
exports.vARBOLADO_ROLE = function(req, res, next) {
    var usuario = req.usuario;
    if (usuario.role === 'ARBOLADO_ROLE' || usuario.role === 'ADMIN_ROLE') {
        next();
        return;
    } else {
        return res.status(401).json({
            ok: false,
            mensaje: 'Token incorrecto - No es de Arbolado',
            errors: { message: 'No es personal de arbolado, restringido' }
        });
    }
}


// ==========================================
//  Verificar ADMIN o Mismo Usuario
// ==========================================
exports.verificaADMIN_o_MismoUsuario = function(req, res, next) {


    var usuario = req.usuario;
    var id = req.params.id;

    if (usuario.role === 'ADMIN_ROLE' || usuario._id === id) {
        next();
        return;
    } else {

        return res.status(401).json({
            ok: false,
            mensaje: 'Token incorrecto - No es administrador ni es el mismo usuario',
            errors: { message: 'No es administrador, no puede hacer eso' }
        });
    }
}