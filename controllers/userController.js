var usersModel =require('.././models/usersModel');
var bcrypt = require('bcrypt-nodejs');
var usersModel =require('.././models/usersModel');

var userController = {};

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
        isAdmin: 0
    };

    usersModel.register(usuario,function (err,resultado) {
        if (err){
            res.status(500).json(err);
        }else{
            //
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
                    req.flash('registerCorrectly','Se ha registrado correctamente, ahora puede iniciar sesión')
                    res.redirect('/users/login');
                    break;
            }
        }
    })
};

userController.login = function (req, res, next) {
    if(req.session.username){
        res.redirect('/');
    }else{
        res.render('users/login', {
            title: 'login',
            layout: 'layout',
            registerCorrectly: req.flash('registerCorrectly'),
            usernameError: req.flash('usernameError'),
            passwordError: req.flash('passwordError')
        });
    }
};

userController.postLogin = function (req, res , next) {
    var usuario = {
        usuario: req.body.usuario,
        password: req.body.password
    }
    usersModel.login(usuario, function (err, resultado, usuarioRegistrado) {
        if (err) {
            res.status(500).json(err);
        } else {
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
                    req.session.username = usuarioRegistrado.usuario;
                    req.session.isAdmin = usuarioRegistrado.isAdmin;
                    res.redirect('/');
                    break;
            }

        }
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

module.exports = userController;


