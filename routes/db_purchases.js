var PurchasesDataServices = require('./purchases-data-services');
const Promise = require('bluebird');

exports.show = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            var purchasesDataServices = services.purchasesDataServices;
            purchasesDataServices.show()
                .then(function(results) {
                    var displayData = {
                        purchases: results,
                        admin: req.session.admintab
                    };

                    if (results && results.length <= 0) {
                        displayData.err = 'Purchases not found.';
                    }
                    res.render('purchases', displayData);
                });
        })
        .catch(function(err) {
            next(err);
        });
};

exports.showAdd = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            var purchasesDataServices = services.purchasesDataServices;
            purchasesDataServices.getProducts()
                .then(function(results) {
                    res.render('add_purchases', {
                        products: results,
                        admin: req.session.admintab
                    });
                });
        })
        .catch(function(err) {
            next(err);
        });
};

exports.add = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            var purchasesDataServices = services.purchasesDataServices;
            var data = {
                date: req.body.date,
                shop: req.body.shop,
                product_id: Number(req.body.product_id),
                quantity: Number(req.body.quantity),
                cost: Number(req.body.cost)
            };
            purchasesDataServices.add(data)
                .then(function(results) {
                    res.redirect('/purchases');
                });
        })
        .catch(function(err) {
            next(err);
        });
};

exports.get = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            var purchasesDataServices = services.purchasesDataServices;
            var id = req.params.id;
            Promise.join(purchasesDataServices.getProducts(),
                purchasesDataServices.getPurchases(id),
                function(products, purchases) {
                    var purchase = purchases[0];
                    products = products.map(function(product) {
                        product.selected = product.id === purchase.product_id ? "selected" : "";
                        return product;
                    });
                    res.render('edit_purchases', {
                        products: products,
                        data: purchase,
                        admin: req.session.admintab
                    });
                });
        })
        .catch(function(err) {
            next(err);
        });
};

exports.update = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            var purchasesDataServices = services.purchasesDataServices;
            var data = {
                date: req.body.date,
                shop: req.body.shop,
                product_id: Number(req.body.product_id),
                quantity: Number(req.body.quantity),
                cost: Number(req.body.cost)
            };
            var id = req.params.id;
            purchasesDataServices.update(data, id)
                .then(function(results) {
                    res.redirect('/purchases');
                });
        })
        .catch(function(err) {
            next(err);
        });
};

exports.delete = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            var purchasesDataServices = services.purchasesDataServices;
            var id = req.params.id;
            purchasesDataServices.delete(id)
                .then(function(results) {
                    res.redirect('/purchases');
                });
        })
        .catch(function(err) {
            next(err);
        });
};

exports.search = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            var purchasesDataServices = services.purchasesDataServices;
            var search_val = '%' + req.params.search_val + '%';
            purchasesDataServices.search(search_val)
                .then(function(results) {
                    res.render('purchases_search', {
                        purchases: results,
                        admin: req.session.admintab,
                        layout: false
                    });
                });
        })
        .catch(function(err) {
            next(err);
        });
};
