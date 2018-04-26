var express = require('express');
var bcryptjs = require('bcryptjs');
var jsonwebtoken = require('jsonwebtoken');
var Usuario = require('../models/usuario');
var Sesion = require('../models/sesion');

var app = express();

app.post('/',(req,res,next)=> {
    var body = req.body;

    Usuario.findOne({email:body.email},(err,datos)=> {
        if(err) {
            return res.status(500).json({
                ok:false,
                mensaje:'Error de conexión a DB',
                errores:err
            });
        }
        if(!datos) {
            return res.status(400).json({
                ok:false,
                mensaje:'El correo electrónico no existe',
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

        var token = jsonwebtoken.sign({usuario:datos},'hghjgersweio',{expiresIn:60});

        res.status(200).json({
            ok:true,
            token: token,
            nombre: datos.nombre,
            rol: datos.rol,
            id: datos._id
        });
    });
})

module.exports = app;