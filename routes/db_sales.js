exports.show = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query(`SELECT sales.id, DATE_FORMAT(sales.date,'%a %d %b %Y') as date , products.product,
					categories.category, sales.sold, sales.price
					FROM  sales
				 	INNER JOIN products
          ON sales.product_id = products.id
					INNER JOIN categories
          ON products.category_id = categories.id
					ORDER BY sales.date ASC`, function(err, results) {
            if (err) return next(err);
            res.render('sales', {
                sales: results
            });
        });
    });
};

exports.showAdd = function(req, res) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT * from products', function(err, products) {
            if (err) return next(err);
            res.render('add_sales', {
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
            product_id: Number(req.body.product_id),
            sold: Number(req.body.sold),
            price: Number(req.body.price)
        };

        connection.query('insert into sales set ?', data, function(err, results) {
            if (err) return next(err);
            res.redirect('/sales');
        });
    });
};

exports.get = function(req, res, next) {
    var id = req.params.id;
    req.getConnection(function(err, connection) {
        connection.query('SELECT * FROM products', [id], function(err, products) {
            if (err) return next(err);
            connection.query('SELECT * FROM sales WHERE id = ?', [id], function(err, sales) {
                if (err) return next(err);
                var sale = sales[0];
                products = products.map(function(product) {
                    product.selected = product.id === sale.product_id ? "selected" : "";
                    return product;
                });
                res.render('edit_sales', {
                    products: products,
                    data: sale
                });
            });
        });
    });
};

exports.update = function(req, res, next) {

    var data = {
        date: req.body.date,
        product_id: Number(req.body.product_id),
        sold: Number(req.body.sold),
        price: Number(req.body.price)
    };
    var id = req.params.id;
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('UPDATE sales SET ? WHERE id = ?', [data, id], function(err, rows) {
            if (err) return next(err);
            res.redirect('/sales');
        });
    });
};

exports.delete = function(req, res, next) {
    var id = req.params.id;
    req.getConnection(function(err, connection) {
        connection.query('DELETE FROM sales WHERE id = ?', [id], function(err, rows) {
            if (err) return next(err);
            res.redirect('/sales');
        });
    });
};
