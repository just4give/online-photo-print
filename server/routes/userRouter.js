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

router.post('/register', function(req,res){
   console.log(req.body);

    res.json(req.body);
});

module.exports = router;
