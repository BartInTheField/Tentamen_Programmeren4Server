/**
 * Created by Niels on 6/13/2017.
 */
var express = require('express');
var router = express.Router();
var auth = require('../../../auth/authentication');

var pool = require('../../../db/connection');


router.route('/films')
    .get(function(req,res){
        var start = req.query.offset;
        var count = req.query.count;

        var queryString = '';
        if(start && count){
            queryString = "SELECT * FROM `film` LIMIT "+count+" OFFSET "+start+";";
        }else if(count){
            queryString = "SELECT * FROM `film` LIMIT "+count+";";
        }else{
            queryString = "SELECT * FROM `film`";
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
                                "Movies" : rows
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

router.route('/films/:filmid')
    .get(function(req,res){
        var filmid = req.params.filmid;

        var queryString = "SELECT * FROM `film` WHERE film_id = "+filmid+";";

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
                            res.status(200).json(rows[0]);
                        }else{
                            res.status(400).json({
                                "Response" : "Can't find movie with this id."
                            });
                        }
                    }
                })
            }
        });
    });

module.exports = router;