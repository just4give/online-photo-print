/**
 * Created by Mithun.Das on 12/8/2015.
 */
var pool = require('./connectionPool');
var Pricing = require('../orm/Pricing');
var Photo = require('../orm/Photo');
var User = require('../orm/User');

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
