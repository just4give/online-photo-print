/**
 * Created by Mithun.Das on 12/8/2015.
 */
var pool = require('./connectionPool');
var uuid = require('node-uuid');
var User = require('../orm/User');

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
        console.log(data);
        callback(null,{uuid: userUUID, firstName: user.firstName, lastName: user.lastName });
    },function(err){
        callback(err);
        return;
    })
}

exports.loginUser = function(user,callback){
/*    pool.getConnection(function(err, connection) {

        connection.query("select * from user where email=? and password=?",
            [user.email, user.password], function(err, rows) {
                if (err) {
                    console.log("Database error in getPricing: " + err);
                    connection.release();
                    callback(err);
                    return;
                }
                connection.release();
                callback(null,rows);


            });
    });*/
    User.findOne({where: {email: user.email, password: user.password}})
        .then(function(data){
            callback(null,data);
        },function(err){
            console.log("Database error in loginUser: " + err);
            callback(err);
            return;
        })
}
