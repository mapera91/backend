var mongoose = require('mongoose');
//var unique = require('mongoose-unique-validator');
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection('mongodb://localhost:27017/erp');

autoIncrement.initialize(connection);

var PresupuestoSchema = new mongoose.Schema({
    cliente: String,
    cif: String,
    fecha: String,
    items: Array,
    suma: Number,
    tipo: Number,
    iva: Number,
    total: Number
})

//PresupuestoSchema.plugin(unique,{message:'El cif introducido ya existe'})
PresupuestoSchema.plugin(autoIncrement.plugin,{model:'Presupuesto',field:'numero',startAt:1});

module.exports = mongoose.model('Presupuesto',PresupuestoSchema);