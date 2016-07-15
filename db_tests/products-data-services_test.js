var assert = require('assert'),
    mysql = require('mysql'),
    ProductsDataServices = require('../db_services/products-data-services');

describe('test the ProductsDataServices', function() {

    const url = process.env.MYSQL_URL !== undefined ? process.env.MYSQL_URL : 'mysql://root:nelisa@localhost/test';
    var connection = mysql.createConnection(url);
    var productsDataServices = new ProductsDataServices(connection);

    after(function(done) {

        connection.query('ALTER TABLE `products` AUTO_INCREMENT = 11', function() {
              done();
        });
    });

    it('should return product list length', function(done) {
        return productsDataServices.show()
            .then(function(products) {
                assert.equal(10, products.length);
                done();
            });
    });

    it('should return the new product list length after adding a product', function(done) {
        var data = {
            product: 'Sprite',
            category_id: 5
        };
        return productsDataServices.add(data)
            .then(function() {
                productsDataServices.show()
                    .then(function(products) {
                        assert.equal(11, products.length);
                        done();
                    });
            });
    });

    it('should return the new product list length after deleting a product', function(done) {
        var id = 11;
        return productsDataServices.delete(id)
            .then(function() {
                productsDataServices.show()
                    .then(function(products) {
                        assert.equal(10, products.length);
                        done();
                    });
            });
    });
});
