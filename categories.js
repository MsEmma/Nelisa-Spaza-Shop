#!/usr/bin/node

var fs = require('fs');
var process_weekly_sales = require("./process_weekly_sales");
var process_weekly_purchases = require("./process_weekly_purchases");

var sales = process_weekly_sales.getSalesList('./input/week4.csv');
var weekly_sales = process_weekly_sales.getWeeklySales(sales);

var total_profit = process_weekly_purchases.getTotalProfit();

exports.getCategories = function(filepath) {

  var inputCategories = fs.readFileSync(filepath, "utf8");
  inputCategories = inputCategories.replace("Product,Category\n", "").split('\n');

  var categoriesArray = [];

  for (i = 0; i < inputCategories.length - 1; i++) {
    categoriesArray.push(inputCategories[i].split(","));
  }

  categoriesArray.sort();

  var categories = {};

  categoriesArray.forEach(function(array) {
    if (!categories.hasOwnProperty(array[0])) {
      categories[array[0]] = array[1];
    }
  })

  return categories;
}

exports.getCatSales = function(categories, weekly_sales) {

  var catSales = {};

  for (var product in categories) {
    for (var products in weekly_sales) {
      if (product === products) {
        if (!catSales.hasOwnProperty(categories[product])) {
          catSales[categories[product]] = weekly_sales[products];
        } else {
          catSales[categories[product]] += weekly_sales[products];
        }
      }
    }
  }

  return catSales;
}

exports.getMostPopularCategory = function(catSales) {

  var mostCatSold = 0;
  var category = "";

  for (var cat in catSales) {
    if (catSales[cat] > mostCatSold) {
      mostCatSold = catSales[cat];
      category = cat;
    }
  }

  var mostPopularCategory = {
    "Most popular category is": category,
    "Sold": mostCatSold
  }

  return mostPopularCategory;
}

exports.getLeastPopularCategory = function(catSales) {

  var leastCatSold = 50;
  var category = "";

  for (var cat in catSales) {
    if (catSales[cat] < leastCatSold) {
      leastCatSold = catSales[cat];
      category = cat;
    }
  }

  var leastPopularCategory = {
    "Least popular category is": category,
    "Sold": leastCatSold
  }

  return leastPopularCategory;
}

exports.getCatProfit = function(categories, totalProfit) {

  var catProfit = {};

  for (var product in categories) {
    for (var products in totalProfit) {
      if (product === products) {
        if (!catProfit.hasOwnProperty(categories[product])) {
          catProfit[categories[product]] = totalProfit[products];
        } else {
          catProfit[categories[product]] += totalProfit[products];
        }
      }
    }
  }

  return catProfit;
}

exports.getMostProfitableCategory = function(catProfit) {

  var maxProfit = 0;
  var mostProfitableCat = "";

  for (var cat in catProfit) {
    if (catProfit[cat] > maxProfit) {
      maxProfit = catProfit[cat];
      mostProfitableCat = cat;
    }
  }

  var mostProfitableCategory = {
    "Most profitable category is": mostProfitableCat,
    "Profit": maxProfit
  }

  return mostProfitableCategory;
}
