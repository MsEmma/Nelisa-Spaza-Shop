var ProductsDataServices = require('./db_services/products-data-services'),
    co = require('co');

exports.show = function(req, res, next) {
    co(function*() {
        var services = yield req.getServices(),
            productsDataServices = services.productsDataServices,
            results = yield productsDataServices.show();

        try {
            var displayData = {
                products: results,
                admin: req.session.admintab
            };
            if (results && results.length <= 0) {
                displayData.err = 'Products not found.';
            }
            res.render('products', displayData);
          } catch (err) {
              next(err);
          }
    });
};

exports.showOurProducts = function(req, res, next) {
    co(function*() {
        var services = yield req.getServices(),
            productsDataServices = services.productsDataServices,
            results = yield productsDataServices.show();

        try {
            var displayData = {
                products: results,
                admin: req.session.admintab
            };
            if (results && results.length <= 0) {
                displayData.err = 'Products not found.';
            }
            res.render('ourproducts', displayData);
          } catch (err) {
              next(err);
          }
    });
};

exports.showAdd = function(req, res, next) {
    co(function*() {
        var services = yield req.getServices(),
            productsDataServices = services.productsDataServices,
            results = yield productsDataServices.getCategories();

        try {
            res.render('add', {
                categories: results,
                admin: req.session.admintab
            });
          } catch (err) {
              next(err);
          }
    });
};

exports.add = function(req, res, next) {
    co(function*() {
        var services = yield req.getServices(),
            productsDataServices = services.productsDataServices;
        var data = {
            product: req.body.product,
            category_id: Number(req.body.category_id)
        };
        var results = yield productsDataServices.add(data);

        try {
            res.redirect('/products');
        } catch (err) {
            next(err);
        }
    });
};

exports.get = function(req, res, next) {
    co(function*() {
        var services = yield req.getServices(),
            productsDataServices = services.productsDataServices;
        var id = req.params.id;

        try {
            var categories = productsDataServices.getCategories(),
                products = productsDataServices.getProducts(id);

            var results = yield [categories, products];
            var product = results[1][0];
            categories = results[0].map(function(category) {
                category.selected = category.id === product.category_id ? "selected" : "";
                return category;
            });
            res.render('edit', {
                categories: categories,
                data: product,
                admin: req.session.admintab
            });
        } catch (err) {
            next(err);
        }
    });
};

exports.update = function(req, res, next) {
    co(function*() {
        var services = yield req.getServices(),
            productsDataServices = services.productsDataServices;
        var data = {
            product: req.body.product,
            category_id: Number(req.body.category_id)
        };
        var id = req.params.id;
        var results = yield productsDataServices.update(data, id);

        try {
            res.redirect('/products');
        } catch (err) {
            next(err);
        }
    });
};

exports.delete = function(req, res, next) {
    co(function*() {
        var services = yield req.getServices(),
            productsDataServices = services.productsDataServices;
        var id = req.params.id;
        var results = yield productsDataServices.delete(id);

        try {
            res.redirect('/products');
        } catch (err) {
            next(err);
        }
    });
};

exports.search = function(req, res, next) {
    co(function*() {
        var services = yield req.getServices(),
            productsDataServices = services.productsDataServices;
        var search_val = '%' + req.params.search_val + '%';
        var results = yield productsDataServices.search(search_val);

        try {
            res.render('product_search', {
                products: results,
                admin: req.session.admintab,
                layout: false
            });
        } catch (err) {
            next(err);
        }
    });
};
