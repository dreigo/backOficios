const Oficio = require('../../models/oficios_model');
const Resp = require('../../helpers/respuestas');
const Fechas = require('../../helpers/fechas');

module.exports = {

    /**
     * Agrega una nuevo turno al oficio
     */
    PostTurnadoId: async(req,res) => {
        const id = req.params.id;
        const body = req.body;
        const oficio = await Oficio.findById(id);
        oficio.turnado.push(body);
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
    PutTurnoId: async(req, res) => {
        try {
            const id = req.params.id;
            const body = req.body;
            const oficio = await Oficio.findById(id);
            let index = -1;
            for (let i = 0; i < oficio.turnado.length; i++) {
                const el = oficio.turnado[i];
                if(body._idTurno === el.id){
                    index = i;
                }
            }
            if (index === -1) {
                return Resp.respuestaError(res, 'No se encontro el turno')
            } else {
                
                oficio.turnado[index].nombreDestino = body.nombreDestino;
                oficio.turnado[index].aPaternoDestino = body.aPaternoDestino;
                oficio.turnado[index].aMaternoDestino = body.aMaternoDestino;
                oficio.turnado[index].cargoDestino = body.cargoDestino;
                oficio.turnado[index].areaDestino = body.areaDestino;
                oficio.turnado[index].estado = body.estado;
                oficio.turnado[index].fechaCreacion = body.fechaCreacion;

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
    DeleteTurnadoId: async(req,res) => {
        const id = req.params.id;
        const body = req.body;
        try {
            let index = -1;
            const oficio = await Oficio.findById(id);

            for (let i = 0; i < oficio.turnado.length; i++) {
                const el = oficio.turnado[i];
                if(body._idTurno === el.id){
                    index = i;
                }
            }
            if (index === -1) {
                return Resp.respuestaError(res, 'No se encontro el turno')
            } else {
                oficio.turnado.splice(index, 1);
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
