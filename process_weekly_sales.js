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

exports.getCategoriesMap = function(filepath){

  var categories = fs.readFileSync('./input/categories.csv', "utf8");
  categories = categories.replace("Product,Category\n", "").split('\n');

  var categoriesArray = [];

  for (i = 0; i < categories.length - 1; i++) {
    categoriesArray.push(categories[i].split(","));
  }

  var categoriesMap = {};

  categoriesArray.forEach(function(array){
    if (!categoriesMap.hasOwnProperty(array[0])) {
      categoriesMap[array[0]] = array[1];
    }
  })

  return categoriesMap;
}
