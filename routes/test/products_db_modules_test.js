var assert = require('assert'),
    mysql = require('mysql'),
    ProductsDB = require('../products_db_modules');

describe('test the ProductsDB', function() {

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'nelisa',
        port: 3306,
        database: 'spaza'
    });

    it('should return product list length', function(done) {
        var productsDB = new ProductsDB(connection);
        productsDB.show(function(err, products) {
          assert.ifError(err)
          assert.equal(20, products.length);
          done();
        });
    });
});
