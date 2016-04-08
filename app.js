var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();
var fs = require('fs');
var handlebars = require('handlebars');
var path = require('path');

var process_weekly_sales = require("./process_weekly_sales");
var process_weekly_purchases = require("./process_weekly_purchases");
var categories = require('./categories');

app.use(express.static('public'));

app.set('port', (process.env.PORT || 3000));

app.engine('hbs', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'hbs');

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/aboutus', function (req, res) {
    res.render('aboutus');
});

app.get('/:week', function(req, res) {

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

    var result = { Week: week.match(/\d+/), pop:[most_popular,least_popular, most_popular_cat,least_popular_cat],
                profit: [most_profitable_product, most_profitable_cat ]};

    res.render('display',result);

});

// app.listen(3000, function() {
//   console.log('Opening port 3000!');
// });

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
