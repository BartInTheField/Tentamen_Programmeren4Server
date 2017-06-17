/**
 * Created by Niels on 6/13/2017.
 */
var express = require('express');
var app = express();
var bodyparser = require('body-parser');


//Set the app port
app.set('port', process.env.PORT || 8080);


app.use(bodyparser.urlencoded({ extended:true }));
app.use(bodyparser.json());
app.use('/api/v1', require('./routes/api/v1/login'));
app.use('/api/v1', require('./routes/api/v1/register'));
app.use('/api/v1', require('./routes/api/v1/films'));
app.use('/api/v1', require('./routes/api/v1/copies'));
app.use('/api/v1', require('./routes/api/v1/rentals'));


app.listen(app.get('port'), function(){
   console.log('Server is running on ' + app.get('port'));
});