var assert = require('assert'),
    mysql = require('mysql'),
    ProductsDataServices = require('.../db_services/products-data-services');

describe('test the ProductsDataServices', function() {

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'nelisa',
        port: 3306,
        database: 'test'
    });

    before(function() {
      // runs before all tests in this block
      DROP DATABASE test;
      CREATE DATABASE test;
      USE DATABASE test;

    source test.sql
  });


    it('should return product list length', function(done) {
        var productsDataServices = new ProductsDataServices(connection);
        return productsDataServices.show()
            .then(function(products) {
                assert.equal(22, products.length);
                done();
            });
    });

    it("should should count the number of products in the products table", function(done) {

        connection.query('select count(*) as productCount from products', function(err, products) {
            console.log(err);
            assert.equal(22, products[0].productCount);
            done();
        });
    });
});
