var UsersDataServices = require('./users-data-services')

exports.show = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            var usersDataServices = services.usersDataServices;
            usersDataServices.show()
                .then(function(results) {

                    var formattedResults = [];
                    results.forEach(function(obj) {
                        if (obj.admin === 0) {
                            obj.admin = "No";
                        } else {
                            obj.admin = "Yes";
                        }
                        if (obj.locked === 0) {
                            obj.locked = "No";
                        } else {
                            obj.locked = "Yes";
                        }
                        formattedResults.push(obj);
                    });

                    res.render('users', {
                        users: formattedResults,
                        admin: req.session.admintab
                    });
                });
        })
        .catch(function(err) {
            next(err);
        });
};


exports.showAdd = function(req, res) {
    res.render('add_user', req.session.admintab);
}

var bcrypt = require('bcrypt');

exports.add = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            var usersDataServices = services.usersDataServices;
            var password = req.body.password;
            var data = {
                username: req.body.username,
                admin: true,
                locked: 0
            };

            bcrypt.hash(password, 10, function(err, hash) {
                data.password = hash;

                usersDataServices.add(data)
                    .then(function(results) {
                        res.redirect('/users');
                    });
            });
        })
        .catch(function(err) {
            next(err);
        });
};

exports.get = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            var usersDataServices = services.usersDataServices;
            var id = req.params.id;
            usersDataServices.get(id)
                .then(function(results) {
                    var user = results[0];

                    if (user.admin === 0) {
                        user.admin = "No";
                    } else {
                        user.admin = "Yes";
                    }
                    if (user.locked === 0) {
                        user.locked = "No";
                    } else {
                        user.locked = "Yes";
                    }

                    res.render('edit_user', {
                        data: user,
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
            var usersDataServices = services.usersDataServices;
            var data = {
                admin: req.body.admin,
                locked: req.body.locked
            };
            var id = req.params.id;
            usersDataServices.update(data, id)
                .then(function(results) {
                    res.redirect('/users');
                });
        })
        .catch(function(err) {
            next(err);
        });
};

exports.delete = function(req, res, next) {
    req.getServices()
        .then(function(services) {
            var usersDataServices = services.usersDataServices;
            var id = req.params.id;
            usersDataServices.delete(id)
                .then(function(results) {
                    res.redirect('/users');
                });
        })
        .catch(function(err) {
            next(err);
        });
};
