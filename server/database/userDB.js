/**
 * Created by Mithun.Das on 12/8/2015.
 */
var pool = require('./connectionPool');
var uuid = require('node-uuid');

exports.registerUser = function(user,callback){
    pool.getConnection(function(err, connection) {
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
    });
}

exports.loginUser = function(user,callback){
    pool.getConnection(function(err, connection) {

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
    });
}
