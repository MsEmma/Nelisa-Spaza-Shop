var PurchasesDataServices = require('../db_services/purchases-data-services'),
    co = require('co');

exports.show = function(req, res, next) {
    co(function*() {
        var services = yield req.getServices(),
            purchasesDataServices = services.purchasesDataServices,
            results = yield purchasesDataServices.show();

        try {
            var displayData = {
                purchases: results,
                admin: req.session.admintab
            };

            if (results && results.length <= 0) {
                displayData.err = 'Purchases not found.';
            }
            res.render('purchases', displayData);

        } catch (err) {
            next(err);
        }
    });
};

exports.showAdd = function(req, res, next) {
    co(function*() {
        var services = yield req.getServices(),
            purchasesDataServices = services.purchasesDataServices,
            results = yield purchasesDataServices.getProducts();

        try {
            res.render('add_purchases', {
                products: results,
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
            purchasesDataServices = services.purchasesDataServices;

        var data = {
            date: req.body.date,
            shop: req.body.shop,
            product_id: Number(req.body.product_id),
            quantity: Number(req.body.quantity),
            cost: Number(req.body.cost)
        };
        var results = yield purchasesDataServices.add(data);

        try {
            res.redirect('/purchases');
        } catch (err) {
            next(err);
        }
    });
};

exports.get = function(req, res, next) {
    co(function*() {
        var services = yield req.getServices(),
            purchasesDataServices = services.purchasesDataServices;
        var id = req.params.id;

        try {
            var products = purchasesDataServices.getProducts(),
                purchases = purchasesDataServices.getPurchases(id);

            var results = yield [products, purchases];
            var purchase = results[1][0];
            products = results[0].map(function(product) {
                product.selected = product.id === purchase.product_id ? "selected" : "";
                return product;
            });
            res.render('edit_purchases', {
                products: products,
                data: purchase,
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
            purchasesDataServices = services.purchasesDataServices;

        var data = {
            date: req.body.date,
            shop: req.body.shop,
            product_id: Number(req.body.product_id),
            quantity: Number(req.body.quantity),
            cost: Number(req.body.cost)
        };
        var id = req.params.id;
        var results = yield purchasesDataServices.update(data, id);

        try {
            res.redirect('/purchases');
        } catch (err) {
            next(err);
        }
    });
};

exports.delete = function(req, res, next) {
    co(function*() {
        var services = yield req.getServices(),
            purchasesDataServices = services.purchasesDataServices;
        var id = req.params.id;
        var results = yield purchasesDataServices.delete(id);

        try {
            res.redirect('/purchases');
        } catch (err) {
            next(err);
        }
    });
};

exports.search = function(req, res, next) {
    co(function*() {
        var services = yield req.getServices(),
            purchasesDataServices = services.purchasesDataServices;
        var search_val = '%' + req.params.search_val + '%';
        var results = yield purchasesDataServices.search(search_val);

        try {
            res.render('purchases_search', {
                purchases: results,
                admin: req.session.admintab,
                layout: false
            });
        } catch (err) {
            next(err);
        }
    });
};
