/**
 * Created by Mithun.Das on 12/8/2015.
 */
var pool = require('./connectionPool');

exports.saveCart = function(cart,callback){
    pool.getConnection(function(err, connection) {

        connection.query("select * from user where uuid=?",[cart.uuid], function(err, rows) {
            if (err) {
                console.log("Database error in getPricing: " + err);
                connection.release();
                callback(err);
                return;
            }
            if(rows.length!=1){
                connection.release();
                callback({status: 403});
                return;
            }else{

                var values =[];
                cart.products.forEach(function(elem){
                    var val =[];
                    val.push(rows[0].id);
                    val.push(elem.imgId);
                    val.push(elem.imgSrc);
                    val.push(elem.frameSize);
                    val.push(elem.price);
                    val.push(elem.quantity);
                   values.push(val);
                });
                console.log(values);
                connection.query("insert into cart(userId,imgId,imgSrc,frameSize,price,quantity) values ?",[values], function(err, rows2) {
                    if (err) {
                        console.log("Database error in getPricing: " + err);
                        connection.release();
                        callback(err);
                        return;
                    }
                    connection.release();
                    callback(null,rows2);

                });
            }

        });

    });
}

exports.getCart = function(uuid,callback){
    pool.getConnection(function(err, connection) {

        connection.query("select * from user where uuid=?",[uuid], function(err, rows) {
            if (err) {
                console.log("Database error in getPricing: " + err);
                connection.release();
                callback(err);
                return;
            }
            if(rows.length!=1){
                connection.release();
                callback({status: 403});
                return;
            }else{
                 connection.query("select * from cart where userId=?",[rows[0].id], function(err, rows2) {
                 if (err) {
                 console.log("Database error in getPricing: " + err);
                 connection.release();
                 callback(err);
                 return;
                 }
                 connection.release();
                 callback(null,rows2);

                 });
            }

        });

    });
}

exports.getShipping = function(callback){
    pool.getConnection(function(err, connection) {
        connection.query("select * from shipping_method", function(err, rows) {
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
