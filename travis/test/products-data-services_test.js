var assert = require('assert'),
    mysql = require('mysql'),
    ProductsDataService = require('../products-data-services');

describe('test the ProductsDataService', function() {

    const url = process.env.MYSQL_URL !== null ? process.env.MYSQL_URL : 'mysql://root:nelisa@localhost/test';

    var connection = mysql.createConnection(url);  

    it("should should count the number of products in the products table", function(done) {

        connection.query('select count(*) as productCount from products', function(err, products) {
            console.log(err);
            assert.equal(20, products[0].productCount);
            done();
        });
    });
});
