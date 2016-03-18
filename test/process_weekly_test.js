var assert = require('assert');
var process_data =require('../process_data')


describe("process_data", function(){

    it('should find the lines syncronously', function(){
          assert.equal(11, process_data.getsalesList('./input/week1.csv').length);
    });   

});
