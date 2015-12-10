/**
 * Created by Mithun.Das on 12/8/2015.
 */
var pool = require('./connectionPool');
var Pricing = require('../orm/Pricing');

exports.getPricing = function(callback){
   /* pool.getConnection(function(err, connection) {
        connection.query("select * from pricing", function(err, rows) {
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

    Pricing.findAll().then(function(data){
        callback(null,data);
    },function(err){
        console.log("Database error in getPricing: " + err);

        callback(err);
        return;
    });

}
