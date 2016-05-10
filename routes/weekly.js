exports.mostPopularProduct= function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query(`SELECT products.product, SUM( sales.sold )
        FROM sales
        INNER JOIN products ON sales.product_id = products.id
        INNER JOIN categories ON products.category_id = categories.id
        WHERE DATE <  '2016-02-07'
        GROUP BY products.product
        ORDER BY SUM( sales.sold ) DESC
        LIMIT 0,1`, function(err, results) {
            if (err) return next(err);
            res.render('weekly', {
                most_popular: results
            });
        });
    });
};

exports.mostPopularCategory= function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query(`SELECT  categories.category, sum(sales.sold)
        FROM sales
        INNER JOIN products ON sales.product_id = products.id
        INNER JOIN categories ON products.category_id = categories.id
        WHERE DATE <  '2016-02-07'
        GROUP BY categories.category
        ORDER BY sum(sales.sold) DESC
        LIMIT 0,1`, function(err, results) {
            if (err) return next(err);
            res.render('weekly', {
                most_popular_cat: results
            });
        });
    });
};
