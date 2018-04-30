var express = require('express');
var mongoose = require('mongoose');
var Sesion = require('../models/sesion');

var app = express();

app.get('/',(req,res,next)=> {

    var nombre = req.query.nombre;

    Sesion.find({nombre:nombre}).sort({_id:-1}).exec((err,sesiones)=> {
        if(err) {
            return res.status(500).json({
                ok:false,
                mensaje:'Error de acceso a la DB',
                errores:err
            });
        }
        res.status(200).json({
            ok:true,
            sesiones:sesiones
        });
    });
})

app.post('/',(req,res,next)=> {
    
    var body = req.body;
    var sesion = new Sesion ({
        nombre:body.nombre,
        fechaLogin:body.fechaLogin,
        fechaLogout:body.fechaLogout,
        duracion:body.duracion
    });

    sesion.save((err,sesionGuardada)=> {
        if(err) {
            return res.status(400).json({
                ok:false,
                mensaje:'La sesion no esta iniciada',
                errores:err
            });
        }
        res.status(200).json({
            ok:true,
            sesion:sesionGuardada
        });
    });
})

module.exports = app;