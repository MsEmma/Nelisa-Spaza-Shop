var assert = require('assert');
var results = require('../results');
var process_weekly_sales = require('../process_weekly_sales');
var process_weekly_purchases = require('../process_weekly_purchases');

var sales = process_weekly_sales.getSalesList('./input/week4.csv');
var weekly_sales = process_weekly_sales.getWeeklySales(sales);

var purchases = process_weekly_purchases.getPurchases('./input/purchases.csv');
var weekly_purchases = process_weekly_purchases.getWeeklyPurchases(purchases, "week4");
var cost_prices = process_weekly_purchases.getCostPriceMap(weekly_purchases);

describe("results", function() {

  it('should return the most popular product sold and quantity sold', function() {
    assert.deepEqual(results.getPopularProduct(weekly_sales), {
      'Most popular product is': 'Coke 500ml',
      Sold: 42
    });
  });

  it('should return the least popular product sold and quantity sold', function() {
    assert.deepEqual(results.getLeastPopularProduct(weekly_sales), {
      'Least popular product is': 'Shampoo 1 litre',
      Sold: 10
    });
  });

  it('should return the most profitable product sold and profit amount', function() {
    assert.deepEqual(results.getMostProfitableProduct(), {
      'Most profitable product is': 'Amasi',
      Profit: 288
    });
  });

});
