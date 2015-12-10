/**
 * Created by Mithun.Das on 12/10/2015.
 */
var Sequelize = require('sequelize');
var sequelize = require('../database/sequelize');

var user = sequelize.define('user', {
    id: {
       type: Sequelize.INTEGER,
        field: 'id',
        primaryKey: true
    },
    uuid: {
        type: Sequelize.STRING,
        field: 'uuid'
    },
    firstName: {
        type: Sequelize.STRING,
        field: 'firstName'
    },
    lastName: {
        type: Sequelize.STRING,
        field: 'lastName'
    },
    email: {
        type: Sequelize.STRING,
        field: 'email'
    },
    password: {
        type: Sequelize.STRING,
        field: 'password'
    },
    facebookId: {
        type: Sequelize.STRING,
        field: 'facebookId'
    }

},{
    freezeTableName: true,
    timestamps: false
});

module.exports = user;
