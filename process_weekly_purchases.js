#!/usr/bin/node

var fs = require('fs');

exports.getPurchases = function(filepath) {

  var inputPurchases = fs.readFileSync(filepath, "utf8");
  inputPurchases = inputPurchases.replace("Shop;Date;Item;Quantity;Cost;Total Cost\n", "").split('\n');

  var purchasesArray = [];

  for (i = 0; i < inputPurchases.length - 1; i++) {
    purchasesArray.push(inputPurchases[i].split(";"));
  }

  for (var i = purchasesArray.length - 1; i >= 0; i--) {
    if (purchasesArray[i][1] === "01-Mar") {
      purchasesArray.splice(i, 1);
    }
  }
  var week0Purchases = [];
  var week1Purchases = [];
  var week2Purchases = [];
  var week3Purchases = [];
  var week4Purchases = [];
  var weeklyPurchases = {};

  for (i = 0; i < purchasesArray.length; i++) {
    dt = purchasesArray[i][1];
    var date = new Date(dt);

    if (date.getMonth() === 0) {
      week0Purchases.push(purchasesArray[i]);
    }

    if (date.getDate() < 8) {
      week1Purchases.push(purchasesArray[i]);
    }

    if (date.getDate() > 7 && date.getDate() < 15) {
      week2Purchases.push(purchasesArray[i]);
    }

    if (date.getDate() > 15 && date.getDate() < 22) {
      week3Purchases.push(purchasesArray[i]);
    }

    if (date.getDate() > 21 && date.getDate() < 28 && date.getMonth() === 1) {
      week4Purchases.push(purchasesArray[i]);
    }
  }

  purchases = {
    "week0": week0Purchases,
    "week1": week1Purchases,
    "week2": week2Purchases,
    "week3": week3Purchases,
    "week4": week4Purchases
  };

  return purchases;
};

exports.getWeeklyPurchases = function(purchases, week) {

  var purchasesList = [];

  purchases[week].forEach(function(array) {
    var price = array[4].replace("R", "");
    price = Number(price.replace(",", "."));
    purchasesList.push([array[2], price]);
  });

  purchasesList.sort();

  var weeklyPurchases = {};

  purchasesList.forEach(function(array) {

    if (!weeklyPurchases.hasOwnProperty(array[0])) {
      weeklyPurchases[array[0]] = [array[1]];
    } else {
      weeklyPurchases[array[0]].push(array[1]);
    }
  });

  return weeklyPurchases;
};

exports.getCostPrices = function(weeklyPurchases) {

  var costPrices = {};

  for (var fruit in weeklyPurchases) {
    var total = 0;

    weeklyPurchases[fruit].forEach(function(price) {
      total += price;
    });

    var averageCost = Number((total / (weeklyPurchases[fruit].length)).toFixed(2));

    costPrices[fruit] = averageCost;
  }

  return costPrices;
}

exports.getTotalProfit = function(costPrices, selling_prices, weekly_sales) {

  var profitMap = {};

  for (var product in selling_prices) {
    for (var products in costPrices) {
      if (product === products) {
        profitMap[product] = (selling_prices[product] - costPrices[products])
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

  return totalProfit;
}

exports.getMostProfitableProduct = function(totalProfit) {

  var profit = [];

  for (var product in totalProfit) {
    profit.push(totalProfit[product]);
  }

  var mostProfit = Math.max.apply(null, profit);

  for (product in totalProfit) {
    if (totalProfit[product] === mostProfit) {
      var mostProfitableProduct = {
        "Most Profitable Product": product,
        "Profit": mostProfit
      };
    }
  }

  return mostProfitableProduct;
}
