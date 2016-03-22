#!/usr/bin/node

var fs = require('fs');

exports.getSalesList = function(filepath) {

  var fs = require('fs');

  var inputSales = fs.readFileSync(filepath, "utf8");
  inputSales = inputSales.replace("Day,Date,stock item,No sold,Sales Price\n", "")

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
    salesList.push([array[2], Number(array[3])]);
  })

  return salesList;
}

exports.getWeeklySales = function(salesList) {

  var weeklySales = {};

  salesList.forEach(function(array) {
    if (!weeklySales.hasOwnProperty(array[0])) {
      weeklySales[array[0]] = array[1];
    } else {
      weeklySales[array[0]] += array[1];
    }
  })

  return weeklySales;
}

exports.getPopularProduct = function(weeklySales) {

  var mostSold = 0;

  for (var product in weeklySales) {
    if (weeklySales[product] > mostSold) {
      mostSold = weeklySales[product];
    }
  };

  for (var product in weeklySales) {
    if (weeklySales[product] === mostSold) {
      var popularProduct = {
        "Most popular product is": product,
        "Sold": mostSold
      }
    };
  }

  return popularProduct;
}

exports.getLeastPopularProduct = function(weeklySales) {

  var sold = [];

  for (var product in weeklySales) {
    sold.push(weeklySales[product]);
  };

  var leastSold = Math.min.apply(null, sold);

  for (var product in weeklySales) {
    if (weeklySales[product] === leastSold) {
      var leastPopularProduct = {
        "Least popular product is": product,
        "Sold": leastSold
      }
    }
  };

  return leastPopularProduct;
}

// exports.getWeeklyPurchases = function(filepath){

var inputPurchases = fs.readFileSync('./input/purchases.csv', "utf8");
inputPurchases = inputPurchases.replace("Shop;Date;Item;Quantity;Cost;Total Cost\n", "");

var tempArray = inputPurchases.split('\n');
var purchasesArray = [];

for (i = 0; i < tempArray.length - 1; i++) {

  purchasesArray.push(tempArray[i].split(";"));
}


var week1Purchases = [];
var week2Purchases = [];
var week3Purchases = [];
var week4Purchases = [];

// for (i = 0; i < purchasesArray.length; i++) {
//   if (purchasesArray[i][1] < "8-Feb") {
//     week1Purchases.push(purchasesArray[i]);
//   }
// }
//
// console.log(week1Purchases)

// var purchasesList = [];
//
// purchasesArray.forEach(function(array) {
//   purchasesList.push([array[2], Number(array[3])]);
// })
//
// return purchasesList;

// }
