var UsersDataServices = require('./db_services/users-data-services'),
    co = require('co');

exports.show = function(req, res, next) {
    co(function*() {
        var services = yield req.getServices(),
            usersDataServices = services.usersDataServices,
            results = yield usersDataServices.show();

        try {
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
        } catch (err) {
            next(err);
        }
    });
};


exports.showAdd = function(req, res) {
    res.render('add_user', req.session.admintab);
}

var bcrypt = require('bcrypt');

exports.add = function(req, res, next) {
    co(function*() {
        var services = yield req.getServices(),
            usersDataServices = services.usersDataServices;
        var password = req.body.password;
        var data = {
            username: req.body.username,
            admin: true,
            locked: 0
        };

        bcrypt.hash(password, 10, function(err, hash) {
            data.password = hash;
        });

        var results = yield usersDataServices.add(data);

        try {
            res.redirect('/users');
        } catch (err) {
            next(err);
        }
    });
};

exports.get = function(req, res, next) {
    co(function*() {
        var services = yield req.getServices(),
            usersDataServices = services.usersDataServices;

        var id = req.params.id;
        var results = yield usersDataServices.get(id);

        try {
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
        } catch (err) {
            next(err);
        }
    });
};

exports.update = function(req, res, next) {
    co(function*() {
        var services = yield req.getServices(),
            usersDataServices = services.usersDataServices;
        var data = {
            admin: req.body.admin,
            locked: req.body.locked
        };
        var id = req.params.id;
        var results = yield usersDataServices.update(data, id);

        try {
            res.redirect('/users');
        } catch (err) {
            next(err);
        }
    });
};

exports.delete = function(req, res, next) {
    co(function*() {
        var services = yield req.getServices(),
            usersDataServices = services.usersDataServices;
        var id = req.params.id;
        var results = yield usersDataServices.delete(id);

        try {
            res.redirect('/users');
        } catch (err) {
            next(err);
        }
    });
};
