// console.log(process.argv.slice(2));

// get the modules to use
var fs = require('fs');
var handlebars = require('handlebars');

var process_weekly_sales = require("./process_weekly_sales");
var process_weekly_purchases = require("./process_weekly_purchases");
var categories = require('./categories');

//read params from the command line & use the modules

var week = process.argv[2];

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

//display results on the terminal

// console.log(most_popular);
// console.log(least_popular);
// console.log(most_popular_cat);
// console.log(least_popular_cat);
// console.log(most_profitable_product);
// console.log(most_profitable_cat);

//display using handlebars

var source = fs.readFileSync('./display.hbs', "utf8");

var template = handlebars.compile(source);

var data = { Week: week.match(/\d+/), pop:[most_popular,least_popular,most_popular_cat,least_popular_cat],
            profit: [most_profitable_product, most_profitable_cat ]};

var result = template(data);

fs.writeFileSync( week + '_display.html', result);

// call function using node display.js ./input/week1.csv week1
