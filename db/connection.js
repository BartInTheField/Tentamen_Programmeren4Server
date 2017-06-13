/**
 * Created by Niels on 6/13/2017.
 */
var mysql = require('mysql');
var config = require('./config.json')
var pool = mysql.createPool({
    "connectionLimit": 50,
    "host": config.host,
    "user": config.user,
    "password": config.password,
    "database": config.database
});

module.exports = pool;