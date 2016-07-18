var SalesDataServices = require('../db_services/sales-data-services'),
    co = require('co');

exports.show = function(req, res, next) {
    co(function*() {
        var services = yield req.getServices(),
            salesDataServices = services.salesDataServices,
            results = yield salesDataServices.show();

        try {
            var displayData = {
                sales: results,
                admin: req.session.admintab,
                user: req.session.admintab
            };

            if (results && results.length <= 0) {
                displayData.err = 'Sales not found.';
            }
            res.render('sales', displayData);

        } catch (err) {
            next(err);
        }
    });
};

exports.showAdd = function(req, res) {
    co(function*() {
        var services = yield req.getServices(),
            salesDataServices = services.salesDataServices,
            results = yield salesDataServices.getProducts();

        try {
            res.render('add_sales', {
                products: results,
                admin: req.session.admintab,
                user: req.session.admintab
            });

        } catch (err) {
            next(err);
        }
    });
};

exports.add = function(req, res, next) {
    co(function*() {
        var services = yield req.getServices(),
            salesDataServices = services.salesDataServices;

        var data = {
            date: req.body.date,
            product_id: Number(req.body.product_id),
            sold: Number(req.body.sold),
            price: Number(req.body.price)
        };
        var results = yield salesDataServices.add(data);

        try {
            res.redirect('/sales');

        } catch (err) {
            next(err);
        }
    });
};

exports.get = function(req, res, next) {
    co(function*() {
        var services = yield req.getServices(),
            salesDataServices = services.salesDataServices;
        var id = req.params.id;

        try {
            var products = salesDataServices.getProducts(),
                sales = salesDataServices.getSales(id);

            var results = yield [products, sales];
            var sale = results[1][0];
            products = results[0].map(function(product) {
                product.selected = product.id === sale.product_id ? "selected" : "";
                return product;
            });
            res.render('edit_sales', {
                products: products,
                data: sale,
                admin: req.session.admintab,
                user: req.session.admintab
            });
        } catch (err) {
            next(err);
        }
    });
};

exports.update = function(req, res, next) {
    co(function*() {
        var services = yield req.getServices(),
            salesDataServices = services.salesDataServices;

        var data = {
            date: req.body.date,
            product_id: Number(req.body.product_id),
            sold: Number(req.body.sold),
            price: Number(req.body.price)
        };
        var id = req.params.id;
        var results = yield salesDataServices.update(data, id);

        try {
            res.redirect('/sales');

        } catch (err) {
            next(err);
        }
    });
};

exports.delete = function(req, res, next) {
    co(function*() {
        var services = yield req.getServices(),
            salesDataServices = services.salesDataServices;

        var id = req.params.id;
        var results = yield salesDataServices.delete(id);

        try {
            res.redirect('/sales');

        } catch (err) {
            next(err);
        }
    });
};

exports.search = function(req, res, next) {
    co(function*() {
        var services = yield req.getServices(),
            salesDataServices = services.salesDataServices;
        var search_val = '%' + req.params.search_val + '%';
        var results = yield salesDataServices.search(search_val);

        try {
            res.render('sales_search', {
                sales: results,
                admin: req.session.admintab,
                user: req.session.admintab,
                layout: false
            });
        } catch (err) {
            next(err);
        }
    });
};
