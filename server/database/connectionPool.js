/**
 * Created by Mithun.Das on 12/8/2015.
 */
var mysql = require('mysql');

var express = require('express');
var app = express();
var config = require('./config.json')[app.get('env')];



var pool = mysql.createPool({
    host     : config.host,
    user     : config.user,
    password : config.password,
    database : config.database,
    connectionLimit: config.connectionLimit
});

module.exports = pool;