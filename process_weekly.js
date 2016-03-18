#!/usr/bin/node

exports.getSalesList = function(filepath) {

  var fs = require('fs');

  var inputSales = fs.readFileSync(filepath, "utf8");
  inputSales = inputSales.replace("Day,Date,stock item,No sold,Sales Price\n", "")

  var interimArray = inputSales.split('\n');
  var processedArray = [];

  for (i = 0; i < interimArray.length; i++) {
    processedArray.push(interimArray[i].split(","));
  }

  for (var i = processedArray.length - 1; i >= 0; i--) {
    if (processedArray[i][1] === "1-Mar") {
      processedArray.splice(i, 1);
    }
  }

  var salesList = [];

  processedArray.forEach(function(array) {
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

  var popularProduct = {};

  for (var product in weeklySales) {
    if (weeklySales[product] === mostSold) {
      popularProduct = {
        "The most popular product is": product,
        "Quantities sold": mostSold
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

  var leastPopularProduct = {};

  for (var product in weeklySales) {
    if (weeklySales[product] === leastSold) {
      leastPopularProduct = {
        "The least popular product is": product,
        "Quantities sold": leastSold
      }
    }
  };

  return leastPopularProduct;
}

// console.log(process.argv.slice(2));
