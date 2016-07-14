var assert = require('assert'),
    mysql = require('mysql'),
    ProductsDataServices = require('../db_services/products-data-services');

describe('test the ProductsDataServices', function() {

    const url = process.env.MYSQL_URL !== undefined ? process.env.MYSQL_URL : 'mysql://root:nelisa@localhost/test';
    var connection = mysql.createConnection(url);

    it('should return product list length', function(done) {
        var productsDataServices = new ProductsDataServices(connection);
        return productsDataServices.show()
            .then(function(products) {
                assert.equal(10, products.length);
                done();
            });
    });

    // it('should return product list length', function(done) {
    //     var productsDataServices = new ProductsDataServices(connection);
    //     var data = {
    //         product: 'Sprite',
    //         category_id: 5
    //     };
    //
    //     return productsDataServices.add(data)
    //         .then(function(products) {
    //             assert.equal(10, products.length);
    //             done();
    //         });
    // });

    it("should should count the number of products in the products table", function(done) {

        connection.query('select count(*) as productCount from products', function(err, products) {
            console.log(err);
            assert.equal(10, products[0].productCount);
            done();
        });
    });
});
