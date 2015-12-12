/**
 * Created by Mithun.Das on 12/8/2015.
 */
var pool = require('./connectionPool');
var Shipping = require('../orm/Shipping');
var Cart = require('../orm/Cart');
var User = require('../orm/User');
var Order = require('../orm/Order');


var IdGenerator = require('node-uuid');

exports.saveCart = function(cart,callback){

    User.findOne({where:{uuid:cart.uuid}})
        .then(function(user){

            if(user != null){
                cart.products.forEach(function(elem){
                   elem.userId = user.id;
                });
                console.log('user found . saving carts');
                console.log(cart.products);

                Cart.bulkCreate(cart.products)
                    .then(function(){
                        console.log('carts created');
                        callback(null,{});
                    },function(err){
                        console.log("Database error in saveCart: " + err);

                        callback(err);
                        return;
                    });
            }else{
                console.log("Database error in saveCart:403 ");
                callback({status: 403});
                return;
            }


        },function(err){
            console.log("Database error in getCart: " + err);

            callback(err);
            return;
        });
}

exports.getCart = function(uuid,callback){


    User.findOne({where:{uuid:uuid}})
        .then(function(user){
            console.log(user);
            if(user != null){
                Cart.findAll({ where:{userId: user.id}}).then(function(data){
                    callback(null,data);
                },function(err){
                    console.log("Database error in getCart: " + err);

                    callback(err);
                    return;
                });
            }else{
                callback({status: 403});
                return;
            }


        },function(err){
            console.log("Database error in getCart: " + err);

            callback(err);
            return;
        });

}

exports.getShipping = function(callback){
/*    pool.getConnection(function(err, connection) {
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
    });*/
    Shipping.findAll().then(function(data){
        callback(null,data);
    },function(err){
        console.log("Database error in getShipping: " + err);

        callback(err);
        return;
    });
}

exports.createOrder = function(uuid,order,callback){

    User.findOne({where:{uuid:uuid}})
        .then(function(user){

            if(user != null){

                    order.userId = user.id;
                    order.trackingId=IdGenerator.v1();
                    Order.create(order)
                    .then(function(data){

                        callback(null,data);
                    },function(err){
                        console.log("Database error in createOrder: " + err);

                        callback(err);
                        return;
                    });
            }else{
                console.log("Database error in createOrder:403 ");
                callback({status: 403});
                return;
            }


        },function(err){
            console.log("Database error in getCart: " + err);

            callback(err);
            return;
        });
}


