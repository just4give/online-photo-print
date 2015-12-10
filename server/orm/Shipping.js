/**
 * Created by Mithun.Das on 12/10/2015.
 */
var Sequelize = require('sequelize');
var sequelize = require('../database/sequelize');

var shipping = sequelize.define('shipping_method', {
    id: {
       type: Sequelize.INTEGER,
        field: 'id',
        primaryKey: true
    },
    method: {
        type: Sequelize.STRING,
        field: 'method'
    },
    label: {
        type: Sequelize.STRING,
        field: 'label'
    },
    summary: {
        type: Sequelize.STRING,
        field: 'summary'
    },
    price: {
        type: Sequelize.INTEGER,
        field: 'price'
    }

},{
    freezeTableName: true,
    timestamps: false
});

module.exports = shipping;
