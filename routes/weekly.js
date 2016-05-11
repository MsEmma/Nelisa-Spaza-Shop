exports.popular = function(req, res, next) {
   var date = req.params.sale_date;
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query(`SELECT products.product, SUM( sales.sold ) AS quantity
        FROM sales
        INNER JOIN products ON sales.product_id = products.id
        INNER JOIN categories ON products.category_id = categories.id
        WHERE sales.date BETWEEN '2016-02-21' AND ?
        GROUP BY products.product
        ORDER BY quantity DESC
        LIMIT 0,1`, date ,function(err, most_popular) {
            connection.query(`SELECT products.product, SUM( sales.sold ) AS quantity
          FROM sales
          INNER JOIN products ON sales.product_id = products.id
          INNER JOIN categories ON products.category_id = categories.id
          WHERE sales.date BETWEEN '2016-02-21' AND ?
          GROUP BY products.product
          ORDER BY quantity ASC
          LIMIT 0,1`, date,function(err, least_popular) {
                connection.query(`SELECT  categories.category, sum(sales.sold) AS quantity
            FROM sales
            INNER JOIN products ON sales.product_id = products.id
            INNER JOIN categories ON products.category_id = categories.id
            WHERE sales.date BETWEEN '2016-02-21' AND ?
            GROUP BY categories.category
            ORDER BY quantity DESC
            LIMIT 0,1`, date, function(err, most_popular_cat) {
                    connection.query(`SELECT  categories.category, sum(sales.sold) AS quantity
                  FROM sales
                  INNER JOIN products ON sales.product_id = products.id
                  INNER JOIN categories ON products.category_id = categories.id
                  WHERE sales.date BETWEEN '2016-02-21' AND ?
                  GROUP BY categories.category
                  ORDER BY quantity ASC
                  LIMIT 0,1`, date, function(err, least_popular_cat) {
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
