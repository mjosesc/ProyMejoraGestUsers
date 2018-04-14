var bcrypt = require('bcrypt-nodejs');
var usersModel =require('.././models/usersModel');
var userController = {};
var Email = require('../config/emailConf');

userController.register = function (req, res, next) {
    if(req.session.username){
        res.redirect('/');
    }else{
        res.render('users/register', {
            title: 'Registro',
            layout: 'layout',
            usernameError: req.flash('usernameError'),
            emailError: req.flash('emailError')

        });
    }

};

userController.postRegister = function (req, res, next){


    var hash = bcrypt.hashSync(req.body.password);

    var usuario = {
        usuario : req.body.usuario,
        email : req.body.email,
        password : req.body.password,
        hash : hash,
<<<<<<< HEAD
        isAdmin: 0,
        active:0
    };

    usersModel.register(usuario,function (err,resultado) {
        if (err) next();
=======
        isAdmin: 0
    };

    usersModel.register(usuario,function (err,resultado) {
        if (err){
            res.status(500).json(err);
        }else{
            //
>>>>>>> 936f0497dba612f67e4f4ea6a4a93a626c9508f1
            switch (resultado){
                case 1:
                    req.flash('usernameError','El usuario ya existe, inténtelo de nuevo')
                    res.redirect('/users/register');
                    break;
                case 2:
                    req.flash('emailError','El email ya existe, inténtelo de nuevo')
                    res.redirect('/users/register');
                    break;
                case 3:
<<<<<<< HEAD
                    req.flash('registerCorrectly','Se ha registrado correctamente, hemos enviado un correo para activar su cuenta!')
                    hash = encodeURIComponent(hash);
                    let message= {
                        to: usuario.email,
                        subject: 'Enlace de activación de la cuenta',
                        html: '<p>Estimado/a '+usuario.usuario+':<br>Haga click en el enlace para activa su cuenta.</p><br>' +
                        '<a href="http://localhost:3000/email/activate/'+hash+'">Active su cuenta de Geekshubs travels.</a>'
                    }
                    Email.transporter.sendMail(message,(error,info) =>{
                        if (error){
                            next()
                        }
                        Email.transporter.close();
                    })
                    res.redirect('/users/login');
                    break;
            }
=======
                    req.flash('registerCorrectly','Se ha registrado correctamente, ahora puede iniciar sesión')
                    res.redirect('/users/login');
                    break;
            }
        }
>>>>>>> 936f0497dba612f67e4f4ea6a4a93a626c9508f1
    })
};

userController.login = function (req, res, next) {
    if(req.session.username){
        next();
    }else{
        res.render('users/login', {
            title: 'login',
            layout: 'layout',
            registerCorrectly: req.flash('registerCorrectly'),
            usernameError: req.flash('usernameError'),
            passwordError: req.flash('passwordError'),
            mailError: req.flash('mailError'),
            recoverCorrect: req.flash('recoverCorrect'),
<<<<<<< HEAD
            passwordChanged: req.flash('passwordChanged'),
            noActivo:req.flash('noActivo'),
            activated:req.flash('activated')
=======
            passwordChanged: req.flash('passwordChanged')
>>>>>>> 936f0497dba612f67e4f4ea6a4a93a626c9508f1
        });
    }
};

userController.postLogin = function (req, res , next) {
    var usuario = {
        usuario: req.body.usuario,
        password: req.body.password
    }
    usersModel.login(usuario, function (err, resultado, usuarioRegistrado) {
<<<<<<< HEAD
        if (err) next(err);
=======
        if (err) {
            next(err);
        } else {
>>>>>>> 936f0497dba612f67e4f4ea6a4a93a626c9508f1
            switch (resultado) {
                case 1:
                    req.flash('usernameError', 'El usuario no existe!')
                    res.redirect('/users/login');
                    break;
                case 2:
                    req.flash('passwordError', 'La contraseña is incorrecta!')
                    res.redirect('/users/login');
                    break;
                case 3:
<<<<<<< HEAD
                    if (!usuarioRegistrado.active){
                        req.flash('noActivo','Su cuenta no esta activa , revisa su correo para activarla!')
                        res.redirect('/users/login');
                    }else {
                        req.session.username = usuarioRegistrado.usuario;
                        req.session.isAdmin = usuarioRegistrado.isAdmin;
                        res.redirect('/');
                    }
                    break;
            }
=======
                    req.session.username = usuarioRegistrado.usuario;
                    req.session.isAdmin = usuarioRegistrado.isAdmin;
                    res.redirect('/');
                    break;
            }

        }
>>>>>>> 936f0497dba612f67e4f4ea6a4a93a626c9508f1
    });
};

