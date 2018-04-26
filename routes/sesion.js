var express = require('express');
var bcryptjs = require('bcryptjs');
var Sesion = require('../models/sesion');

var app = express();

app.get('/',(req,res,next)=> {
    
    Sesion.find({}).exec((err,sesiones)=> {
        if(err) {
            return res.status(500).json({
                ok:false,
                mensaje:'Error de acceso a DB',
                errores:err
            })
        }
        res.status(200).json({
            ok:true,
            sesiones:sesiones
        })
    });

});

module.exports = app;