var mongoose = require('mongoose');
var unique = require('mongoose-unique-validator');

var ArticuloSchema = new mongoose.Schema({
    referencia: {type:String,unique:true},
    nombre: String,
    precio: Number,
})

ArticuloSchema.plugin(unique,{message:'La referencia introducida ya existe'})

module.exports = mongoose.model('Articulo',ArticuloSchema);