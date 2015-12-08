/**
 * Created by Mithun.Das on 12/8/2015.
 */
var pool = require('./connectionPool');

exports.registerUser = function(user,callback){
    pool.getConnection(function(err, connection) {
        connection.query("insert into user(uuid,firstName,lastName,email,password) values(?,?,?,?,?,?)", function(err, rows) {
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
