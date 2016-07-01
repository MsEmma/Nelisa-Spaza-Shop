var assert = require('assert'),
    mysql = require('mysql'),
    ProductsDataService = require('../products-data-service');

describe('test the ProductsDataService', function() {

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'nelisa',
        port: 3306,
        database: 'spaza'
    });

    it('getProduct should return a specific product', function(done) {
        var productsDataService = new ProductsDataService(connection);
        productsDataService.getProduct(4, function(err, product) {
          assert.ifError(err)
          assert.equal('Chakalaka Can', product.product);
          done();
        });
    });
});
