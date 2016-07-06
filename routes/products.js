var ProductsDataServices = require('./products-data-services');

exports.show = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            var productsDataServices = services.productsDataServices;
            productsDataServices.show()
                .then(function(results) {
                    var displayData = {
                        products: results,
                        admin: req.session.admintab
                    };

                    if (results && results.length <= 0) {
                        displayData.err = 'Product not found.';
                    }
                    res.render('products', displayData);
                });
        })
        .catch(function(err) {
            next(err);
        });
};

exports.showOurProducts = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            var productsDataServices = services.productsDataServices;
            productsDataServices.showOurProducts()
                .then(function(results) {
                    var displayData = {
                        products: results,
                        admin: req.session.admintab
                    };

                    if (results && results.length <= 0) {
                        displayData.err = 'Product not found.';
                    }
                    res.render('ourproducts', displayData);
                });
        })
        .catch(function(err) {
            next(err);
        });
};

exports.showAdd = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            var productsDataServices = services.productsDataServices;
            productsDataServices.showAdd()
                .then(function(results) {
                    var displayData = {
                        categories: results,
                        admin: req.session.admintab
                    };

                    if (results && results.length <= 0) {
                        displayData.err = 'Category not found.';
                    }
                    res.render('add', displayData);
                });
        })
        .catch(function(err) {
            next(err);
        });
};

exports.add = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            var productsDataServices = services.productsDataServices;
            var data = {
                product: req.body.product,
                category_id: Number(req.body.category_id)
            };
            productsDataServices.add(data)
                .then(function(results) {
                    res.redirect('/products');
                });
        })
        .catch(function(err) {
            next(err);
        });
};

exports.get = function(req, res, next) {
    var id = req.params.id;
    req.getConnection(function(err, connection) {
        connection.query('SELECT * FROM categories', [id], function(err, categories) {
            if (err) return next(err);
            connection.query('SELECT * FROM products WHERE id = ?', [id], function(err, products) {
                if (err) return next(err);
                var product = products[0];
                categories = categories.map(function(category) {
                    category.selected = category.id === product.category_id ? "selected" : "";
                    return category;
                });
                res.render('edit', {
                    categories: categories,
                    data: product,
                    admin: req.session.admintab
                });
            });
        });
    });
};

exports.update = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            var productsDataServices = services.productsDataServices;
            var data = {
                product: req.body.product,
                category_id: Number(req.body.category_id)
            };
            var id = req.params.id;
            productsDataServices.update(data, id)
                .then(function(results) {
                    res.redirect('/products');
                });
        })
        .catch(function(err) {
            next(err);
        });
};

exports.delete = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            var productsDataServices = services.productsDataServices;
            var id = req.params.id;
            productsDataServices.delete(id)
                .then(function(results) {
                    res.redirect('/products');
                });
        })
        .catch(function(err) {
            next(err);
        });
};

exports.search = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            var productsDataServices = services.productsDataServices;
            var search_val = '%' + req.params.search_val + '%';
            productsDataServices.search(search_val)
                .then(function(results) {
                    res.render('product_search', {
                        products: results,
                        admin: req.session.admintab,
                        layout: false
                    });
                });
        })
        .catch(function(err) {
            next(err);
        });
};
