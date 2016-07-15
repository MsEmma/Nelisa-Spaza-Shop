var assert = require('assert'),
    mysql = require('mysql'),
    CategoriesDataServices = require('../db_services/categories-data-services');

describe('test the CategoriesDataServices', function() {

    const url = process.env.MYSQL_URL !== undefined ? process.env.MYSQL_URL : 'mysql://root:nelisa@localhost/test';
    var connection = mysql.createConnection(url);
    var categoriesDataServices = new CategoriesDataServices(connection);

    after(function(done) {
        connection.query('ALTER TABLE `categories` AUTO_INCREMENT = 6', function() {
            done();
        });
    });

    it('should return categories list length', function(done) {
        return categoriesDataServices.show()
            .then(function(categories) {
                assert.equal(5, categories.length);
                done();
            });
    });

    it('should return the new categories list length after adding a category', function(done) {
        var data = {
            category: 'Toiletries'
        };
        return categoriesDataServices.add(data)
            .then(function() {
                categoriesDataServices.show()
                    .then(function(categories) {
                        assert.equal(6, categories.length);
                        done();
                    });
            });
    });

    it('should return the new categories list length after deleting a category', function(done) {
        var id = 6;
        return categoriesDataServices.delete(id)
            .then(function() {
                categoriesDataServices.show()
                    .then(function(categories) {
                        assert.equal(5, categories.length);
                        done();
                    });
            });
    });
});
