var express = require('express');
var mongoose = require('mongoose');

var Articulo = require('../models/articulo');

var app = express();

app.get('/',(req,res,next)=> {
   
    Articulo.find({}).exec((err,articulos)=> {
        if(err) {
            return res.status(500).json({
                ok:false,
                mensaje:'Error de acceso a DB',
                errores:err
            })
        }
        res.status(200).json({
            ok:true,
            articulos:articulos
        })
    });

});

app.get('/:id',function(req,res,next) {
    Articulo.findById(req.params.id,(err, articulo)=> {
        if(err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error en el acceso a la DB',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            articulo: articulo
        })
    })
});

app.post('/',(req,res)=> {

    var body = req.body;

    var articulo = new Articulo({
        referencia: body.referencia,
        nombre: body.nombre,
        precio: body.precio,
    });

    articulo.save((err,articuloGuardado)=> {
        if(err) {
            return res.status(400).json({
                ok:false,
                mensaje:'Error al crear el artículo',
                errores:err
            });
        }
        res.status(200).json({
            ok:true,
            articulo:articuloGuardado
        })
    });

});

app.put('/:id',function(req,res,next) {

    Articulo.findByIdAndUpdate(req.params.id,req.body,function(err,datos) {  //Busca un documento por su ID y lo actualiza
        if(err) return next(err);
        res.status(201).json({
            ok: 'true',
            mensaje: 'Artículo actualizado'
        });
    });    
});

app.delete('/:id',function(req,res,next) {

    Articulo.findByIdAndRemove(req.params.id,function(err,datos) {    //Busca un documento por su ID y lo elimina
        if(err) return next(err);
        var mensaje = 'Artículo ' + datos.nombre + ' eliminado';
        res.status(200).json({
            ok: 'true',
            mensaje: mensaje
        });
    });  

});

module.exports = app;