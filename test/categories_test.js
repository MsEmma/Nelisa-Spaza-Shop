var assert = require('assert');
var categories = require('../categories');

var process_weekly_sales = require("../process_weekly_sales");
var process_weekly_purchases = require("../process_weekly_purchases");

var sales = process_weekly_sales.getSalesList('./input/week4.csv');
var weekly_sales = process_weekly_sales.getWeeklySales(sales);

var category_map = categories.getCategories('./input/categories.csv');

describe("categories", function() {

  it('should return a map of categories and products', function() {
    assert.deepEqual(categories.getCategories('./input/categories.csv'), {
      'Milk 1l': 'Dairy',
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

  it('should return a map of categories sales', function() {
    assert.deepEqual(categories.getCatSales(category_map, weekly_sales), {
      Dairy: 72,
      Fruit: 45,
      Bakery: 30,
      'Canned Food': 58,
      'Soft Drinks': 83,
      Staples: 54,
      Sweets: 28,
      Toiletries: 29
    });
  });

  it('should return the most popular category  and the quantity sold', function() {
    assert.deepEqual(categories.getMostPopularCategory({
      Dairy: 72,
      Fruit: 45,
      Bakery: 30,
      'Canned Food': 58,
      'Soft Drinks': 83,
      Staples: 54,
      Sweets: 28,
      Toiletries: 29
    }), {
      'Most popular category is': 'Soft Drinks',
      Sold: 83
    });
  });

  it('should return the least popular category  and the quantity sold', function() {
    assert.deepEqual(categories.getLeastPopularCategory({
      Dairy: 72,
      Fruit: 45,
      Bakery: 30,
      'Canned Food': 58,
      'Soft Drinks': 83,
      Staples: 54,
      Sweets: 28,
      Toiletries: 29
    }), {
      'Least popular category is': 'Sweets',
      Sold: 28
    });
  });

  it('should return a categories profit map', function() {
    assert.deepEqual(categories.getCatProfit(category_map, {
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
      Dairy: 371,
      Fruit: 31.5,
      Bakery: 69.9,
      'Canned Food': 150.14,
      'Soft Drinks': 212.26,
      Staples: 231,
      Sweets: 0,
      Toiletries: 157
    });
  });

  it('should return the most profitable category and the profit', function() {
    assert.deepEqual(categories.getMostProfitableCategory({
      Dairy: 371,
      Fruit: 31.5,
      Bakery: 69.9,
      'Canned Food': 150.14,
      'Soft Drinks': 212.26,
      Staples: 231,
      Sweets: 0,
      Toiletries: 157
    }), {
      'Most profitable category is': 'Dairy',
      Profit: 371
    });
  });

});
