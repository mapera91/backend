var express = require('express');
var bcryptjs = require('bcryptjs');
var Usuario = require('../models/usuario');

var app = express();

app.get('/',(req,res,next)=> {
    
    Usuario.find({}).exec((err,usuarios)=> {
        if(err) {
            return res.status(500).json({
                ok:false,
                mensaje:'Error de acceso a DB',
                errores:err
            })
        }
        res.status(200).json({
            ok:true,
            usuarios:usuarios
        })
    });

});

app.post('/',(req,res,next)=> {
    var body = req.body;
    var usuario = new Usuario({
        nombre:body.nombre,
        email:body.email,
        password:bcryptjs.hashSync(body.password,10),
        rol:body.rol,
    });

    usuario.save((err,datos)=> {
        if(err) {
            return res.status(400).json({ 
                ok:false,
                mensaje:'Error al crear el usuario',
                errores:err
            });
        }
        res.status(200).json({
            ok:true,
            mensaje:'Usuario creado correctamente',
        });
    });
})

app.put('/:id',(req,res,next)=> {
    var body = req.body;

    Usuario.findById(req.params.id,(err,usuario)=> {
        if(err) {
            return res.status(500).json({
                ok:false,
                mensaje:'Error de conexión con el servidor'
            });
        }

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.rol = body.rol;

        usuario.save((err,usuarioModificado)=> {
            if(err) {
                return res.status(400).json({
                    ok:false,
                    errores:err,
                    mensaje:'Error al actualizar el usuario'
                });
            }
            res.status(200).json({
                ok:true,
                mensaje:'Usuario actualizado'
            });
        });
    });

})

app.delete('/:id',function(req,res,next) {
    
    Usuario.findByIdAndRemove(req.params.id,function(err,datos) {
        if(err) return next(err);
        var mensaje = 'Usuario ' + datos.nombre + ' eliminado';
        res.status(200).json({
            ok: 'true',
            mensaje: mensaje
        });
    })
})

module.exports = app;