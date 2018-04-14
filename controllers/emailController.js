let usersModel=require('../models/usersModel');
let bcrypt= require('bcrypt-nodejs');
let emailController={};
const Email= require('../config/emailConf');

emailController.recover= (req,res,next)=> {
    usersModel.checkMail(req.body.emailRecover,(err,resultado)=>{
        let hash = encodeURIComponent(resultado[0].hash);
        if (err) next();
        if (resultado == '') {
            req.flash('mailError', 'El email no existe, inténtelo de nuevo')
            res.redirect('/users/login');
        }
        else {
            req.flash('recoverCorrect','Se le ha enviado un email con su contraseña')
            let message= {
                to: req.body.emailRecover,
                subject: 'Email de recuperación de contraseña',
                html: '<p>Estimado/a '+resultado[0].usuario+':<br>Haga click en el enlace para recuperar su contraseña.</p><br>' +
                '<a href="http://localhost:3000/email/recover/'+hash+'">Recuperar contraseña de Geekshubs travels.</a>'
            }
            Email.transporter.sendMail(message,(error,info) =>{
                if (error){
                    next()
                }
                Email.transporter.close();
            })
            res.redirect('/users/login');
            }
        })
};

emailController.checkHash= (req,res,next)=>{
    let hash = decodeURIComponent(req.params.hash);
    usersModel.checkHash(hash,(error,resultado)=>{
        if (error) cb(error)
        if (resultado== ''){
            next()
        }
        res.render('users/recuperar',{
            title: 'Recuperar Contraseña',
            layout: 'layout',
            id: resultado[0].id
        })
    })
};

emailController.changePass =(req,res,next) =>{
    let hash = bcrypt.hashSync(req.body.password);
    let Usuario = {
        id: req.body.id,
        password: req.body.password,
        hash: hash
    }
    usersModel.changePass(Usuario,(error, resultado)=>{
        if (error) next();
        req.flash('passwordChanged', 'Su contraseña se ha cambiado correctamente.');
        res.redirect('/users/login')
    })


};

emailController.recoverAdmin =(req,res,next) =>{
    usersModel.getUserById(req.params.id,(error,resultado)=>{
        if (error) next()
        if (req.session.isAdmin) {
            let hash = encodeURIComponent(resultado[0].hash);
                req.flash('sendEmailPass','Se ha enviado un email con su contraseña al usuario')
                let message= {
                    to: resultado[0].email,
                    subject: 'Email de recuperación de contraseña',
                    html: '<p>Estimado/a '+resultado[0].usuario+':<br>Haga click en el enlace para recuperar su contraseña.</p><br>' +
                    '<a href="http://localhost:3000/email/recover/'+hash+'">Recuperar contraseña de Geekshubs travels.</a>'
                }
                Email.transporter.sendMail(message,(error,info) =>{
                    if (error){
                        next()
                    }
                    Email.transporter.close();
                })
                res.redirect('/admins/userpanel');
        }
        else{
            next()
        }
    })
};

emailController.activate = (req,res,next)=>{
    let hash = decodeURIComponent(req.params.hash);
    usersModel.activate(hash,(err,resultado)=>{
        if (err) {
            next();
        } else {
            req.flash('activated','Su cuenta ha sido activada , ahora puede iniciar sesión!');
            res.redirect('/users/login');
        }

    })

}

module.exports = emailController;