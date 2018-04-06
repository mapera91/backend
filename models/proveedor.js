var mongoose = require('mongoose');
var unique = require('mongoose-unique-validator');

var ProveedorSchema = new mongoose.Schema({
    nombre: String,
    cif: {type:String,unique:true},
    domicilio: String,
    cp: Number,
    localidad: String,
    provincia: String,
    telefono: String,
    email: String,
    contacto: String
})

ProveedorSchema.plugin(unique,{message:'El cif introducido ya existe'})

module.exports = mongoose.model('Proveedor',ProveedorSchema);