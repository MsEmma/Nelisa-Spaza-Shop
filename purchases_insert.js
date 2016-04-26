var mysql = require('mysql');
var fs = require('fs');
var process_purchases = require('./process_weekly_purchases');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'nelisa',
    database: 'spaza'
});


connection.query('SELECT * FROM products', function(err, products) {
    if (err) return next(err);

    var productIdMap = {};

    products.forEach(function(product) {
        productIdMap[product.product] = product.id;
    });

    var purchases = process_purchases.getPurchases('./input/purchases.csv');
    var pur_values = [];

    purchases.week4.forEach(function(array) {
            var shop = array[0],
                date = new Date(array[1] + "-2016"),
                productName = array[2],
                quantity = Number(array[3]),
                cost = Number(array[4]),
                productId = productIdMap[productName];

            pur_values.push([shop, date, productId, quantity, cost]);
    });

        var pur_sql = "INSERT INTO purchases (shop,date,product_id,quantity,cost) VALUES ?";
        connection.query(pur_sql, [pur_values], function(err) {
            if (err) throw err;
            connection.end();
        });
});
