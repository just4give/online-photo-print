/**
 * Created by Mithun.Das on 12/8/2015.
 */
var express = require('express');
var router = express.Router();
var photoDB = require('../database/photoDB');

/* GET users listing. */
router.get('/pricing', function(req, res,next) {

    photoDB.getPricing(function(err,data){
        if(err){
            return next(err);
        }
        res.json(data);
    });

});

module.exports = router;
