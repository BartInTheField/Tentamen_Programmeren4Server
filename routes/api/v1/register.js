/**
 * Created by Niels on 6/13/2017.
 */
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var pool = require('../../../db/connection');

router.route
    .post('/register',function(req,res){

        var email = req.body.email || '';
        var password = req.body.password || '';

        var salt = bcrypt.genSaltSync(10);
        var passwordHash = bcrypt.hashSync(password, salt);

        //TODO: Make query with the right tables.
        var queryString = '';

        pool.getConnection(function(err, connection){
            if(err){
                throw err;
            }else{
                //TODO: Execute register query
            }
        });
    });

module.exports = router;