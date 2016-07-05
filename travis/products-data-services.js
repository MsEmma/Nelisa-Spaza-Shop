module.exports = function(connection) {
    this.getProduct = function(productId, cb) {

        connection.query('select product from products where id = ?', productId, function(err, products) {
            if (err) return cb(err, null);
            if (products && products.length > 0) {
                return cb(null, products[0]);
            }
        });
    }
}
