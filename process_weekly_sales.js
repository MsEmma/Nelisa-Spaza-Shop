#!/usr/bin/node

var fs = require('fs');

exports.getSalesList = function(filepath) {

  var inputSales = fs.readFileSync(filepath, "utf8");
  inputSales = inputSales.replace("Day,Date,stock item,No sold,Sales Price\n", "");

  var interimArray = inputSales.split('\n');
  var salesArray = [];

  for (i = 0; i < interimArray.length - 1; i++) {
    salesArray.push(interimArray[i].split(","));
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

  return salesList;
};

exports.getSPMap = function(salesList) {

  var SPMap = {};

  salesList.forEach(function(array) {
    var price = Number(array[2].replace("R", ""));
    if (!SPMap.hasOwnProperty(array[0])) {
      SPMap[array[0]] = price;
    }
  });

  return SPMap;
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

  for (var product in weeklySales) {
    if (weeklySales[product] > mostSold) {
      mostSold = weeklySales[product];
    }
  }

  for (product in weeklySales) {
    if (weeklySales[product] === mostSold) {
      var popularProduct = {
        "Most popular product is": product,
        "Sold": mostSold
      };
    }
  }

  return popularProduct;
};

exports.getLeastPopularProduct = function(weeklySales) {

  var sold = [];

  for (var product in weeklySales) {
    sold.push(weeklySales[product]);
  }

  var leastSold = Math.min.apply(null, sold);

  for (product in weeklySales) {
    if (weeklySales[product] === leastSold) {
      var leastPopularProduct = {
        "Least popular product is": product,
        "Sold": leastSold
      };
    }
  }

  return leastPopularProduct;
};
