var assert = require('assert');
var process_weekly =require('../process_weekly')

describe("process_weekly", function(){

    it('should return length of processed sales list of week1', function(){
          assert.equal(106, process_weekly.getSalesList('./input/week1.csv').length);
    });

    it('should return length of processed sales list of week2', function(){
          assert.equal(119, process_weekly.getSalesList('./input/week2.csv').length);
    });

    it('should return length of processed sales list of week3', function(){
          assert.equal(106, process_weekly.getSalesList('./input/week3.csv').length);
    });

    it('should return length of processed sales list of week4', function(){
          assert.equal(106, process_weekly.getSalesList('./input/week4.csv').length);
    });

});
