/**
 * Created by Mithun.Das on 12/8/2015.
 */
var express = require('express');
var router = express.Router();
var userDB = require('../database/userDB');

/* GET users listing. */
router.get('/profile', function(req, res) {
    res.json({firstName:"John", lastName:"Smith"});
});

router.post('/register', function(req,res,next){
   console.log(req.body);

    userDB.registerUser(req.body, function(err,data){
        if(err){
            return next(err);
        }
        res.json(data);

    });


});

router.post('/fb/register', function(req,res,next){
    console.log(req.body);

    userDB.registerUser(req.body, function(err,data){
        if(err){
            return next(err);
        }
        res.json(data);

    });


});
router.post('/login', function(req,res,next){

    userDB.loginUser(req.body, function(err,data){
        if(err){
            return next(err);
        }

        if(data == null){
            res.json({errorCode:"101",errorMessage:"Login failed."})
        }else{
            res.json(data);
        }


    });


});

router.post('/fb/login', function(req,res,next){

    userDB.loginFBUser(req.body, function(err,data){
        if(err){
            return next(err);
        }

        if(data == null){
            res.json({errorCode:"101",errorMessage:"Login failed."})
        }else{
            res.json(data);
        }


    });


});

router.get('/address/:uuid', function(req, res,next) {
    console.log('*** getting default address**');
    userDB.findDefaultAddress(req.params.uuid, function(err,data){
        if(err){
            return next(err);
        }
        res.json(data);
    });

});


router.get('/address/:uuid/:addressId', function(req, res,next) {

    userDB.findAddressById(req.params.uuid,req.params.addressId, function(err,data){
        if(err){
            return next(err);
        }
        res.json(data);
    });

});

router.post('/address/:uuid', function(req, res,next) {

    userDB.createAddress(req.params.uuid, req.body, function(err,data){
        if(err){
            return next(err);
        }
        res.json(data);
    });

});

router.get('/addresses/:uuid', function(req, res,next) {

    userDB.addresses(req.params.uuid, function(err,data){
        if(err){
            return next(err);
        }
        res.json(data);
    });

});
module.exports = router;
