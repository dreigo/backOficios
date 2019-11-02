const Usuario = require('../../models/usuario_model');
const Resp = require('../../helpers/respuestas');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SEED = require('../../config/config').SEED;

module.exports = {
    /**
     * Autentiación normal con jwt
     */
    PostLogin: async(req,res,next) => {
        try {
            const body = req.body;

            let usuarioDB = await Usuario.findOne({usuario: body.usuario});
            if (!usuarioDB) {
                let data = {
                    ok: false,
                    mensaje: 'Credenciales incorrectas - email',
                    errors: err
                };
                Resp.respuestaOKErrorData(res, data);
            } else {}
            
            if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
                let data = {
                    ok: false,
                    mensaje: 'Credenciales incorrectas - password',
                    errors: err
                };
                Resp.respuestaOKErrorData(res, data);
            }
            
            if (usuarioDB.estado === 0 || usuarioDB.estado === 2) { // validamos el estado de la cuenta
                let data = {
                    ok: false,
                    mensaje: 'Cuenta inactiva o desactivada, Comuniquese con Mauricio Robles H. para que pueda ingresar al sistema',
                    errors: err
                };
                Resp.respuestaOKErrorData(res, data);
            }

            // reseteo pass para el frond y creamos token
            usuarioDB.password = ':)';
            const token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 43200 }); // 12 horas

            let data = {
                ok: true,
                usuario: usuarioDB,
                token: token,
                id: usuarioDB._id,
                menu: obtenerMenu(usuarioDB.role)
            };

            return Resp.respuestaOKData(res, data);

        } catch (error) {
            let mensaje = 'Error desconocino al login con un Usuario';
            return Resp.respuestaErrorServer(res, mensaje, error);
        }
    }
};

function obtenerMenu(ROLE) {

    var menu = [{
            titulo: 'Principal',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Dashboard', url: '/dashboard' },
                // { titulo: 'ProgressBar', url: '/progress' },
                // { titulo: 'Gráficas', url: '/graficas1' },
                // { titulo: 'Promesas', url: '/promesas' },
                // { titulo: 'RxJs', url: '/rxjs' }
                // { titulo: 'Personal', url: '/personal' },
                // { titulo: 'Giros', url: '/giros' },
                // { titulo: 'Oficios', url: '/oficios' },
                // { titulo: 'Home', url: '/graficas-arbolado' },
                // { titulo: 'Arbolado', url: '/arbolado' },
                // { titulo: 'Busqueda Folio Arbolado', url: '/busqueda-arbolado' },
                // { titulo: 'Dictaminador', url: '/dictaminador' },
            ]
        },
        // {
        //     titulo: 'Mantenimientos',
        //     icono: 'mdi mdi-folder-lock-open',
        //     submenu: [
        //         // { titulo: 'Usuarios', url: '/usuarios' },
        //         // { titulo: 'Hospitales', url: '/hospitales' },
        //         // { titulo: 'Médicos', url: '/medicos' },
        //     ]
        // },
        {
            titulo: 'Catalogos',
            icono: 'mdi mdi-folder-multiple',
            submenu: [
                // se agregan en el if de ADMIN_ROLE
            ]
        }
    ];

    // console.log('ROLE', ROLE);

    if (ROLE === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: '/usuarios' });
        // menu[2].submenu.unshift({ titulo: 'Oficinas', url: '/oficinas' });
        // menu[2].submenu.unshift({ titulo: 'Estructura', url: '/estructura' });
        // menu[2].submenu.unshift({ titulo: 'Tags', url: '/tags' });
        // menu[2].submenu.unshift({ titulo: 'Catalogo Arboles', url: '/Catalogo-Arbol' });


    } else {
        menu.pop(); //elimina el ultimo menu
        menu.pop(); //elimina el penultimo menu
        // hace lo mismo que arriba
        // menu.splice(1, 1);
        // menu.splice(1, 1);
    }
    if (ROLE === 'OFICIO_ROLE') {
        menu[0].submenu = [];
        menu[0].submenu.push(
            { titulo: 'Dashboard', url: '/dashboard' }, 
            { titulo: 'Oficios', url: '/oficios' }, 
            { titulo: 'Nuevo', url: '/nuevo' },
            { titulo: 'Arbolado', url: '/arbolado' },
            )
    } else {}
    if (ROLE === 'ARBOLADO_ROLE') {
        menu[0].submenu = [];
        menu[0].submenu.push(
            { titulo: 'Home', url: '/graficas-arbolado' },
            { titulo: 'Arbolado', url: '/arbolado' },
            { titulo: 'Busqueda Folio Arbolado', url: '/busqueda-arbolado' },
            { titulo: 'Dictaminador', url: '/dictaminador' },
            )
    } else {}
    if (ROLE === 'ARBOLADO_FIND_ROLE') {
        menu[0].submenu = [];
        menu[0].submenu.push(
            { titulo: 'Busqueda Folio Arbolado', url: '/busqueda-arbolado' },
            )
    } else {}


    return menu;

}
