var assert = require('assert'),
    mysql = require('mysql'),
    ProductsDataService = require('../products-data-service');

describe('test the ProductsDataService', function() {

    const password = process.env.MYSQL_PWD !== null ? process.env.MYSQL_PWD : 'nelisa';

    var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: process.env.MYSQL_USER || 'root',
        password: password,
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
