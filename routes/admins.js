var express = require('express');
var router = express.Router();
var destinationController = require('../controllers/destinationController');

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

module.exports = router;