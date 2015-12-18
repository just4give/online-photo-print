/**
 * Created by Mithun.Das on 12/8/2015.
 */
var pool = require('./connectionPool');
var Pricing = require('../orm/Pricing');
var Photo = require('../orm/Photo');
var User = require('../orm/User');
var fs = require('fs');
var path = require('path');
var Cart = require('../orm/Cart');
var express = require('express');
var app = express();
var config = require('./config.json')[app.get('env')];

exports.getPricing = function(callback){


    Pricing.findAll().then(function(data){
        callback(null,data);
    },function(err){
        console.log("Database error in getPricing: " + err);

        callback(err);
        return;
    });

}

exports.getPhotos = function(uuid,callback){

    User.findOne({where:{uuid:uuid}})
        .then(function(user){
            console.log('user found '+user.id);
            if(user != null){

                Photo.findAll({where:{userId:user.id} })
                    .then(function(data){
                        callback(null,data);
                    },function(err){
                        callback(err);
                        return;
                    })

            }else{
                console.log("Database error in getPhotos:403 ");
                callback({status: 403});
                return;
            }


        },function(err){
            console.log("Database error in getPhotos: " + err);

            callback(err);
            return;
        });
}

exports.cleanupRepo = function(tempDir, repoDir){
    Photo.findAll({where: {userId: null} })
        .then(function (photos) {


            photos.forEach(function(photo){
                Cart.findOne({where:{imgId: photo.imgId}}).
                    then(function(cart){
                    if(cart == null){

                        fs.unlink(path.join(tempDir, photo.fileName),function(){
                            photo.destroy();
                        });


                    }else{
                        //photo is linked to cart, need to update, move file to repo first
                        fs.rename(path.join(tempDir, photo.fileName), path.join(repoDir, photo.fileName), function(err) {
                            if(!err){
                                Photo.update({userId:cart.userId},
                                    {where:{id: photo.id}});

                            }
                        });

                    }

                });


            })
        },function(err){
            //console.log('failed to clen up..')
        });

}
