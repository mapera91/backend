var mongoose = require('mongoose');
var unique = require('mongoose-unique-validator');

var SesionSchema = new mongoose.Schema({
    nombre:String,
    fechaLogin:Date,
    fechaLogout:Date,
    duracion:String
})

SesionSchema.plugin(unique);

module.exports = mongoose.model('Sesion',SesionSchema);