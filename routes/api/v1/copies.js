/**
 * Created by Niels on 6/17/2017.
 */
var express = require('express');
var router = express.Router();

var pool = require('../../../db/connection');


router.route('/copies/:filmid')
    .get(function(req,res){
        var filmid = req.params.filmid;

        var queryString = "";
        if(filmid){
            queryString = "SELECT * FROM `inventory` WHERE `inventory`.`inventory_id` NOT IN (SELECT `inventory_id` FROM `rental`) AND `film_id` = "+filmid+";";
        }else{
            queryString = "SELECT * FROM `inventory`;";
        }

        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
            } else {
                connection.query(queryString, function (err, rows) {
                    connection.release();
                    if(err){
                        console.log(err);
                        res.status(401);
                    }else{
                        if(rows.length > 0){
                            res.status(200).json({
                                "Copies" : rows
                            });
                        }else{
                            res.status(400).json({
                                "Response" : "Bad request"
                            });
                        }
                    }
                })
            }
        });
    });

module.exports = router;