const DbQueryService = require('./dbQueryService');

module.exports = function(connection) {
    const dbQueryService = new DbQueryService(connection);
    this.show = function() {
        return dbQueryService.executeQuery(`SELECT products.id, products.product, categories.category
          FROM products
          INNER JOIN categories ON products.category_id = categories.id`);
    };

    this.showOurProducts = function() {
        return dbQueryService.executeQuery(`SELECT products.id, products.product, categories.category
          FROM products
          INNER JOIN categories ON products.category_id = categories.id`);
    };

    this.showAdd = function() {
        return dbQueryService.executeQuery('SELECT * from categories');
    };

    this.add = function(data) {
        return dbQueryService.executeQuery('insert into products set ?', data);
    };
};
