var assert = require('assert'),
    mysql = require('mysql'),
    SalesDataServices = require('../db_services/sales-data-services');

describe('test the SalesDataServices', function() {

    const url = process.env.MYSQL_URL !== undefined ? process.env.MYSQL_URL : 'mysql://root:nelisa@localhost/test';
    var connection = mysql.createConnection(url);
    var salesDataServices = new SalesDataServices(connection);

    after(function(done) {
        connection.query('ALTER TABLE `sales` AUTO_INCREMENT = 11', function() {
            done();
        });
    });

    it('should return sales list length', function(done) {
        return salesDataServices.show()
            .then(function(sales) {
                assert.equal(10, sales.length);
                done();
            });
    });

    it('should return the new sales list length after adding a sale', function(done) {
        var data = {
            date: '2016-02-01',
            product_id: 10,
            sold: 2,
            price: 12.00
        };
        return salesDataServices.add(data)
            .then(function() {
                salesDataServices.show()
                    .then(function(sales) {
                        assert.equal(11, sales.length);
                        done();
                    });
            });
    });

    it('should return the new sales list length after deleting a sale', function(done) {
        var id = 11;
        return salesDataServices.delete(id)
            .then(function() {
                salesDataServices.show()
                    .then(function(sales) {
                        assert.equal(10, sales.length);
                        done();
                    });
            });
    });
});
