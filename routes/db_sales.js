exports.show = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query(`SELECT sales.day, sales.date, sales.week, products.product,
					categories.category, sales.sold, sales.sales_price
					FROM  sales
				 	INNER JOIN products ON sales.product_id = products.id
					INNER JOIN categories ON products.category_id = categories.id
					ORDER BY week, date ASC`, function(err, results) {
            if (err) return next(err);
            res.render('sales', {
                sales: results
            });
        });
    });
};
