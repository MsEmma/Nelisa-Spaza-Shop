var assert = require('assert');
var process_weekly = require('../process_weekly')
var sales = process_weekly.getSalesList('./input/week4.csv');
var weekly_sales = process_weekly.getWeeklySales(sales);


describe("process_weekly", function() {

  it('should return length of processed sales list of week1', function() {
    assert.equal(105, process_weekly.getSalesList('./input/week1.csv').length);
  });

  it('should return length of processed sales list of week2', function() {
    assert.equal(118, process_weekly.getSalesList('./input/week2.csv').length);
  });

  it('should return length of processed sales list of week3', function() {
    assert.equal(105, process_weekly.getSalesList('./input/week3.csv').length);
  });

  it('should return length of processed sales list of week4', function() {
    assert.equal(105, process_weekly.getSalesList('./input/week4.csv').length);
  });

  it('should return weeklySales list', function() {
    assert.deepEqual(process_weekly.getWeeklySales(sales), {
      'Milk 1l': 41,
      Imasi: 31,
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
    });
  });

  it('should return the most popular product sold and quantity sold', function() {
    assert.deepEqual(process_weekly.getPopularProduct(weekly_sales), {
      'Most popular product is': 'Coke 500ml',
      Sold: 42
    });
  });

  it('should return the least popular product sold and quantity sold', function() {
    assert.deepEqual(process_weekly.getLeastPopularProduct(weekly_sales), {
      'Least popular product is': 'Shampoo 1 litre',
      Sold: 10
    });
  });


});
