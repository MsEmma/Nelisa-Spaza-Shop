exports.showPopular = function(req, res, next) {
   var end_date = req.params.sale_date;
   var start_date = '2016-02-21';
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query(`SELECT products.product, SUM( sales.sold ) AS quantity
        FROM sales
        INNER JOIN products ON sales.product_id = products.id
        INNER JOIN categories ON products.category_id = categories.id
        WHERE sales.date BETWEEN ` + start_date + ` AND ?
        GROUP BY products.product
        ORDER BY quantity DESC
        LIMIT 0,1`, end_date ,function(err, most_popular) {
            connection.query(`SELECT products.product, SUM( sales.sold ) AS quantity
          FROM sales
          INNER JOIN products ON sales.product_id = products.id
          INNER JOIN categories ON products.category_id = categories.id
          WHERE sales.date BETWEEN ` + start_date + ` AND ?
          GROUP BY products.product
          ORDER BY quantity ASC
          LIMIT 0,1`, end_date,function(err, least_popular) {
                connection.query(`SELECT  categories.category, sum(sales.sold) AS quantity
            FROM sales
            INNER JOIN products ON sales.product_id = products.id
            INNER JOIN categories ON products.category_id = categories.id
            WHERE sales.date BETWEEN ` + start_date + ` AND ?
            GROUP BY categories.category
            ORDER BY quantity DESC
            LIMIT 0,1`, end_date, function(err, most_popular_cat) {
                    connection.query(`SELECT  categories.category, sum(sales.sold) AS quantity
                  FROM sales
                  INNER JOIN products ON sales.product_id = products.id
                  INNER JOIN categories ON products.category_id = categories.id
                  WHERE sales.date BETWEEN ` + start_date + ` AND ?
                  GROUP BY categories.category
                  ORDER BY quantity ASC
                  LIMIT 0,1`, end_date, function(err, least_popular_cat) {
                        if (err) return next(err);
                        res.render('weekly', {
                            most_popular,
                            least_popular,
                            most_popular_cat,
                            least_popular_cat
                        });
                    });
                });
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
