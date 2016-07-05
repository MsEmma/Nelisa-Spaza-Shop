module.exports = function(connection) {
    this.show = function(cb) {

        connection.query('SELECT products.id, products.product, categories.category FROM products INNER JOIN categories ON products.category_id = categories.id', function(err, products) {
            if (err) return cb(err, null);
            if (products && products.length > 0) {
                return cb(null, products);
            }
        });
    }
}
