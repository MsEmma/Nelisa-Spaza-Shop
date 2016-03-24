var assert = require('assert');
var process_weekly_sales = require('../process_weekly_sales')
var sales = process_weekly_sales.getSalesList('./input/week4.csv');
var weekly_sales = process_weekly_sales.getWeeklySales(sales);


describe("process_weekly_sales", function() {

  it('should return length of processed sales list of week1', function() {
    assert.equal(105, process_weekly_sales.getSalesList('./input/week1.csv').length);
  });

  it('should return length of processed sales list of week2', function() {
    assert.equal(118, process_weekly_sales.getSalesList('./input/week2.csv').length);
  });

  it('should return length of processed sales list of week3', function() {
    assert.equal(105, process_weekly_sales.getSalesList('./input/week3.csv').length);
  });

  it('should return length of processed sales list of week4', function() {
    assert.equal(105, process_weekly_sales.getSalesList('./input/week4.csv').length);
  });

  it('should return selling price map', function() {
    assert.deepEqual(process_weekly_sales.getSPMap(sales), {
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
    });
  });

  it('should return weeklySales list', function() {
    assert.deepEqual(process_weekly_sales.getWeeklySales(sales), {
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
    });
  });

  it('should return a map of categories and products', function() {
    assert.deepEqual(process_weekly_sales.getCategoriesMap('./input/categories.csv'), {
      Milk: 'Dairy',
      Amasi: 'Dairy',
      Bread: 'Bakery',
      'Chakalaka Can': 'Canned Food',
      'Gold Dish Vegetable Curry Can': 'Canned Food',
      'Fanta 500ml': 'Soft Drinks',
      'Coke 500ml': 'Soft Drinks',
      'Cream Soda 500ml': 'Soft Drinks',
      'Iwisa Pap 5kg': 'Staples',
      'Top Class Soy Mince': 'Staples',
      'Shampoo 1 litre': 'Toiletries',
      'Soap Bar': 'Toiletries',
      'Bananas - loose': 'Fruit',
      'Apples - loose': 'Fruit',
      'Mixed Sweets 5s': 'Sweets',
      'Heart Chocolates': 'Sweets',
      'Rose (plastic)': 'Stationery',
      'Valentine Cards': 'Stationery'
    });
  });

});
