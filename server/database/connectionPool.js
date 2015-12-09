/**
 * Created by Mithun.Das on 12/8/2015.
 */
var mysql = require('mysql');

var app = require('../../app');
//mysql://b61afe5470d800:c3a8a201@us-cdbr-iron-east-03.cleardb.net/heroku_30c4b4e9dd38c02?reconnect=true
var config ={
    host     : 'us-cdbr-iron-east-03.cleardb.net',
    user     : 'b61afe5470d800',
    password : 'c3a8a201',
    database : 'heroku_30c4b4e9dd38c02',
    connectionLimit: 10
};


var pool = mysql.createPool(config);

module.exports = pool;