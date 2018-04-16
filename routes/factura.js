var express = require('express');
var mongoose = require('mongoose');

var Factura = require('../models/factura');

var app = express();

app.get('/',(req,res,next)=> {
    
    Factura.find({}).exec((err,factura)=> {
        if(err) {
            return resizeBy.status(500).json({
                ok:false,
                mensaje:'Error de acceso a DB',
                errores:err
            })
        }
        res.status(200).json({
            ok:true,
            factura:factura
        })
    });

});

app.get('/:id',function(req,res,next) {
    Factura.findById(req.params.id,(err, factura)=> {
        if(err) {
            return resizeBy.status(500).json({
                ok: false,
                mensaje: 'Error en el acceso a la DB',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            factura: factura
        })
    })
});

app.post('/',(req,res)=> {

    var body = req.body;

    var factura = new Factura({
        proveedor: body.proveedor,
        cif: body.cif,
        fecha: body.fecha,
        concepto: body.concepto,
        base: body.base,
        retencion: body.retencion,
        iva: body.iva,
        irpf: body.irpf,
        importe: body.importe,
        total: body.total
    });

    factura.save((err,facturaGuardado)=> {
        if(err) {
            return res.status(400).json({
                ok:false,
                mensaje:'Error al crear la factura',
                errores:err
            });
        }
        res.status(200).json({
            ok:true,
            factura:facturaGuardado
        })
    });

});

app.put('/:id',function(req,res,next) {

    Factura.findByIdAndUpdate(req.params.id,req.body,function(err,datos) {  //Busca un documento por su ID y lo actualiza
        if(err) return next(err);
        res.status(201).json({
            ok: 'true',
            mensaje: 'Factura actualizada'
        });
    });    
});

app.delete('/:id',function(req,res,next) {

    Factura.findByIdAndRemove(req.params.id,function(err,datos) {    //Busca un documento por su ID y lo elimina
        if(err) return next(err);
        var mensaje = 'La factura de ' + datos.proveedor + ' eliminada';
        res.status(200).json({
            ok: 'true',
            mensaje: mensaje
        });
    });  

});

module.exports = app;