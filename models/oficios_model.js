var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var oficioSchema = new Schema({
    fechaRecepcion: {type: String, required: true, uppercase: true},
    fechaRecepcionEpoch: {type: String, required: true, uppercase: true},
    tipoDeDocumento: {type: String, required: true, uppercase: true},
    noInterno: {type: String, required: true, uppercase: true},
    noDocumento: {type: String, required: true, uppercase: true},
    tema: {type: String, required: true, uppercase: true},    
    // Solicitante
    nombreSolicitante: {type: String, required: true, uppercase: true},
    aPaternoSolicitante: {type: String, required: true, uppercase: true},
    aMaternoSolicitante: {type: String, required: true, uppercase: true},
    cargoSolicitante: {type: String, required: true, uppercase: true},
    areaSolicitante: {type: String, required: true, uppercase: true},
    // Destino
    nombreDestino: {type: String, required: true, uppercase: true},
    aPaternoDestino: {type: String, required: true, uppercase: true},
    aMaternoDestino: {type: String, required: true, uppercase: true},
    cargoDestino: {type: String, required: true, uppercase: true},
    areaDestino: {type: String, required: true, uppercase: true},
    // Documento
    asunto: {type: String, required: true, uppercase: true},
    solicitud: {type: String, required: true, uppercase: true},
    referencias: {type: String, required: false, uppercase: true},
    turnado: [{
            nombreDestino: {type: String, required: false, uppercase: true},
            aPaternoDestino: {type: String, required: false, uppercase: true},
            aMaternoDestino: {type: String, required: false, uppercase: true},
            cargoDestino: {type: String, required: false, uppercase: true},
            areaDestino: {type: String, required: false, uppercase: true},
            estado: {type: String, required: false, uppercase: true}, // 0 inactivo, 1 activo
            fechaCreacion: {type: String, required: false},        
    }],
    // Respuesta
    respuesta: [{
        respuesta: {type: String, required: false, uppercase: true},
        noOficioRespuesta: {type: String, required: false},
        fechaRespuesta: {type: String, required: false},
        fechaRespuestaEpoch: {type: String, required: false},
        observacionesRespuesta: {type: String, required: false},
    }],
    observaciones: { type: String, required: false },
    estado: { type: String, required: false }, // 0 inactivo, 1 activo, 2 turnado, 3 respondido
    archivado: { type: String, required: false },
    fechaCreacion: { type: String, required: false },
    fechaCreacionEpoch: { type: String, required: false },
    
});

oficioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('Oficio', oficioSchema);