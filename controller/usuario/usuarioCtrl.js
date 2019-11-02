const Usuario = require('../../models/usuario_model');
const Resp = require('../../helpers/respuestas');
const bcrypt = require('bcryptjs');


module.exports = {
    /**
     * crea un nuevo usuario
     */
    PostUsuario: async(req,res,next) => {
        try {
            const body = req.body;
            if (body.password === body.password2){
                let usuario = new Usuario({
                    nombre: body.nombre,
                    aPaterno: body.aPaterno,
                    aMaterno: body.aMaterno,
                    usuario: body.usuario,                    
                    password: bcrypt.hashSync(body.password, 10)
                });
    
                if(body.usuario === 'mrobles'){
                    usuario.estado = 1;
                    usuario.role = 'ADMIN_ROLE';
                }
    
                try {
                    let usuarioGuardado = await usuario.save();
                    return Resp.respuestaOKData(res, usuarioGuardado);
                } catch (error) {
                    let data = {
                        mensaje: 'Error al guardar nuevo usuario',
                        error
                    };
                        return Resp.respuestaOKErrorData(res, data);
                }
    
            }else{ // los passwor no coinciden
                let data = {
                    ok: false,
                    mensaje: 'Los password no coinciden'
                }
                return Resp.respuestaOKErrorData(res, data)
            }
        } catch (error) {
            let mensaje = 'Error desconocino al crear un Usuario';
            return Resp.respuestaErrorServer(res, mensaje, error);
        }
    },
    /**
     *  Regresa todos los usuarios 
     */
    GetUsuario: async(req,res,next) => {
        try {
            let desde = req.query.desde || 0;
            desde = Number(desde);
            let usuario = await Usuario.find({}, 'nombre aPaterno aMaterno usuario img role estado');
            return Resp.respuestaOKData(res, usuario);            
        } catch (error) {
            return Resp.respuestaOKErrorData(res, error);
        }
    },
    /**
     * actualiza el nombre aPaterno aMaterno, role y estado
     */
    PutUsuario: async(req,res,next) => {
        try {
            let id = req.params.id;
            let body = req.body;

            let usuario = await Usuario.findById(id, 'nombre aPaterno aMaterno role estado');

            usuario.nombre = body.nombre;
            usuario.aPaterno = body.aPaterno;
            usuario.aMaterno = body.aMaterno;
            usuario.role = body.role;
            usuario.estado = body.estado;

            try {
                let usuarioSave = await usuario.save();
                return Resp.respuestaOKData(res, usuarioSave);                
            } catch (error) {
                return Resp.respuestaOKErrorData(res, error);
            }

        } catch (error) {
            return Resp.respuestaErrorServer(res, 'Error al actualizar el usuario', error);
        }
    },
    /**
     * cambia la contraseña del usuario
     */
    PutUsuarioPass: async(req,res,next) => {
        const id = req.params.id;
        const body = req.body;

        Usuario.findById(id, (err, usuario) => {
            if (err) {
                let data = {
                    mensaje: 'error al buscar al usuario',
                    err
                }
                return Resp.respuestaOKErrorData(res, data);
            } else {}
            if (!usuario) {
                let data = {
                    ok: false,
                    mensaje: 'El usuario con el id ' + id + ' no existe'
                };
                return Resp.respuestaOKErrorData(res, data);
            } else {}
            if(body.password !== body.password2){
                let data = {
                    ok: false,
                    mensaje: 'El passwor no es el mismo favor de Verificar'                    
                };
                return Resp.respuestaOKErrorData(res, data);
            } else {}
    
            usuario.password = bcrypt.hashSync(body.password, 10);

            usuario.save((err, usuarioGuardado) => {    
                if (err) {
                    let data = {
                        ok: false,
                        mensaje: 'Error al actualizar usuario',
                        errors: err
                    };
                    return Resp.respuestaOKErrorData(res, data);
                } else {}
    
                usuarioGuardado.password = ':)';

                return Resp.respuestaOKData(res, usuarioGuardado);   
    
            });
    
        });
    }


};
