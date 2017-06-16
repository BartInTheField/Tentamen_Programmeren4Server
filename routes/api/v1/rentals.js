/**
 * Created by Niels on 6/13/2017.
 */
var express = require('express');
var router = express.Router();
var auth = require('../../../auth/authentication');

var pool = require('../../../db/connection');

router.all('*', function(req, res, next){
   var token = (req.header('X-Access-Token' || ''));

   auth.decodeToken(token, function(err, payload){
        if(err){
            console.log(err);
            res.status(401).json({
                "Error" : "Not authorized"
            })
        }else{
            next();
        }
   });
});

router.route('/rentals/:userid')
    .get(function(req,res){
        var userid = req.params.userid

        var querystr = "SELECT `film`.*, `rental`.return_date FROM `film` INNER JOIN `inventory` " +
        "ON `inventory`.film_id = `film`.film_id INNER JOIN `rental` " +
        "ON `rental`.inventory_id = `inventory`.inventory_id " + 
        "WHERE `rental`.customer_id = " + userid +";";

        if(userid){
            pool.getConnection(function (err, connection){
                if(err){
                    console.log(err);
                } else {
                    connection.query(querystr, function(err, rows) {
                        connection.release();
                        if (err) {
                            console.log(err);
                            res.status(401);
                        } else {
                            if(rows.length > 0){
                                res.status(200).json({
                                    "Movies" : rows
                                });
                            } else {
                                res.status(400).json({
                                    "Response" : "Bad request"
                                });
                            }
                        }
                    })
                }
            });
        }
    });

module.exports = router;