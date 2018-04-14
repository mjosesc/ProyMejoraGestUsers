var destinationsModel = require('../models/destinationsModel');
var destinationsController = {};

destinationsController.getAllDestinationsHome= (req, res, next)=> {
    destinationsModel.getAllDestinations((err,destinos)=>{
        if(err) {
            res.status(500).json(err);
        }else{
            if(!req.session.username){
                res.render('home',{
                    title: 'Home Page',
                    layout: 'layout',
                    destinos: destinos
                });
            }else{
                if(req.session.isAdmin){
                    res.render('home',{
                        title: 'Home Page',
                        layout: 'layout',
                        destinos: destinos,
                        name: req.session.username,
                        isLogged: true,
                        isAdmin: true
                    });
                }else{
                    res.render('home',{
                        title: 'Home Page',
                        layout: 'layout',
                        destinos: destinos,
                        name: req.session.username,
                        isLogged: true,
                    });
                }
            }
        }
    })
};

destinationsController.getAllDestinationsAdmin= (req, res, next)=> {
    destinationsModel.getAllDestinations((err,destinos)=>{
        if(err) {
            res.status(500).json(err);
        }else{
            if(!req.session.username){
                res.redirect('/');
            }else{
                if(req.session.isAdmin){
                    res.render('admins/adminPanel',{
                        title: 'Panel de administrador',
                        layout: 'layout',
                        destinos: destinos,
                        name: req.session.username,
                        isLogged: true,
                        isAdmin: true,
                        añadir: req.flash('añadir'),
                        borrar: req.flash('borrar'),
                        actualizar: req.flash('actualizar')
                    })
                }else{
                    res.redirect('/');
                }
            }
        }
    })
};

destinationsController.createDestination = (req, res, next)=>{
    let activo = 0;
    if (req.body.activo){
        activo = 1;
    }else {
        activo = 0;
    }
    let destino = {
        nombre: req.body.nombre,
        titulo_descr: req.body.descripcion,
        tipo: req.body.tipo,
        oferta: req.body.oferta,
        precio: req.body.precio,
        plazas: req.body.plazas,
        activo: activo,
        imagen: req.body.imagen,
    }
    let viaje={
        fecha_ida:req.body.fecha_ida,
        hora_ida:req.body.hora_ida,
        fecha_vuelta: req.body.fecha_vuelta,
        hora_vuelta:req.body.hora_vuelta,
        aeropuerto:req.body.aeropuerto
    }
    destinationsModel.createDestination(destino,viaje,(err,resultado)=>{
        if(err) {
            res.status(500).json(err);
        }else{
            if(!req.session.username){
                res.redirect('/');
            }else{
                if(req.session.isAdmin){
                    req.flash('añadir','Se ha creado el viaje correctamente!')
                    res.redirect('/admins/adminpanel');
                }else{
                    res.redirect('/');
                }
            }
        }
    })
};

destinationsController.deleteDestination = (req, res, next) =>{
    if (req.session.username){
        if(req.session.isAdmin){
            destinationsModel.deleteDestination(req.params.id, (err, result)=>{
                if(err){
                    res.status(500).json(err);
                }else{
                    req.flash('borrar','Se ha borrado el registro '+req.params.id+' satisfactoriamente!')
                    res.redirect('/admins/adminpanel');
                }
            })
        }else {
            res.redirect('/');
        }
    }else {
        res.redirect('/');
    }

};

destinationsController.updateActive = (req,res,next)=>{
    if (req.session.username){
        if(req.session.isAdmin){
            destinationsModel.updateActive(req.params.id,(err,resultado)=>{
                if (err) {
                    res.status(500).json(err);
                }else {
                    req.flash('actualizar','Se ha actualizado el registro '+req.params.id+' satisfactoriamente!')
                    res.redirect('/admins/adminpanel');
                }
            })
        } else {
            res.redirect('/');
        }
    }else {
        res.redirect('/');
    }

};

module.exports = destinationsController;

