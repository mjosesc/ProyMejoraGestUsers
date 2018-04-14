var express = require('express');
var router = express.Router();
var emailController= require('../controllers/emailController');

router.post('/recover', function (req,res,next) {
    emailController.recover(req,res,next);
});

router.get('/recover/:hash', function (req,res,next) {
    emailController.checkHash(req,res,next);
})

router.post('/changePass', function (req,res,next) {
    emailController.changePass(req,res,next);
})

router.get('/activate/:hash', function (req,res,next) {
    emailController.activate(req,res,next);
})
module.exports= router;
