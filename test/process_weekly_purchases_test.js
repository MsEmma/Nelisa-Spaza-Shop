var assert = require('assert');
var process_weekly_purchases = require('../process_weekly_purchases');
var purchases = process_weekly_purchases.getPurchases('./input/purchases.csv');
var weekly_purchases = process_weekly_purchases.getWeeklyPurchases(purchases, "week4");

describe("process_weekly_purchases", function() {

  it('should return the length of purchases for week1', function() {
    var result = purchases.week1.length;
    assert.equal(result, 23);
  });

  it('should return the length of purchases for week3', function() {
    var result = purchases.week3.length;
    assert.equal(result, 32);
  });

  it('should return the map of product and cost price for week4', function() {
    var result = process_weekly_purchases.getWeeklyPurchases(purchases, "week4");
    assert.deepEqual(result, {
      'Apples - loose': [1.5, 1.5],
      'Bananas - loose': [1, 1],
      Bread: [11, 9, 9],
      'Chakalaka Can': [7, 7, 9],
      'Coke 500ml': [3.5, 3.5],
      'Cream Soda 500ml': [4.5, 4.5],
      'Fanta 500ml': [4.5, 4.5, 6.5],
      'Gold Dish Vegetable Curry Can': [5, 5, 8.5],
      Amasi: [17, 17],
      'Iwisa Pap 5kg': [20, 30],
      'Milk 1l': [7, 7],
      'Mixed Sweets 5s': [3],
      'Shampoo 1 litre': [20, 20],
      'Soap Bar': [3, 3, 3],
      'Top Class Soy Mince': [8, 8]
    });
  });

  it('should return costPriceMap for week4', function() {
    var result = process_weekly_purchases.getCostPriceMap(weekly_purchases);
    assert.deepEqual(result, {
      'Apples - loose': 1.5,
      'Bananas - loose': 1,
      Bread: 9.67,
      'Chakalaka Can': 7.67,
      'Coke 500ml': 3.5,
      'Cream Soda 500ml': 4.5,
      'Fanta 500ml': 5.17,
      'Gold Dish Vegetable Curry Can': 6.17,
      Amasi: 17,
      'Iwisa Pap 5kg': 25,
      'Milk 1l': 7,
      'Mixed Sweets 5s': 3,
      'Shampoo 1 litre': 20,
      'Soap Bar': 3,
      'Top Class Soy Mince': 8
    });
  });

});
