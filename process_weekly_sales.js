#!/usr/bin/node

var fs = require('fs');

exports.getSalesList = function(filepath) {

  var inputSales = fs.readFileSync(filepath, "utf8");
  inputSales = inputSales.replace("Day,Date,stock item,No sold,Sales Price\n", "").split('\n');

  var salesArray = [];

  for (i = 0; i < inputSales.length - 1; i++) {
    salesArray.push(inputSales[i].split(","));
  }

  for (var i = salesArray.length - 1; i >= 0; i--) {
    if (salesArray[i][1] === "1-Mar") {
      salesArray.splice(i, 1);
    }
  }

  var salesList = [];

  salesArray.forEach(function(array) {
    salesList.push([array[2], Number(array[3]), array[4]]);
  });

  salesList.sort();
  return salesList;
};

exports.getWeeklySales = function(salesList) {

  var weeklySales = {};

  salesList.forEach(function(array) {
    if (!weeklySales.hasOwnProperty(array[0])) {
      weeklySales[array[0]] = array[1];
    } else {
      weeklySales[array[0]] += array[1];
    }
  });

  return weeklySales;
};

exports.getPopularProduct = function(weeklySales) {

  var mostSold = 0;
  var mostPP = "";

  for (var product in weeklySales) {
    if (weeklySales[product] > mostSold) {
      mostSold = weeklySales[product];
      mostPP = product;
    }
  }

  var popularProduct = {
    "descr" : "Most Popular Product",
    "name": mostPP,
    "quantity": mostSold
  };

  return popularProduct;
};

exports.getLeastPopularProduct = function(weeklySales) {

  var leastSold = 50;
  var leastPP = "";

  for (product in weeklySales) {
    if (weeklySales[product] < leastSold) {
      leastSold = weeklySales[product];
      leastPP = product;
    }
  }

  var leastPopularProduct = {
    "descr" : "Least Popular Product",
    "name": leastPP,
    "quantity": leastSold
  };

  return leastPopularProduct;
};

exports.getSellPrices = function(salesList) {

  var sellPrices = {};

  salesList.forEach(function(array) {
    var price = Number(array[2].replace("R", ""));
    if (!sellPrices.hasOwnProperty(array[0])) {
      sellPrices[array[0]] = price;
    }
  });

  return sellPrices;
};
