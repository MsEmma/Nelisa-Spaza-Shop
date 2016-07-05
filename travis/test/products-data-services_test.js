var assert = require('assert'),
    mysql = require('mysql'),
    ProductsDataService = require('../products-data-services');

describe('test the ProductsDataService', function() {

    const password = process.env.MYSQL_PWD !== null ? process.env.MYSQL_PWD : 'nelisa';

    var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: process.env.MYSQL_USER || 'root',
        password: password,
        port: 3306,
        database: 'spaza'
    });

    it("should should count the number of products in the products table", function(done) {

        connection.query('select count(*) as productCount from products', function(err, products) {
            console.log(err);
            assert.equal(20, products[0].productCount);
            done();
        });
    });
});
