exports.showPopular = function(req, res, next) {

    var start_date = (req.body.from).toString();
    var end_date = (req.body.to).toString();

    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query(`SELECT products.product, SUM( sales.sold ) AS quantity
        FROM sales
        INNER JOIN products ON sales.product_id = products.id
        WHERE sales.date
        BETWEEN  ?
        AND ?
        GROUP BY products.product
        ORDER BY quantity DESC
        LIMIT 0,1`, [start_date, end_date], function(err, most_popular) {
            connection.query(`SELECT products.product, SUM( sales.sold ) AS quantity
          FROM sales
          INNER JOIN products ON sales.product_id = products.id
          WHERE sales.date
          BETWEEN  ?
          AND ?
          GROUP BY products.product
          ORDER BY quantity ASC
          LIMIT 0,1`, [start_date, end_date], function(err, least_popular) {
                connection.query(`SELECT  categories.category, sum(sales.sold) AS quantity
            FROM sales
            INNER JOIN products ON sales.product_id = products.id
            INNER JOIN categories ON products.category_id = categories.id
            WHERE sales.date
            BETWEEN  ?
            AND ?
            GROUP BY categories.category
            ORDER BY quantity DESC
            LIMIT 0,1`, [start_date, end_date], function(err, most_popular_cat) {
                    connection.query(`SELECT  categories.category, sum(sales.sold) AS quantity
                  FROM sales
                  INNER JOIN products ON sales.product_id = products.id
                  INNER JOIN categories ON products.category_id = categories.id
                  WHERE sales.date
                  BETWEEN  ?
                  AND ?
                  GROUP BY categories.category
                  ORDER BY quantity ASC
                  LIMIT 0,1`, [start_date, end_date], function(err, least_popular_cat) {
                        if (err) return next(err);
                        res.render('summary', {
                            start_date,
                            end_date,
                            most_popular,
                            least_popular,
                            most_popular_cat,
                            least_popular_cat,
                            admin: req.session.admintab
                        });
                    });
                });
            });
        });
    });
};
