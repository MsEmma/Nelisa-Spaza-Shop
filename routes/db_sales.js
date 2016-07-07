var SalesDataServices = require('./sales-data-services');
const Promise = require('bluebird');

exports.show = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            var salesDataServices = services.salesDataServices;
            salesDataServices.show()
                .then(function(results) {
                    var displayData = {
                        sales: results,
                        admin: req.session.admintab
                    };

                    if (results && results.length <= 0) {
                        displayData.err = 'Sales not found.';
                    }
                    res.render('sales', displayData);
                });
        })
        .catch(function(err) {
            next(err);
        });
};

exports.showAdd = function(req, res) {
    req.getServices()
        .then(function(services) {
            var salesDataServices = services.salesDataServices;
            salesDataServices.getProducts()
                .then(function(results) {
                    res.render('add_sales', {
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
            var salesDataServices = services.salesDataServices;
            var data = {
                date: req.body.date,
                product_id: Number(req.body.product_id),
                sold: Number(req.body.sold),
                price: Number(req.body.price)
            };
            salesDataServices.add(data)
                .then(function(results) {
                    res.redirect('/sales');
                });
        })
        .catch(function(err) {
            next(err);
        });
};

exports.get = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            var salesDataServices = services.salesDataServices;
            var id = req.params.id;
            Promise.join(salesDataServices.getProducts(),
                salesDataServices.getSales(id),
                function(products, sales) {
                    var sale = sales[0];
                    products = products.map(function(product) {
                        product.selected = product.id === sale.product_id ? "selected" : "";
                        return product;
                    });
                    res.render('edit_sales', {
                        products: products,
                        data: sale,
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
            var salesDataServices = services.salesDataServices;
            var data = {
                date: req.body.date,
                product_id: Number(req.body.product_id),
                sold: Number(req.body.sold),
                price: Number(req.body.price)
            };
            var id = req.params.id;
            salesDataServices.update(data, id)
                .then(function(results) {
                    res.redirect('/sales');
                });
        })
        .catch(function(err) {
            next(err);
        });
};

exports.delete = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            var salesDataServices = services.salesDataServices;
            var id = req.params.id;
            salesDataServices.delete(id)
                .then(function(results) {
                    res.redirect('/sales');
                });
        })
        .catch(function(err) {
            next(err);
        });
};

exports.search = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            var salesDataServices = services.salesDataServices;
            var search_val = '%' + req.params.search_val + '%';
            salesDataServices.search(search_val)
                .then(function(results) {
                    res.render('sales_search', {
                        sales: results,
                        admin: req.session.admintab,
                        layout: false
                    });
                });
        })
        .catch(function(err) {
            next(err);
        });
};
