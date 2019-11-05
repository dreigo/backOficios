const Oficio = require('../../models/oficios_model');
const Resp = require('../../helpers/respuestas');
const Fechas = require('../../helpers/fechas');

module.exports = {

    /**
     * Agrega una nuevo turno al oficio
     */
    PostRespId: async(req,res) => {
        const id = req.params.id;
        const body = req.body;
        const oficio = await Oficio.findById(id);
        body.fechaRespuestaEpoch = Fechas.StringAEpoch(body.fechaRespuesta);
        oficio.respuesta.push(body);
        try {
            let oficioSave = await oficio.save();
            return Resp.respuestaOKData(res,oficioSave);
        } catch (error) {
            return Resp.respuestaErrorServer(res,'Error al salvar la actualisación oficio',err);
        }
    },

    /**
     * Actualiza un turno de un oficio 
     */
    PutRespId: async(req, res) => {
        try {
            const id = req.params.id;
            const body = req.body;
            const oficio = await Oficio.findById(id);
            let index = -1;
            for (let i = 0; i < oficio.respuesta.length; i++) {
                const el = oficio.respuesta[i];
                if(body._idRespuesta === el.id){
                    index = i;
                }
            }
            if (index === -1) {
                return Resp.respuestaError(res, 'No se encontro el turno')
            } else {

                oficio.respuesta[index].respuesta = body.respuesta;
                oficio.respuesta[index].noOficioRespuesta = body.noOficioRespuesta;
                oficio.respuesta[index].fechaRespuesta = body.fechaRespuesta;
                oficio.respuesta[index].fechaRespuestaEpoch = body.fechaRespuestaEpoch;
                oficio.respuesta[index].observacionesRespuesta = body.observacionesRespuesta;

            }
            try {
                let oficioSave = await oficio.save();
                return Resp.respuestaOKData(res,oficioSave);
            } catch (error) {
                return Resp.respuestaErrorServer(res,'Error al salvar la actualisación oficio',err);
            }   
            
        } catch (error) {
            
        }
    },

    /**
     * Borra un turno 
     */
    DeleteRespId: async(req,res) => {
        const id = req.params.id;
        const body = req.body;
        try {
            let index = -1;
            const oficio = await Oficio.findById(id);

            for (let i = 0; i < oficio.respuesta.length; i++) {
                const el = oficio.respuesta[i];
                if(body._idRespuesta === el.id){
                    index = i;
                }
            }
            if (index === -1) {
                return Resp.respuestaError(res, 'No se encontro el turno')
            } else {
                oficio.respuesta.splice(index, 1);
            }

            try {
                let oficioSave = await oficio.save();
                return Resp.respuestaOKData(res,oficioSave);
            } catch (error) {
                return Resp.respuestaErrorServer(res,'Error al salvar la actualisación oficio',err);
            }

        } catch (error) {
            return Resp.respuestaOKErrorData(res, error);
        }
    }

};
