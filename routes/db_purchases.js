exports.show = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query(`SELECT purchases.id, purchases.date,
					purchases.shop, products.product, categories.category,
					purchases.quantity, purchases.cost
					FROM  purchases
				 	INNER JOIN products
					ON purchases.product_id = products.id
					INNER JOIN categories
					ON products.category_id = categories.id
					ORDER BY date ASC`, function(err, results) {
            if (err) return next(err);
            res.render('purchases', {
                purchases: results
            });
        });
    });
};

exports.showAdd = function(req, res) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT * from products', function(err, products) {
            if (err) return next(err);
            res.render('add_purchases', {
                products: products,
            });
        });
    });
};

exports.add = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        var data = {
            date: req.body.date,
            shop: req.body.shop,
            product_id: Number(req.body.product_id),
            quantity: Number(req.body.quantity),
            cost: Number(req.body.cost)
        };

        connection.query('insert into purchases set ?', data, function(err, results) {
            if (err) return next(err);
            res.redirect('/purchases');
        });
    });
};

exports.get = function(req, res, next) {
    var id = req.params.id;
    req.getConnection(function(err, connection) {
        connection.query('SELECT * FROM products', [id], function(err, products) {
            if (err) return next(err);
            connection.query('SELECT * FROM purchases WHERE id = ?', [id], function(err, purchases) {
                if (err) return next(err);
                var purchase = purchases[0];
                products = products.map(function(product) {
                    product.selected = product.id === purchase.product_id ? "selected" : "";
                    return product;
                });
                res.render('edit_purchases', {
                    products: products,
                    data: purchase
                });
            });
        });
    });
};

exports.update = function(req, res, next) {

    var data = {
        date: req.body.date,
        shop: req.body.shop,
        product_id: Number(req.body.product_id),
        quantity: Number(req.body.quantity),
        cost: Number(req.body.cost)
    };
    var id = req.params.id;
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('UPDATE purchases SET ? WHERE id = ?', [data, id], function(err, rows) {
            if (err) return next(err);
            res.redirect('/purchases');
        });
    });
};

exports.delete = function(req, res, next) {
    var id = req.params.id;
    req.getConnection(function(err, connection) {
        connection.query('DELETE FROM purchases WHERE id = ?', [id], function(err, rows) {
            if (err) return next(err);
            res.redirect('/purchases');
        });
    });
};
