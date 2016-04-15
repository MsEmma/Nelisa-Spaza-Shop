var mysql = require('mysql');
var fs = require('fs');
var process_purchases = require('./process_weekly_purchases');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'nelisa',
  database: 'spaza'
});

var sales_sql = "INSERT INTO sales (day,date,product,sold,sales_price,week) VALUES ?";

var inputSales = (fs.readFileSync('./input/week4.csv', "utf8"))
.replace(/,R/g, ",")
.replace(/ose (plastic)/g, "Rose (plastic)")
.split('\n');

var sales_values = [];

for (i = 1; i < inputSales.length - 1; i++) {
  var temp = inputSales[i].split(',');
  values.push([temp[0], temp[1], temp[2], Number(temp[3]), Number(temp[4]),4]);
}

connection.query(sales_sql, [sales_values], function(err) {
  if (err) throw err;
  connection.end();
});

var pur_sql = "INSERT INTO purchases (shop,date,product,quantity,cost,total_cost,week) VALUES ?";

var purchases = process_purchases.getPurchases('./input/purchases.csv');

var pur_values = [];

purchases.week4.forEach(function(array){
  values.push([array[0], array[1], array[2],Number(array[3]),Number(array[4]),Number(array[5]),4]);
})

connection.query(pur_sql, [pur_values], function(err) {
  if (err) throw err;
  connection.end();
});
