var express = require('express');
var mongoose = require('mongoose');

var Proveedor = require('../models/proveedor');
var autentoken = require('../middleware/autentoken');

var app = express();

app.get('/',(req,res,next)=> {
    
    var desde = req.query.desde;
    desde = Number(desde);

    Proveedor.find({}).skip(desde).limit(5).exec((err,proveedores)=> {
        if(err) {
            return res.status(500).json({
                ok:false,
                mensaje:'Error de acceso a DB',
                errores:err
            })
        }

        Proveedor.count({},(err,total)=> {
            res.status(200).json({
                ok:true,
                proveedores:proveedores,
                total:total
            })
        })
    });

});

app.get('/:id',function(req,res,next) {
    Proveedor.findById(req.params.id,(err, proveedor)=> {
        if(err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error en el acceso a la DB',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            proveedor: proveedor
        })
    })
});

app.post('/',(req,res,next)=> {

    var body = req.body;

    var proveedor = new Proveedor({
        nombre: body.nombre,
        cif: body.cif,
        domicilio: body.domicilio,
        cp: body.cp,
        localidad: body.localidad,
        provincia: body.provincia,
        telefono: body.telefono,
        email: body.email,
        contacto: body.contacto
    });

    proveedor.save((err,proveedorGuardado)=> {
        if(err) {
            return res.status(400).json({
                ok:false,
                mensaje:'Error al crear el proveedor',
                errores:err
            });
        }
        res.status(200).json({
            ok:true,
            proveedor:proveedorGuardado
        })
    });

});

app.put('/:id',function(req,res,next) {

    Proveedor.findByIdAndUpdate(req.params.id,req.body,function(err,datos) {  //Busca un documento por su ID y lo actualiza
        if(err) return next(err);
        res.status(201).json({
            ok: 'true',
            mensaje: 'Proveedor actualizado'
        });
    });    
});

// app.delete('/:id',autentoken.verificarToken,function(req,res,error) {    -> Eliminacion de un proveedor con autenticacion de token
app.delete('/:id',function(req,res,error) {     //Eliminamos el token para la aplicacion IONIC

    Proveedor.findByIdAndRemove(req.params.id,function(err,datos) {    //Busca un documento por su ID y lo elimina
        if(err) return next(err);
        var mensaje = 'El proveedor ' + datos.nombre + ' ha sido eliminado';
        res.status(200).json({
            ok: 'true',
            mensaje: mensaje
        });
    });  

});

module.exports = app;