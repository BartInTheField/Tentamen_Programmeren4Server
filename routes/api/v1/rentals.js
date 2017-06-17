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
        var userid = req.params.userid;

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

router.route('/rentals/:userid/:inventoryid')
    .post(function(req,res){
        var userid = req.params.userid;
        var inventoryid = req.params.inventoryid;

        var selectAllStr = "SELECT inventory_id FROM `rental` WHERE inventory_id ="+inventoryid+";"

        var querystr = "INSERT INTO `rental` (rental_date, inventory_id, customer_id, return_date, last_update) "
            + "VALUES (NOW(), "+inventoryid+", "+userid+", NOW() + INTERVAL 7 DAY, NOW());";

        if(userid && inventoryid){
            pool.getConnection(function (err, connection){
                if(err){
                    console.log(err);
                } else {
                    connection.query(selectAllStr, function(err, rows){
                       if(err){
                           console.log(err);
                       }else{
                         if(rows.length > 0){
                             connection.release();
                             res.status(401).json({
                                "Response" : "This copy is already rented by a customer"
                             });
                         }  else{
                             connection.query(querystr, function(err) {
                                 connection.release();
                                 if (err) {
                                     console.log(err);
                                     res.status(401);
                                 } else {
                                     res.status(201).json({
                                         "Response" : "Created rental succesfully"
                                     });
                                 }
                             })
                         }
                       }
                    });
                }
            });
        }else{
            res.status(400).json({
                "Response" : "Bad request"
            });
        }
    });

    router.route('/rentals/:userid/:inventoryid')
    .put(function(req,res){
        var userid = req.params.userid;
        var inventoryid = req.params.inventoryid;

        var querystr = "UPDATE `rental` SET `active`='0' WHERE `customer_id` = " + userid + " AND `inventory_id` = " + inventoryid +";";

       if(userid && inventoryid){
           pool.getConnection(function (err, connection){
               if(err){
                   console.log(err)
               } else {
                   connection.query(querystr, function(err, rows){
                       if(err){
                           console.log(err)
                       } else {
                           res.status(201).json({
                               "Response" : "Rental updated"
                           })
                       }
                   })
               }
           })
       }
    });


module.exports = router;