const DbQueryService = require('./dbQueryService');

module.exports = function(connection) {
    const dbQueryService = new DbQueryService(connection);
    this.show = function() {
        return dbQueryService.executeQuery("SELECT sales.id, DATE_FORMAT(sales.date,'%a %d %b %Y') as date, products.product, categories.category, sales.sold, sales.price FROM sales	INNER JOIN products ON sales.product_id = products.id INNER JOIN categories ON products.category_id = categories.id ORDER BY sales.date ASC");
    };

    this.getProducts = function() {
        return dbQueryService.executeQuery('SELECT * FROM products');
    };

    this.getSales = function(id) {
        return dbQueryService.executeQuery('SELECT * FROM sales WHERE id = ?', id);
    };

    this.add = function(data) {
        return dbQueryService.executeQuery('INSERT INTO sales SET ?', data);
    };

    this.update = function(data, id) {
        return dbQueryService.executeQuery('UPDATE sales SET ? WHERE id = ?', [data, id]);
    };

    this.delete = function(id) {
        return dbQueryService.executeQuery('DELETE FROM sales WHERE id = ?', id);
    };

    this.search = function(search_val) {
        return dbQueryService.executeQuery("SELECT sales.id, DATE_FORMAT(sales.date,'%a %d %b %Y') as date, products.product, categories.category, sales.sold, sales.price FROM  sales INNER JOIN products ON sales.product_id = products.id INNER JOIN categories ON products.category_id = categories.id WHERE products.product LIKE ? OR categories.category LIKE ?", [search_val, search_val]);
    };
};
