/**
 * Created by Niels on 6/13/2017.
 */
var auth = require('../../../auth/authentication')
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var pool = require('../../../db/connection');

router.route('/login')
    .post(function (req, res) {

        var email = req.body.email || '';
        var password = req.body.password || '';

        var queryString = "SELECT * FROM `customer` WHERE `email` = '" + email + "'";

        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
            } else {
                connection.query(queryString, function (err, rows) {
                    connection.release();
                    if (err) {
                        res.status(401);
                        console.log(err);
                    } else {
                        if (rows.length > 0) {
                            if (bcrypt.compareSync(password, rows[0].password)) {
                                res.status(200).json({ 
                                    "token": auth.encodeToken(email), 
                                    "ID" : rows[0].customer_id,
                                    "email": rows[0].email,
                                    "firstname" : rows[0].first_name,
                                    "lastname" : rows[0].last_name});
                            } else {
                                res.status(400).json({
                                    "Response" : "Invalid credentials"
                                });
                            }
                        } else {
                            res.status(400).json({
                                "Response" : "Email not found"
                            });
                        }
                    }
                })
            }
        });
    });

module.exports = router;