const DbQueryService = require('./dbQueryService');

module.exports = function(connection) {
    const dbQueryService = new DbQueryService(connection);
    this.show = function() {
        return dbQueryService.executeQuery("SELECT purchases.id, DATE_FORMAT(purchases.date,'%a %d %b %Y') AS DATE, purchases.shop, products.product, categories.category, purchases.quantity, purchases.cost FROM purchases INNER JOIN products ON purchases.product_id = products.id INNER JOIN categories ON products.category_id = categories.id ORDER BY DATE ASC");
    };

    this.getProducts = function() {
        return dbQueryService.executeQuery('SELECT * FROM products');
    };

    this.getPurchases = function(id) {
        return dbQueryService.executeQuery('SELECT * FROM purchases WHERE id = ?', id);
    };

    this.add = function(data) {
        return dbQueryService.executeQuery('INSERT into purchases SET ?', data);
    };

    this.update = function(data, id) {
        return dbQueryService.executeQuery('UPDATE purchases SET ? WHERE id = ?', [data, id]);
    };

    this.delete = function(id) {
        return dbQueryService.executeQuery('DELETE FROM purchases WHERE id = ?', id);
    };

    this.search = function(search_val) {
        return dbQueryService.executeQuery("SELECT purchases.id, DATE_FORMAT(purchases.date,'%a %d %b %Y') as date, purchases.shop, products.product, categories.category, purchases.quantity, purchases.cost	FROM purchases INNER JOIN products ON purchases.product_id = products.id INNER JOIN categories ON products.category_id = categories.id WHERE products.product LIKE ? OR categories.category LIKE ?", [search_val, search_val]);
    };
};
