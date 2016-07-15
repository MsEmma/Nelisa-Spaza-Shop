var assert = require('assert'),
    mysql = require('mysql'),
    PurchasesDataServices = require('../db_services/purchases-data-services');

describe('test the PurchasesDataServices', function() {

    const url = process.env.MYSQL_URL !== undefined ? process.env.MYSQL_URL : 'mysql://root:nelisa@localhost/test';
    var connection = mysql.createConnection(url);
    var purchasesDataServices = new PurchasesDataServices(connection);

    after(function(done) {
        connection.query('ALTER TABLE `purchases` AUTO_INCREMENT = 11', function() {
            done();
        });
    });

    it('should return purchases list length', function(done) {
        return purchasesDataServices.show()
            .then(function(purchases) {
                assert.equal(10, purchases.length);
                done();
            });
    });

    it('should return the new purchases list length after adding a purchase', function(done) {
        var data = {
            date: '2016-07-15',
            shop: 'Makro',
            product_id: 10,
            quantity: 10,
            cost: 8.00
        };
        return purchasesDataServices.add(data)
            .then(function() {
                purchasesDataServices.show()
                    .then(function(purchases) {
                        assert.equal(11, purchases.length);
                        done();
                    });
            });
    });

    it('should return the new purchases list length after deleting a purchase', function(done) {
        var id = 11;
        return purchasesDataServices.delete(id)
            .then(function() {
                purchasesDataServices.show()
                    .then(function(purchases) {
                        assert.equal(10, purchases.length);
                        done();
                    });
            });
    });
});
