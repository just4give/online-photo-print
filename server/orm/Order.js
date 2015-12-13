/**
 * Created by Mithun.Das on 12/10/2015.
 */
var Sequelize = require('sequelize');
var sequelize = require('../database/sequelize');

var order = sequelize.define('order', {
    id: {
       type: Sequelize.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.INTEGER,
        field: 'userId'
    },
    trackingId: {
        type: Sequelize.STRING,
        field: 'trackingId'
    },
    noOfProduct: {
        type: Sequelize.INTEGER,
        field: 'noOfProduct'
    },
    noOfPrints: {
        type: Sequelize.INTEGER,
        field: 'noOfPrints'
    },
    printCost: {
        type: Sequelize.INTEGER,
        field: 'printCost'
    },
    shippingCost: {
        type: Sequelize.INTEGER,
        field: 'shippingCost'
    },
    discount: {
        type: Sequelize.INTEGER,
        field: 'discount'
    },
    finalCost: {
        type: Sequelize.INTEGER,
        field: 'finalCost'
    },
    shippingMethod: {
        type: Sequelize.STRING,
        field: 'shippingMethod'
    },
    orderStatus: {
        type: Sequelize.STRING,
        field: 'orderStatus'
    },
    orderDate: {
        type: Sequelize.DATE,
        field: 'orderDate'
    },
    addressId: {
        type: Sequelize.INTEGER,
        field: 'addressId'
    }

},{
    freezeTableName: true,
    timestamps: false
});

module.exports = order;
