var CategoriesDataServices = require('./categories-data-services');

exports.show = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            var categoriesDataServices = services.categoriesDataServices;
            categoriesDataServices.show()
                .then(function(results) {
                    var displayData = {
                        categories: results,
                        admin: req.session.admintab
                    };

                    if (results && results.length <= 0) {
                        displayData.err = 'Category not found.';
                    }
                    res.render('categories', displayData);
                });
        })
        .catch(function(err) {
            next(err);
        });
};

exports.showAdd = function(req, res) {
    res.render('add_category', req.session.admintab);
}

exports.add = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            var categoriesDataServices = services.categoriesDataServices;
            var data = {
                category: req.body.category
            };
            categoriesDataServices.add(data)
                .then(function(results) {
                    res.redirect('/categories');
                });
        })
        .catch(function(err) {
            next(err);
        });
};

exports.get = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            var categoriesDataServices = services.categoriesDataServices;
            var id = req.params.id;
            categoriesDataServices.get(id)
                .then(function(results) {
                    res.render('edit_category', {
                        data: results[0],
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
            var categoriesDataServices = services.categoriesDataServices;
            var data = req.body;
            var id = req.params.id;
            categoriesDataServices.update(data, id)
                .then(function(results) {
                    res.redirect('/categories');
                });
        })
        .catch(function(err) {
            next(err);
        });
};

exports.delete = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            var categoriesDataServices = services.categoriesDataServices;
            var id = req.params.id;
            categoriesDataServices.delete(id)
                .then(function(results) {
                    res.redirect('/categories');
                });
        })
        .catch(function(err) {
            next(err);
        });
};
