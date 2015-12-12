/**
 * Created by Mithun.Das on 12/8/2015.
 */
var pool = require('./connectionPool');
var uuid = require('node-uuid');
var User = require('../orm/User');
var Address = require('../orm/Address');

exports.registerUser = function(user,callback){
/*    pool.getConnection(function(err, connection) {
        var userUUID = uuid.v4();
        connection.query("insert into user(uuid,firstName,lastName,email,password) values (?,?,?,?,?)",
            [userUUID, user.firstName, user.lastName, user.email, user.password], function(err, rows) {
            if (err) {
                console.log("Database error in getPricing: " + err);
                connection.release();
                callback(err);
                return;
            }
            connection.release();
            callback(null,{uuid: userUUID, firstName: user.firstName, lastName: user.lastName });

        });
    });*/
    var userUUID = uuid.v4();
    User.create({
        uuid: userUUID,firstName:user.firstName, lastName: user.lastName, email:user.email, password:user.password
    }).then(function(data){

        callback(null,data);
    },function(err){
        callback(err);
        return;
    })
}

exports.loginUser = function(user,callback){

    User.findOne({where: {email: user.email, password: user.password}})
        .then(function(data){
            callback(null,data);
        },function(err){
            console.log("Database error in loginUser: " + err);
            callback(err);
            return;
        })
}

exports.createAddress = function(uuid,address,callback){

    User.findOne({where:{uuid:uuid}})
        .then(function(user){

            if(user != null){

                address.userId = user.id;

                Address.create(address)
                    .then(function(data){

                        callback(null,data);
                    },function(err){
                        console.log("Database error in createAddress: " + err);

                        callback(err);
                        return;
                    });
            }else{
                console.log("Database error in createAddress:403 ");
                callback({status: 403});
                return;
            }


        },function(err){
            console.log("Database error in createAddress: " + err);

            callback(err);
            return;
        });
}


exports.findDefaultAddress = function(uuid,callback){

    User.findOne({where:{uuid:uuid}})
        .then(function(user){

            if(user != null){

                address.userId = user.id;

                Address.findOne({where:{userId: user.id, defaultAddress:true}})
                    .then(function(data){

                        callback(null,data);
                    },function(err){
                        console.log("Database error in findDefaultAddress: " + err);

                        callback(err);
                        return;
                    });
            }else{
                console.log("Database error in findDefaultAddress:403 ");
                callback({status: 403});
                return;
            }


        },function(err){
            console.log("Database error in createAddress: " + err);

            callback(err);
            return;
        });
}