userController.logOut= function (req, res, next){
    if(!req.session.username){
        res.redirect('/');
    }else{
        req.session.destroy();
        res.redirect('/');
    }
};

userController.getAllUsers= function (req, res, next) {
    usersModel.getAllUsers((err,clientes)=>{
        if (err) next();
        if (req.session.isAdmin) {
            res.render('admins/userpanel',{
                layout: 'layout',
                title: 'Administrador Usuarios',
                clientes: clientes,
                isLogged: req.session.username,
                isAdmin: req.session.isAdmin,
                usernameError:req.flash('usernameError'),
                emailError: req.flash('emailError'),
                registerCorrectly:req.flash('registerCorrectly'),
                borrar: req.flash('borrar'),
                actualizar: req.flash('actualizar'),
                sendEmailPass: req.flash('sendEmailPass')
            })
        }
        })
};

userController.createUsers= function (req,res,next) {
    let hash = bcrypt.hashSync(req.body.password);
    let checkboxAdmin = 0;
    if (req.body.isAdmin){
        checkboxAdmin = 1;
    } else {
        checkboxAdmin = 0;
    }
    let checkboxActivo = 0;
    if (req.body.active){
        checkboxActivo = 1;
    } else {
        checkboxActivo = 0;
    }
    let usuario = {
        usuario: req.body.usuario,
        email: req.body.email,
        password:req.body.password,
        hash: hash,
        isAdmin: checkboxAdmin,
        active: checkboxActivo,
    }
    console.log(usuario);
    usersModel.register(usuario, function (error,resultado) {
        if (error){
            res.status(500).json(error);
        }else{
            switch (resultado){
                case 1:
                    req.flash('usernameError','El usuario ya existe, inténtelo de nuevo')
                    res.redirect('/admins/userpanel');
                    break;
                case 2:
                    req.flash('emailError','El email ya existe, inténtelo de nuevo')
                    res.redirect('/admins/userpanel');
                    break;
                case 3:
                    req.flash('registerCorrectly','Se ha creado el usuario correctamente')
                    res.redirect('/admins/userpanel');
                    break;
            }
        }
    })
};

userController.deleteUsers= function (req,res,next) {
    if (req.session.username){
        if(req.session.isAdmin){
            usersModel.deleteUsers(req.params.id, (err, result)=>{
                if(err){
                    res.status(500).json(err);
                }else{
                    req.flash('borrar','Se ha borrado el registro '+req.params.id+' satisfactoriamente!')
                    res.redirect('/admins/userpanel');
                }
            })
        }else {
            next();
        }
    }else {
        next();
    }
};

userController.updateUsers= function (req,res,next) {
    let checkboxAdmin = 0;
    if (req.body.isAdmin){
        checkboxAdmin = 1;
    } else {
        checkboxAdmin = 0;
    }
    let checkboxActivo = 0;
    if (req.body.active){
        checkboxActivo = 1;
    } else {
        checkboxActivo = 0;
    }
    let usuario = {
        id: req.body.id,
        usuario: req.body.usuario,
        email: req.body.email,
        isAdmin: checkboxAdmin,
        active: checkboxActivo,
    }
    usersModel.updateUsers(usuario, function (error,resultado) {
        if (error) next();
        req.flash('actualizar','Se ha actualizado el usuario correctamente')
        res.redirect('/admins/userpanel')
    })
};

module.exports = userController;


