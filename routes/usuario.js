var express = require('express');
var Usuario = require('../models/usuario');

var app = express();

app.post('/',function(req,res,next) {
    var body = req.body;
    var usuario = new Usuario({
        nombre:body.nombre,
        email:body.email,
        password:body.password
    });

    usuario.save((err,datos)=> {
        if(err) {
            return res.status(400).json({
                ok:false,
                mensaje:'Error al crear el usuario',
                errores:err
            });
        }
        res.status(300).json({
            ok:true,
            mensaje:'Usuario creado correctamente',
        });
    });
})

module.exports = app;