/**
 * Created by Niels on 6/13/2017.
 */
var express = require('express');
var app = express();

//Set the app port
app.set('port', process.env.PORT || 8080);

app.use('/api/v1', require('./routes/api/v1/login'));
app.use('/api/v1', require('./routes/api/v1/register'));
app.use('/api/v1', require('./routes/api/v1/films'));
app.use('/api/v1', require('./routes/api/v1/rentals'));


app.listen(app.get('port'), function(){
   console.log('Server is running on ' + app.get('port'));
});