const Oficio = require('../../models/oficios_model');
const Resp = require('../../helpers/respuestas');
const Fechas = require('../../helpers/fechas');

module.exports = {
    PostOficio: async(req,res) => {
        try {
            const body = req.body;
            
            const oficio = new Oficio({
                fechaRecepcion: Fechas.convertirStringAFecha(body.fechaRecepcion),
                fechaRecepcionEpoch: Fechas.StringAEpoch(body.fechaRecepcion),
                tipoDeDocumento: body.tipoDeDocumento,
                noInterno: body.noInterno,
                noDocumento: body.noDocumento,
                tema: body.tema,
                // solicitante
                nombreSolicitante: body.nombreSolicitante,
                aPaternoSolicitante: body.aPaternoSolicitante,
                aMaternoSolicitante: body.aMaternoSolicitante,
                cargoSolicitante: body.cargoSolicitante,
                areaSolicitante: body.areaSolicitante,
                // destino
                nombreDestino: body.nombreDestino,
                aPaternoDestino: body.aPaternoDestino,
                aMaternoDestino: body.aMaternoDestino,
                cargoDestino: body.cargoDestino,
                areaDestino: body.areaDestino,
                // documento
                asunto: body.asunto,
                solicitud: body.solicitud,
                referencias: body.referencias,
            });

            try {
                let oficioGuardado = await oficio.save();
                return Resp.respuestaOKData(res, oficioGuardado);
            } catch (error) {
                let data = {
                    mensaje: 'Error al guardar nuevo oficio',
                    error
                };
                return Resp.respuestaOKErrorData(res, data);
            }
        } catch (error) {
            Resp.respuestaErrorServer(res, 'Error al crear un oficio', error)
        }
    },
    GetOficios: async(req, res) => {
        try {
            let oficio = await Oficio.find({});
            return Resp.respuestaOKData(res, oficio);
        } catch (error) {
            return Resp.respuestaOKErrorData(res, error);
        }
    },
    GetOficioId: async(req, res) => {
        try {
            let id = req.params.id;
            let oficio = await Oficio.findById(id);
            return Resp.respuestaOKData(res, oficio);
        } catch (error) {
            return Resp.respuestaOKErrorData(res, error);
        }
    },
    PutOficioId: async(req,res) => {
        try {
            const id = req.params.id;
            const body = req.body;

            let oficio = await Oficio.findById(id);

            oficio.fechaRecepcion = Fechas.convertirStringAFecha(body.fechaRecepcion);
            oficio.fechaRecepcionEpoch = Fechas.StringAEpoch(body.fechaRecepcion);
            oficio.tipoDeDocumento = body.tipoDeDocumento;
            oficio.noInterno = body.noInterno;
            oficio.noDocumento = body.noDocumento;
            oficio.tema = body.tema;
            // solicitant
            oficio.nombreSolicitante = body.nombreSolicitante;
            oficio.aPaternoSolicitante = body.aPaternoSolicitante;
            oficio.aMaternoSolicitante = body.aMaternoSolicitante;
            oficio.cargoSolicitante = body.cargoSolicitante;
            oficio.areaSolicitante = body.areaSolicitante;
            // destin
            oficio.nombreDestino = body.nombreDestino;
            oficio.aPaternoDestino = body.aPaternoDestino;
            oficio.aMaternoDestino = body.aMaternoDestino;
            oficio.cargoDestino = body.cargoDestino;
            oficio.areaDestino = body.areaDestino;
            // document
            oficio.asunto = body.asunto;
            oficio.solicitud = body.solicitud;
            oficio.referencias = body.referencias;

            try {
                let oficioSave = await oficio.save();
                return Resp.respuestaOKData(res,oficioSave);
            } catch (error) {
                return Resp.respuestaErrorServer(res,'Error al salvar la actualisación oficio',err);
            }
            
        } catch (error) {
            return Resp.respuestaErrorServer(res,'Error al procesar el salvado de oficio',err);
        }
    },
    
};
