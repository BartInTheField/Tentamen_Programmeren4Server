/**
 * Created by Niels on 6/13/2017.
 */
var express = require('express');
var app = express();

//Set the app port
app.set('port', process.env.PORT || 8080);


app.listen(app.get('port'), function(){
   console.log('Server is running on ' + app.get('port'));
});