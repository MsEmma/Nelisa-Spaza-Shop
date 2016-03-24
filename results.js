#!/usr/bin/node

var process_weekly_sales = require('./process_weekly_sales');
var process_weekly_purchases = require('./process_weekly_purchases');

var sales = process_weekly_sales.getSalesList('./input/week2.csv');
var weekly_sales = process_weekly_sales.getWeeklySales(sales);
var selling_prices = process_weekly_sales.getSPMap(sales);

var purchases = process_weekly_purchases.getPurchases('./input/purchases.csv');
var weekly_purchases = process_weekly_purchases.getWeeklyPurchases(purchases, "week2");
var cost_prices = process_weekly_purchases.getCostPriceMap(weekly_purchases);

exports.getPopularProduct = function(weekly_sales) {

  var mostSold = 0;

  for (var product in weekly_sales) {
    if (weekly_sales[product] > mostSold) {
      mostSold = weekly_sales[product];
    }
  }

  for (product in weekly_sales) {
    if (weekly_sales[product] === mostSold) {
      var popularProduct = {
        "Most popular product is": product,
        "Sold": mostSold
      };
    }
  }

  return popularProduct;
};

exports.getLeastPopularProduct = function(weekly_sales) {

  var sold = [];

  for (var product in weekly_sales) {
    sold.push(weekly_sales[product]);
  }

  var leastSold = Math.min.apply(null, sold);

  for (product in weekly_sales) {
    if (weekly_sales[product] === leastSold) {
      var leastPopularProduct = {
        "Least popular product is": product,
        "Sold": leastSold
      };
    }
  }

  return leastPopularProduct;
};

exports.getMostProfitableProduct = function() {

  var profitMap = {};

  for (var product in selling_prices) {
    for (var products in cost_prices) {
      if (product === products) {
        profitMap[product] = (selling_prices[product] - cost_prices[products])
      }
    }
  }

  var totalProfit = {};

  for (var product in profitMap) {
    for (var products in weekly_sales) {
      if (product === products) {
        totalProfit[product] = Number((weekly_sales[products] * profitMap[product]).toFixed(2))
      }
    }
  }

  var profit = [];

  for (var product in totalProfit) {
    profit.push(totalProfit[product]);
  }

  var mostProfit = Math.max.apply(null, profit);

  for (product in totalProfit) {
    if (totalProfit[product] === mostProfit) {
      var mostProfitableProduct = {
        "Most profitable product is": product,
        "Profit": mostProfit
      };
    }
  }

  return mostProfitableProduct;
}

console.log(selling_prices);
