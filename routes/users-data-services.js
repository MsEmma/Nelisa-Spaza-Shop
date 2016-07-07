const DbQueryService = require('./dbQueryService');

module.exports = function(connection) {
    const dbQueryService = new DbQueryService(connection);
    this.show = function() {
        return dbQueryService.executeQuery('SELECT * FROM users');
    };

    this.add = function(data) {
        return dbQueryService.executeQuery('INSERT INTO users SET ?', data);
    };

    this.get = function(id) {
        return dbQueryService.executeQuery('SELECT * FROM users WHERE id = ?', id);
    };

    this.update = function(data, id) {
        return dbQueryService.executeQuery('UPDATE users SET ? WHERE id = ?', [data, id]);
    };

    this.delete = function(id) {
        return dbQueryService.executeQuery('DELETE FROM users WHERE id = ?', id);
    };

};
