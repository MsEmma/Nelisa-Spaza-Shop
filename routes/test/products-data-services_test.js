var assert = require('assert'),
    mysql = require('mysql'),
    ProductsDataServices = require('../products-data-services');

describe('test the ProductsDataServices', function() {

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'nelisa',
        port: 3306,
        database: 'spaza'
    });

    it('should return product list length', function() {
        var productsDataServices = new ProductsDataServices(connection);
        return productsDataServices.show()
            .then(function(products) {
                assert.equal(22, products.length);
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
