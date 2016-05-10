var mysql = require('mysql');
var fs = require('fs');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'nelisa',
    database: 'spaza'
});

connection.query('SELECT * FROM products', function(err, products) {
    if (err) return next(err);

    var inputSales = (fs.readFileSync('./input/week4.csv', "utf8"))
        .replace(/Feb/g, "Feb-2016")
        .split('\n');

    var sales_values = [];

    var productIdMap = {};

    products.forEach(function(product) {
        productIdMap[product.product] = product.id;
    });

    for (i = 1; i < inputSales.length - 1; i++) {
        var temp = inputSales[i].split(',');
        var date = new Date(temp[1]),
            productName = temp[2],
            quantitySold = Number(temp[3]),
            price = Number(temp[4].match(/\d+/).join()),
            productId = productIdMap[productName];

        sales_values.push([date, productId, quantitySold, price]);
    }

    var sales_sql = "INSERT INTO sales (date,product_id,sold,price) VALUES ?";
    connection.query(sales_sql, [sales_values], function(err) {
        if (err) throw err;
        connection.end();
    });
});
