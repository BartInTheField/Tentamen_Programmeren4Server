/**
 * Created by Niels on 6/13/2017.
 */
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var moment = require('moment');

var pool = require('../../../db/connection');

router.route('/register')
    .post(function(req,res){

        var firstName = req.body.firstName || '';
        var lastName = req.body.lastName || ''
        var email = req.body.email || '';
        var password = req.body.password || '';

        var salt = bcrypt.genSaltSync(10);
        var passwordHash = bcrypt.hashSync(password, salt);

        var myDate = moment(new Date()).format('YYYY/MM/DD HH:mm:ss');

        var queryString = "INSERT INTO `customer` (first_name, last_name, email, active, create_date, last_update, password) " +
            "VALUES ('"+firstName+"', '"+lastName+"','"+email+"', 1, '"+myDate+"', '"+myDate+"', '"+passwordHash+"');"

        pool.getConnection(function(err, connection){
            if(err){
                console.log(err);
            }else{
                connection.query("SELECT * FROM `customer` WHERE email = '"+email+"';", function (err, rows) {
                    if(err){
                        res.status(401);
                    }else{
                        if(rows[0]){
                            res.status(400).json({
                                "response" : "There is already a customer with this email"
                            })
                        }else{
                            connection.query(queryString,function(err){
                                connection.release();
                                if(err){
                                    res.status(401);
                                } else{
                                    res.status(201).json({
                                        "Response" : "Succesfully created"
                                    });

                                }
                            });
                        }
                    }
                });

            }
        });
    });

module.exports = router;