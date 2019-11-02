var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;


var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE', 
            'OFICIO_ROLE','DIRECTOR_GENERAL_ROLE',
            'ESTRUCTURA_ROLE','ARBOLADO_ROLE',
            'ARBOLADO_FIND_ROLE', 'ARBOLADO_DICTAMINADOR_ROLE'],
    message: '{VALUE} no es un rol permitido'
};

var estadosValidos = {
    values: [0, 1, 2], // inactivo, activo, suspendido
    message: 'Debe tener un estado valido: {VALUE}'
}


var usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    aPaterno: { type: String, required: [true, 'El apellido paterno es necesario'] },
    aMaterno: { type: String, required: [true, 'El apellido materno es necesario'] },
    usuario: { type: String, unique: true, required: [true, 'El usuario es necesario'] },
    email: { type: String, unique: false, default: '' }, // se coloca ya que mongoose manda error pero por el momento no se ocupa
    password: { type: String, required: [true, 'La contraseña es necesaria']},
    estado: { type: Number, required: true, default: 2, enum: estadosValidos },
    img: { type: String, default: '', required: false },
    role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos }
});

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('Usuario', usuarioSchema);