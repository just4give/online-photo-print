/**
 * Created by Mithun.Das on 12/10/2015.
 */
var Sequelize = require('sequelize');
var express = require('express');
var app = express();
var config = require('./config.json')[app.get('env')];


var sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: 'mysql',

    pool: {
        max: 50,
        min: 0,
        idle: 10000
    }
});

module.exports = sequelize;