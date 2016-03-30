// console.log(process.argv.slice(2));

// get the modules to use
var process_weekly_sales = require("./process_weekly_sales");
var process_weekly_purchases = require("./process_weekly_purchases");
var results = require("./results");

//read params from the command line & use the modules

var sales = process_weekly_sales.getSalesList(process.argv[2]);
var weekly_sales = process_weekly_sales.getWeeklySales(sales);
var most_popular = process_weekly_sales.getPopularProduct(weekly_sales);
var least_popular = process_weekly_sales.getLeastPopularProduct(weekly_sales);

//display results
console.log(weekly_sales);
console.log(most_popular);
console.log(least_popular);


// call function using node popular.js ./input/week1.csv
