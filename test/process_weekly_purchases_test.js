var assert = require('assert');
var process_weekly_purchases = require('../process_weekly_purchases');
var purchases = process_weekly_purchases.getPurchases('./input/purchases.csv');
var weekly_purchases = process_weekly_purchases.getWeeklyPurchases(purchases);

describe("process_weekly_purchases", function() {

  it('should return purchases for week4', function() {
    var result = process_weekly_purchases.getPurchases('./input/week1.csv');
    assert.deepEqual(result, object);
  });

});
