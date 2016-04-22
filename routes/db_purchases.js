exports.show = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query(`SELECT purchases.date, purchases.week,
					purchases.shop, products.product, categories.category,
					purchases.quantity, purchases.cost, purchases.total_cost
					FROM  purchases
				 	INNER JOIN products
					ON purchases.product_id = products.id
					INNER JOIN categories
					ON products.category_id = categories.id
					ORDER BY week, date ASC`, function(err, results) {
            if (err) return next(err);
            res.render('purchases', {
                purchases: results
            });
        });
    });
};
