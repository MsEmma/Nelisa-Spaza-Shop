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

  it('should return cost price map for week4', function() {
    var result = process_weekly_purchases.getCostPrices(weekly_purchases);
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

  it('should return the total profit map', function() {
    assert.deepEqual(process_weekly_purchases.getTotalProfit({
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
    },{
      'Milk 1l': 10,
      Amasi: 25,
      Bread: 12,
      'Chakalaka Can': 10,
      'Gold Dish Vegetable Curry Can': 9,
      'Fanta 500ml': 6.5,
      'Coke 500ml': 6.5,
      'Cream Soda 500ml': 7.5,
      'Iwisa Pap 5kg': 30,
      'Top Class Soy Mince': 12,
      'Shampoo 1 litre': 30,
      'Soap Bar': 6,
      'Bananas - loose': 2,
      'Apples - loose': 2,
      'Mixed Sweets 5s': 3
    }, {
      'Milk 1l': 41,
      Amasi: 31,
      Bread: 30,
      'Chakalaka Can': 28,
      'Gold Dish Vegetable Curry Can': 30,
      'Fanta 500ml': 22,
      'Coke 500ml': 42,
      'Cream Soda 500ml': 19,
      'Iwisa Pap 5kg': 15,
      'Top Class Soy Mince': 39,
      'Shampoo 1 litre': 10,
      'Soap Bar': 19,
      'Bananas - loose': 18,
      'Apples - loose': 27,
      'Mixed Sweets 5s': 28
    }), {
      Amasi: 248,
      'Apples - loose': 13.5,
      'Bananas - loose': 18,
      Bread: 69.9,
      'Chakalaka Can': 65.24,
      'Coke 500ml': 126,
      'Cream Soda 500ml': 57,
      'Fanta 500ml': 29.26,
      'Gold Dish Vegetable Curry Can': 84.9,
      'Iwisa Pap 5kg': 75,
      'Milk 1l': 123,
      'Mixed Sweets 5s': 0,
      'Shampoo 1 litre': 100,
      'Soap Bar': 57,
      'Top Class Soy Mince': 156
    });
  });

  it('should return the most profitable product sold and profit amount', function() {
    assert.deepEqual(process_weekly_purchases.getMostProfitableProduct({
      Amasi: 248,
      'Apples - loose': 13.5,
      'Bananas - loose': 18,
      Bread: 69.9,
      'Chakalaka Can': 65.24,
      'Coke 500ml': 126,
      'Cream Soda 500ml': 57,
      'Fanta 500ml': 29.26,
      'Gold Dish Vegetable Curry Can': 84.9,
      'Iwisa Pap 5kg': 75,
      'Milk 1l': 123,
      'Mixed Sweets 5s': 0,
      'Shampoo 1 litre': 100,
      'Soap Bar': 57,
      'Top Class Soy Mince': 156
    }), {
      'Most Profitable Product': 'Amasi',
      Profit: 248
    });
  });

});
