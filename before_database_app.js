var express = require('express'),
    exphbs = require('express-handlebars'),
    app = express(),
    fs = require('fs'),
    handlebars = require('handlebars'),
    mysql = require('mysql'),
    bodyParser = require('body-parser'),
    myConnection = require('express-myconnection'),
    process_weekly_sales = require("./process_weekly_sales"),
    process_weekly_purchases = require("./process_weekly_purchases"),
    categories = require('./categories');

var dbOptions = {
    host: 'localhost',
    user: 'root',
    password: 'nelisa',
    port: 3306,
    database: 'spaza'
};

app.use(express.static('public'));

//configure the port number using and environment number
app.set('port', (process.env.PORT || 3000));

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
app.use(bodyParser.json());

function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', {
        error: err
    });
}

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/aboutus', function(req, res) {
    res.render('aboutus');
});

app.get('/stats/:week', function(req, res) {

    var week = req.params.week;
    var filepath = './input/' + week + '.csv';

    var sales = process_weekly_sales.getSalesList(filepath);
    var weekly_sales = process_weekly_sales.getWeeklySales(sales);
    var selling_prices = process_weekly_sales.getSellPrices(sales);
    var most_popular = process_weekly_sales.getPopularProduct(weekly_sales);
    var least_popular = process_weekly_sales.getLeastPopularProduct(weekly_sales);

    var purchases = process_weekly_purchases.getPurchases('./input/purchases.csv');
    var weekly_purchases = process_weekly_purchases.getWeeklyPurchases(purchases, week);
    var cost_prices = process_weekly_purchases.getCostPrices(weekly_purchases);
    var total_profit = process_weekly_purchases.getTotalProfit(cost_prices, selling_prices, weekly_sales);
    var most_profitable_product = process_weekly_purchases.getMostProfitableProduct(total_profit);

    var category_map = categories.getCategories('./input/categories.csv');
    var category_sales = categories.getCatSales(category_map, weekly_sales);
    var most_popular_cat = categories.getMostPopularCategory(category_sales);
    var least_popular_cat = categories.getLeastPopularCategory(category_sales);
    var cat_profit = categories.getCatProfit(category_map, total_profit);
    var most_profitable_cat = categories.getMostProfitableCategory(cat_profit);

    var result = {
        Week: week.match(/\d+/),
        pop: [most_popular, least_popular, most_popular_cat, least_popular_cat],
        profit: [most_profitable_product, most_profitable_cat]
    };

    res.render('display', result);

});

app.use(errorHandler);

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
Status
