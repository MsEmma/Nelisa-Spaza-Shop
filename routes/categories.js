var CategoriesDataServices = require('../db_services/categories-data-services'),
    co = require('co');

exports.show = function(req, res, next) {
    co(function*() {
        var services = yield req.getServices(),
            categoriesDataServices = services.categoriesDataServices,
            results = yield categoriesDataServices.show();

        try {
            var displayData = {
                categories: results,
                admin: req.session.admintab
            };
            if (results && results.length <= 0) {
                displayData.err = 'Categories not found.';
            }
            res.render('categories', displayData);
        } catch (err) {
            next(err);
        }
    });
};

exports.showAdd = function(req, res) {
    res.render('add_category', req.session.admintab);
}

exports.add = function(req, res, next) {
    co(function*() {
        var services = yield req.getServices(),
            categoriesDataServices = services.categoriesDataServices;
        var data = {
            category: req.body.category
        };
        var results = yield categoriesDataServices.add(data);

        try {
            res.redirect('/categories');
        } catch (err) {
            next(err);
        }
    });
};

exports.get = function(req, res, next) {
    co(function*() {
        var services = yield req.getServices(),
            categoriesDataServices = services.categoriesDataServices;
        var id = req.params.id;
        var results = yield categoriesDataServices.get(id);

        try {
            res.render('edit_category', {
                data: results[0],
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
            categoriesDataServices = services.categoriesDataServices;
        var data = req.body,
            id = req.params.id;
        var results = yield categoriesDataServices.update(data, id);

        try {
            res.redirect('/categories');
        } catch (err) {
            next(err);
        }
    });
};

exports.delete = function(req, res, next) {
    co(function*() {
        var services = yield req.getServices(),
            categoriesDataServices = services.categoriesDataServices;
        var id = req.params.id;
        var results = yield categoriesDataServices.delete(id);

        try {
            res.redirect('/categories');
        } catch (err) {
            next(err);
        }
    });
};
