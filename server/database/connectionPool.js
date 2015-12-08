/**
 * Created by Mithun.Das on 12/8/2015.
 */
var mysql = require('mysql');

var pool = mysql.createPool({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'root',
    database : 'photos',
    connectionLimit: 100
});

module.exports = pool;