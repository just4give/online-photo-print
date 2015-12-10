/**
 * Created by Mithun.Das on 12/10/2015.
 */
var Sequelize = require('sequelize');
var sequelize = require('../database/sequelize');

var pricing = sequelize.define('pricing', {
    id: {
       type: Sequelize.INTEGER,
        field: 'id',
        primaryKey: true
    },
    frameSize: {
        type: Sequelize.STRING,
        field: 'frameSize'
    },
    price: {
        type: Sequelize.INTEGER,
        field: 'price'
    }

},{
    freezeTableName: true,
    timestamps: false
});

module.exports = pricing;
