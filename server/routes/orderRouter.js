/**
 * Created by Mithun.Das on 12/8/2015.
 */
var express = require('express');
var router = express.Router();
var orderDB = require('../database/orderDB');
var get_ip = require('ipware')().get_ip;

router.post('/cart', function(req,res,next){
    console.log(req.body);
    orderDB.saveCart(req.body, function(err,data){
        if(err){
            if(err.status == 403){
                console.log('potential hack from ');
                console.log(get_ip(req));
            }
            return next(err);
        }
        res.json(data);

    });


});

router.get('/cart/:uuid', function(req,res,next){
    console.log(req.params.uuid);


    orderDB.getCart(req.params.uuid, function(err,data){
        if(err){
            if(err.status == 403){
                console.log('potential hack from ');
                console.log(get_ip(req));
            }
            return next(err);
        }
        res.json(data);

    });


});

router.post('/cart/delete/:cartId', function(req,res,next){
    console.log(req.params.uuid);


    orderDB.deleteCart(req.params.cartId, function(err,data){
        if(err){

            return next(err);
        }
        res.json(data);

    });


});

router.get('/shipping', function(req, res,next) {

    orderDB.getShipping(function(err,data){
        if(err){
            return next(err);
        }
        res.json(data);
    });

});

router.post('/place/:uuid', function(req,res,next){
    console.log(req.body);
    orderDB.createOrder(req.params.uuid, req.body, function(err,data){
        if(err){
            if(err.status == 403){
                console.log('potential hack from ');
                console.log(get_ip(req));
            }
            return next(err);
        }
        res.json(data);

    });


});

router.get('/all/:uuid', function(req,res,next){

    orderDB.getOrders(req.params.uuid, function(err,data){
        if(err){
            if(err.status == 403){
                console.log('potential hack from ');
                console.log(get_ip(req));
            }
            return next(err);
        }
        res.json(data);

    });


});

module.exports = router;
