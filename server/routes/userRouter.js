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


router.post('/login', function(req,res,next){
    console.log(req.body);


    userDB.loginUser(req.body, function(err,data){
        if(err){
            return next(err);
        }
       /* if(data.length == 1){
            res.json(data[0]);
        }else{
            res.json({errorCode:"101",errorMessage:"Login failed."})
        }*/
        if(data == null){
            res.json({errorCode:"101",errorMessage:"Login failed."})
        }else{
            res.json(data);
        }


    });


});

module.exports = router;
