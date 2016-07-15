var assert = require('assert'),
    mysql = require('mysql'),
    UsersDataServices = require('../db_services/users-data-services');

describe('test the UsersDataServices', function() {

    const url = process.env.MYSQL_URL !== undefined ? process.env.MYSQL_URL : 'mysql://root:nelisa@localhost/test';
    var connection = mysql.createConnection(url);
    var usersDataServices = new UsersDataServices(connection);

    after(function(done) {
        connection.query('ALTER TABLE `users` AUTO_INCREMENT = 4', function() {
            done();
        });
    });

    it('should return users list length', function(done) {
        return usersDataServices.show()
            .then(function(users) {
                assert.equal(3, users.length);
                done();
            });
    });

    it('should return the new users list length after adding a user', function(done) {
        var password = 'nicky';
        var data = {
            username: 'nick',
            // admin: false,
            // locked: 0
        };
        return usersDataServices.add(data)
            .then(function() {
                usersDataServices.show()
                    .then(function(users) {
                        assert.equal(4, users.length);
                        done();
                    });
            });
    });

    it('should return the new users list length after deleting a user', function(done) {
        var id = 4;
        return usersDataServices.delete(id)
            .then(function() {
                usersDataServices.show()
                    .then(function(users) {
                        assert.equal(3, users.length);
                        done();
                    });
            });
    });
});
