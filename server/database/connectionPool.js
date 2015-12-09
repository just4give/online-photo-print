/**
 * Created by Mithun.Das on 12/8/2015.
 */
var mysql = require('mysql');

var app = require('../../app');

var config ={
    host     : '127.0.0.1',
    user     : 'root',
    password : 'password',
    database : 'photos',
    connectionLimit: 100
};


var pool = mysql.createPool(config);

module.exports = pool;