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

// connection.connect();


// app.get('/', function(request, response) {
//     connection.query('SELECT * from users1', function(err, rows, fields){
//         if(err){
//             console.log('error: ', err);
//             throw err;
//         }
//     response.send(['Hello World', rows]);
//     });
// });

// var port = process.env.PORT || 5000;
// app.listen(port, function() {
//     console.log("Listening on " + port);
// });

var connection;

function handleDisconnect() {
    console.log('1. connecting to db:');
    connection = mysql.createConnection(db_config); // Recreate the connection, since old one can't be used
    connection.connect(function(err) {              	// The server is either down
        if (err) {                                     // or restarting (takes a while sometimes).
            console.log('2. error when connecting to db:', err);
            setTimeout(handleDisconnect, 1000); // We introduce a delay before attempting to reconnect,
        }                                     	// to avoid a hot loop, and to allow our node script to
    });                                     	// process asynchronous requests in the meantime.
    											// If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
        console.log('3. db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { 	// Connection to the MySQL server is usually
            handleDisconnect();                      	// lost due to either server restart, or a
        } else {                                      	// connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect();

app.get('/', function(request, response) {
    connection.query('SELECT * from users1', function(err, rows, fields) {
        if (err) {
            console.log('error: ', err);
            throw err;
        }
        response.send(['Hello World!', rows]);
    });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});