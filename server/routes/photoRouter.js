/**
 * Created by Mithun.Das on 12/8/2015.
 */
var express = require('express');
var router = express.Router();
var photoDB = require('../database/photoDB');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({limit:'01mb'});
var fs = require('fs');
var uuid = require('node-uuid');
var app = express();
var config = require('../database/config.json')[app.get('env')];
var path = require('path');
var sizeOf = require('image-size');

/* GET users listing. */
router.get('/pricing', function(req, res,next) {

    photoDB.getPricing(function(err,data){
        if(err){
            return next(err);
        }
        res.json(data);
    });

});

router.post('/upload', multipartMiddleware,function (req, res, next) {
    console.log(req.body);
    var  file = req.files.file;
    var fileName = uuid.v1()+  path.extname(file.name);
    var targetPath = config.imageRepo+ '/repo/'+ fileName;

    //var dimensions = sizeOf(file.path);
    //console.log(dimensions.width, dimensions.height);

    fs.rename(file.path, targetPath, function(err) {
        if(err) {
            return next(err);
        }
        sizeOf(targetPath, function(err, dimensions){
            console.log(dimensions.width, dimensions.height);
            res.json({imgSrc:config.apiContext+'/repo/'+ fileName});
        })

    });


});

module.exports = router;
