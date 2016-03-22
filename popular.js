// console.log(process.argv.slice(2));

// get the modules to use
var process_weekly = require("./process_weekly")

//read params from the command line & use the modules

var sales = process_weekly.getSalesList(process.argv[2]);
var weekly_sales = process_weekly.getWeeklySales(sales);
var most_popular = process_weekly.getPopularProduct(weekly_sales);
var least_popular = process_weekly.getLeastPopularProduct(weekly_sales);

//display results
console.log(weekly_sales);
console.log(most_popular);
console.log(least_popular);

// call function using node popular.js ./input/week1.csv
