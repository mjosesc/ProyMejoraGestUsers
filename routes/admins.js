var express = require('express');
var router = express.Router();
var destinationController = require('../controllers/destinationController');
var userController= require('../controllers/userController');
var emailController= require('../controllers/emailController');


router.get('/adminpanel',function (req,res,next) {
    destinationController.getAllDestinationsAdmin(req,res,next);
});

router.post('/adminpanel/crear',function (req,res,next) {
    destinationController.createDestination(req,res,next);
});

router.get('/adminpanel/borrar/:id',function (req,res,next) {
    destinationController.deleteDestination(req,res,next);
});

router.get('/adminpanel/updateActive/:id',function (req,res,next) {
    destinationController.updateActive(req,res,next);
});

router.get('/userpanel', function (req,res,next) {
    userController.getAllUsers(req,res,next);
});

router.post('/userpanel/create', function (req, res, next) {
    userController.createUsers(req,res,next);
});

router.get('/userpanel/borrar/:id', function (req, res, next) {
    userController.deleteUsers(req,res,next);
});

router.post('/userpanel/editar', function (req,res,next) {
    userController.updateUsers(req,res,next);
});

router.get('/userpanel/recuperar/:id', function (req,res,next) {
    emailController.recoverAdmin(req,res,next);
})

module.exports = router;