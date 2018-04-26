var express = require('express');
var bcryptjs = require('bcryptjs');
var jsonwebtoken = require('jsonwebtoken');
var Usuario = require('../models/usuario');
var Sesion = require('../models/sesion');

var app = express();

app.post('/',(req,res,next)=> {
    var body = req.body;

    Sesion.save((err,sesion)=> {
        if(err) {
            return res.status(500).json({
                ok:false,
                mensaje:'Error de conexión con la DB',
                errores:err
            });
        }
        if(!sesion) {
            return res.status(400).json({
                ok:false,
                mensaje:'La sesion no esta iniciada',
                errores:err
            });
        }
        if(!bcryptjs.compareSync(body.password,datos.password)) { 
            return res.status(400).json({
                ok:false,
                mensaje:'La contraseña no existe',
                errores:err
            });
        }

        var token = jsonwebtoken.sign({usuaio:datos},'hghjgersweio',{expiresIn:60});

        res.status(200).json({
            ok:true,
            nombre:datos.nombre,
            fechaLogout:datos.fechaLogout
        });
    });
})

module.exports = app;