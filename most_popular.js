exports.showWeeklySales = function(req, res, next) {
    var id = req.params.id;
    req.getConnection(function(err, connection) {
        connection.query('SELECT products.product FROM products', function(err, products) {
            if (err) return next(err);
            products.forEach(function(obj) {
                connection.query(`SELECT products.product, SUM(sales.sold)
               FROM  sales
               INNER JOIN products
               ON sales.product_id = products.id
               WHERE date < '2016-02-07'
               AND product = ?`, [obj.product], function(err, results) {
                    if (err) throw err;
                    return results;
                });
                res.render('edit_sales', {
                    products: products,
                    data: sale
                });
            });
        });
    });
};
