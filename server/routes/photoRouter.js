/**
 * Created by Mithun.Das on 12/8/2015.
 */
var express = require('express');
var router = express.Router();
var photoDB = require('../database/photoDB');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({limit:'01mb'});
var fs = require('fs');
var IdGenerator = require('node-uuid');
var app = express();
var config = require('../database/config.json')[app.get('env')];
var path = require('path');
var sizeOf = require('image-size');
var User = require('../orm/User');
var Photo = require('../orm/Photo');

/* GET users listing. */
router.get('/pricing', function(req, res,next) {

    photoDB.getPricing(function(err,data){
        if(err){
            return next(err);
        }
        res.json(data);
    });

});

router.post('/delete/:imgId', function(req, res,next) {
    var imgId = req.params.imgId;
    console.log(req.body);
    console.log(imgId);
    var targetPath="";

    Photo.findOne({where:{imgId: imgId}})
        .then(function(photo){
            if(photo.userId){
                targetPath = config.imageRepo+ '/repo/'+ photo.fileName;
            }else{
                targetPath = config.imageRepo+ '/repo/temp/'+ photo.fileName;
            }
            console.log(targetPath);
            res.json({path: targetPath});
        },function(err){
            return next(err);
        });

});

router.post('/upload', multipartMiddleware,function (req, res, next) {
    console.log(req.body);
    var  file = req.files.file;
    var id = IdGenerator.v1();
    var fileName = id +  path.extname(file.name);
    var targetPath = config.imageRepo+ '/repo/temp/'+ fileName;

    //var dimensions = sizeOf(file.path);
    //console.log(dimensions.width, dimensions.height);
    console.log('find user');
    if(req.body.uuid){
        User.findOne({where: {uuid: req.body.uuid}})
            .then(function(user){
                var targetPath = config.imageRepo+ '/repo/'+ fileName;

                fs.rename(file.path, targetPath, function(err) {
                    if(err) {
                        return next(err);
                    }
                    sizeOf(targetPath, function(err, dimensions){


                    Photo.create({
                        imgId: id, imgSrc: config.apiContext+'/repo/'+ fileName,userId:user.id,
                        width:dimensions.width,height:dimensions.height,createdOn:new Date(),fileName: fileName
                        }).then(function(data){
                            res.json({imgSrc:config.apiContext+'/repo/'+ fileName, imgId:id, width:dimensions.width, height:dimensions.height });
                        },function(err){
                            return next(err);
                        });


                    });

                });

            },function(err){
                console.log("Database error in loginUser: " + err);
                return next(err);
            });
    }else{
        console.log('target path '+targetPath);
        fs.rename(file.path, targetPath, function(err) {
            if(err) {
                return next(err);
            }
            console.log('renamed');
            sizeOf(targetPath, function(err, dimensions){
                Photo.create({
                    imgId: id, imgSrc: config.apiContext+'/repo/'+ fileName,
                    width:dimensions.width,height:dimensions.height,createdOn:new Date(),fileName: fileName
                }).then(function(data){
                    res.json({imgSrc:config.apiContext+'/repo/temp/'+ fileName, imgId:id, width:dimensions.width, height:dimensions.height });
                },function(err){
                    return next(err);
                });

            })

        });
    }

});


router.get('/gallery/:uuid', function(req,res,next){
    console.log(req.params.uuid);


    photoDB.getPhotos(req.params.uuid, function(err,data){
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
