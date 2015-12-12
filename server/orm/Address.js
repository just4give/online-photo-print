/**
 * Created by Mithun.Das on 12/10/2015.
 */
var Sequelize = require('sequelize');
var sequelize = require('../database/sequelize');

var address = sequelize.define('address', {
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
    firstName: {
        type: Sequelize.STRING,
        field: 'firstName'
    },
    lastName: {
        type: Sequelize.STRING,
        field: 'lastName'
    },
    address: {
        type: Sequelize.STRING,
        field: 'address'
    },
    city: {
        type: Sequelize.STRING,
        field: 'city'
    },
    postalCode: {
        type: Sequelize.STRING,
        field: 'postalCode'
    },
    phone: {
        type: Sequelize.STRING,
        field: 'phone'
    },
    defaultAddress: {
        type: Sequelize.BOOLEAN,
        field: 'defaultAddress'
    }

},{
    freezeTableName: true,
    timestamps: false
});

module.exports = address;
