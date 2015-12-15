/**
 * Created by Mithun.Das on 12/10/2015.
 */
var Sequelize = require('sequelize');
var sequelize = require('../database/sequelize');

var cart = sequelize.define('cart', {
    id: {
       type: Sequelize.INTEGER,
        field: 'id',
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        field: 'userId'
    },
    imgId: {
        type: Sequelize.STRING,
        field: 'imgId'
    },
    imgSrc: {
        type: Sequelize.STRING,
        field: 'imgSrc'
    },
    frameSize: {
        type: Sequelize.STRING,
        field: 'frameSize'
    },

    price: {
        type: Sequelize.INTEGER,
        field: 'price'
    },
    quantity: {
        type: Sequelize.INTEGER,
        field: 'quantity'
    },
    orderId: {
        type: Sequelize.INTEGER,
        field: 'orderId'
    },
    paperFinish: {
        type: Sequelize.STRING,
        field: 'paperFinish'
    }

},{
    freezeTableName: true,
    timestamps: false
});

module.exports = cart;
