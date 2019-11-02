
/**
 * Respuesta de prueba
 * @param {object} res objeto de respuesta
 * @param {string} mensaje mensaje a mostrar
 */
function respuestaOKPrueba(res, mensaje) {
    return res.status(200).json({
        ok: true,
        mensaje
    });
}

/**
 * Respuesta sin error con inforamcion de regreso
 * @param {object} res objeto de respuesta
 * @param {object} data informacion a regresar
 */
function respuestaOKData(res, data) {
    return res.status(200).json({
        ok: true,
        data
    });
}

/**
 * Respuesta sin error con inforamcion de regreso
 * @param {object} res objeto de respuesta
 * @param {object} data informacion a regresar
 */
function respuestaOKErrorData(res, data) {
    return res.status(200).json({
        ok: false,
        data
    });
}

/**
 * respuesta de algun error falta de informacion
 * o no encontro nada
 * @param {object} res objeto de respuesta
 * @param {string} mensaje mensaje de error
 */
function respuestaError(res, mensaje) {
    return res.status(200).json({
        ok: false,
        mensaje
    });
}

/**
 * respuesta de que exploto el servidor
 * @param {object} res ojeto de respuesta
 * @param {string} mensaje mensaje de error personalisado
 * @param {object} error error del server (catch)
 */
function respuestaErrorServer(res, mensaje, error) {
    if(error.stack){
        return res.status(400).json({
            ok: false,
            mensaje,
            error: error.message,
            stack: error.stack
        });
    }else{
        return res.status(400).json({
            ok: false,
            mensaje,
            error: error.message
        });
    }
}

module.exports = {
    respuestaOKData,
    respuestaOKPrueba,
    respuestaError,
    respuestaErrorServer,
    respuestaOKErrorData
}