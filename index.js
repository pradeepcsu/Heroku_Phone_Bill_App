var express = require("express");
var mysql = require('mysql');
var app = express();
var connection;
bodyParser = require('body-parser'),
path = require("path");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'www')));

var pool  = mysql.createPool({
  connectionLimit : 10,
  host: 'us-cdbr-iron-east-01.cleardb.net',
  user: 'b374f3f0f40afe',
  password: '72b67f0d',
  database: 'heroku_7cd88f660d93013'
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});

app.post('/getMonthlybill',function(req, res){
	res.setHeader('Content-Type', 'application/json');
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var selectedMonth=req.body.selectedMonth;
    var selectedYear=req.body.selectedYear;
    var sql="select * from users1 where month='"+selectedMonth+"' AND year = '"+selectedYear+"'";
    pool.query(sql, function (err, rows) {
		if (err) {
			res.send(JSON.stringify({
				data: [],
				error:err
			}));
		} 
		else 
		{
			res.send(JSON.stringify({
				data: rows,
				error:""
            }));
            
		}
	});
});

app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname + '/table1.html'));
});

app.post('/getDetailedbill',function(req, res){
	res.setHeader('Content-Type', 'application/json');
	  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var selectedMonth=req.body.selectedMonth;
    var selectedYear=req.body.selectedYear;
    var selectedName=req.body.selectedName;

    var sql="select * from users1 where month='"+selectedMonth+"' AND year = '"+selectedYear+"' AND name = '"+selectedName+"'";
        pool.query(sql, function (err, rows) { 
            if (err) {
                res.send(JSON.stringify({
                    data: [],
                    error:err
                }));
            } 
            else 
            {
                res.send(JSON.stringify({
                    data: rows,
                    error:""
                }));
                
            }
        });
        app.post('/getPaymentInfo',function(req, res){
            res.setHeader('Content-Type', 'application/json');
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            var selectedMonth=req.body.selectedMonth;
            var selectedYear=req.body.selectedYear;
            var sql="select number, name, dues, paid_monthly_bill from users1 where month ='"+selectedMonth+"' AND year = '"+selectedYear+"' ORDER BY name";     
        
            pool.query(sql, function (err, rows) {    
                if (err) {
                    res.send(JSON.stringify({
                        data: [],
                        error:err
                    }));
                } 
                else 
                {
                    res.send(JSON.stringify({
                        data: rows,
                        error:""
                    }));
                    
                }
            });
        });

        app.post('/updatePaymentInfo',function(req, res){
            res.setHeader('Content-Type', 'application/json');
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            var number=req.body.number;
            var sql="update users1 set dues = '0' where number = '"+number+"'";        
            pool.query(sql, function (err, rows) {       
                if (err) {
                    res.send(JSON.stringify({
                        data: [],
                        error:err
                    }));
                } 
                else 
                {
                    res.send(JSON.stringify({
                        data: rows,
                        error:""
                    }));
                    
                }
            });
        }); 
});