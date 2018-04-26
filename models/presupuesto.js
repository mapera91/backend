var mongoose = require('mongoose');
var unique = require('mongoose-unique-validator');

var PresupuestoSchema = new mongoose.Schema({
    proveedor: String,
    cif: {type:String,unique:true},
    fecha: Date,
    concepto: String,
    base: Number,
    retencion: Boolean,
    iva: Number,
    irpf: String,
    importe: String,
    total: String
})

PresupuestoSchema.plugin(unique,{message:'El cif introducido ya existe'})

module.exports = mongoose.model('Presupuesto',PresupuestoSchema);