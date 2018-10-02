var express = require("express");
var mysql = require('mysql');
var app = express();
var connection;
bodyParser = require('body-parser'),
path = require("path");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

  var db_config = {
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'b374f3f0f40afe',
    password: '72b67f0d',
    database: 'heroku_7cd88f660d93013'
};

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});

function handleDisconnect() {
    console.log('1. connecting to db:');
    connection = mysql.createConnection(db_config);
    connection.connect(function(err) {              
        if (err) {                                  
            console.log('2. error when connecting to db:', err);
            setTimeout(handleDisconnect, 3000); 
        }                                     
    });                                     	
    											
    connection.on('error', function(err) {
        console.log('3. db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { 
            handleDisconnect();                      	
        } else {                                      	
            throw err;                                  
        }
    });
}

// handleDisconnect();

app.post('/getMonthlybill',function(req, res){
	res.setHeader('Content-Type', 'application/json');
	  res.header("Access-Control-Allow-Origin", "*");
//   connection.connect();
    handleDisconnect();
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	// Request methods you wish to allow
    var selectedMonth=req.body.selectedMonth;
    var selectedYear=req.body.selectedYear;
	console.log(selectedMonth+"    sample ");
    var sql="select * from users1 where month='"+selectedMonth+"' AND year = '"+selectedYear+"'";
	connection.query(sql, function(err, rows) {
		if (err) {
            // connection.end();
			res.send(JSON.stringify({
				data: [],
				error:err
			}));
		} 
		else 
		{
            connection.end();
			res.send(JSON.stringify({
				data: rows,
				error:""
            }));
            
		}
	});
});

// app.get("/",(req, res) => {
//     res.sendFile(__dirname + "/table1.html");
// });

app.post('/getDetailedbill',function(req, res){
	res.setHeader('Content-Type', 'application/json');
	  res.header("Access-Control-Allow-Origin", "*");
//   connection.connect();
    handleDisconnect();
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	// Request methods you wish to allow
    var selectedMonth=req.body.selectedMonth;
    var selectedYear=req.body.selectedYear;
	console.log(selectedMonth+"    sample ");
    var sql="select * from users1 where month='"+selectedMonth+"' AND year = '"+selectedYear+"' AND name = '"+selectedName+"'";
	connection.query(sql, function(err, rows) {
		if (err) {
            // connection.end();
			res.send(JSON.stringify({
				data: [],
				error:err
			}));
		} 
		else 
		{
            // connection.end();
			res.send(JSON.stringify({
				data: rows,
				error:""
            }));
            
		}
	});
});