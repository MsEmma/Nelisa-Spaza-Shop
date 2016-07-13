const DbQueryService = require('./dbQueryService');

module.exports = function(connection) {
    const dbQueryService = new DbQueryService(connection);
    this.show = function() {
        return dbQueryService.executeQuery('SELECT * FROM categories');
    };

    this.add = function(data) {
        return dbQueryService.executeQuery('INSERT INTO categories SET ?', data);
    };

    this.get = function(id) {
        return dbQueryService.executeQuery('SELECT * FROM categories WHERE id = ?', id);
    };

    this.update = function(data, id) {
        return dbQueryService.executeQuery('UPDATE categories SET ? WHERE id = ?', [data, id]);
    };

    this.delete = function(id) {
        return dbQueryService.executeQuery('DELETE FROM categories WHERE id = ?', id);
    };

};
