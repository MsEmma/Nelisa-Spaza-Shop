const DbQueryService = require('./dbQueryService');

module.exports = function(connection) {
    const dbQueryService = new DbQueryService(connection);
    this.show = function() {
        return dbQueryService.executeQuery('SELECT products.id, products.product, categories.category FROM products INNER JOIN categories ON products.category_id = categories.id');
    };

    this.add = function(data) {
        return dbQueryService.executeQuery('INSERT into products SET ?', data);
    };

    this.getCategories = function() {
        return dbQueryService.executeQuery('SELECT * FROM categories');
    };

    this.getProducts = function(id) {
        return dbQueryService.executeQuery('SELECT * FROM products WHERE id = ?', id);
    };

    this.update = function(data, id) {
        return dbQueryService.executeQuery('UPDATE products SET ? WHERE id = ?', [data, id]);
    };

    this.delete = function(id) {
        return dbQueryService.executeQuery('DELETE FROM products WHERE id = ?', id);
    };

    this.search = function(search_val) {
        return dbQueryService.executeQuery('SELECT products.id, products.product, categories.category FROM products INNER JOIN categories ON products.category_id = categories.id WHERE products.product LIKE ? OR categories.category LIKE ?', [search_val, search_val]);
    };
};
