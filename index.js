var express = require("express");
var mysql = require('mysql');
var app = express();
bodyParser = require('body-parser'),
path = require("path");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 


var connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'b374f3f0f40afe',
    password: '72b67f0d',
    database: 'heroku_7cd88f660d93013'
});

connection.connect();


app.get('/', function(request, response) {
    connection.query('SELECT * from users1', function(err, rows, fields){
        if(err){
            console.log('error: ', err);
            throw err;
        }
    response.send(['Hello World', rows]);
    });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});

