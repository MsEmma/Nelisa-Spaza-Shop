exports.show = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT * FROM users', function(err, results) {
            if (err) return next(err);

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
    });
};

exports.showAdd = function(req, res) {
    res.render('add_user', req.session.admintab);
}

var bcrypt = require('bcrypt');

exports.add = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        var password = req.body.password;
        var data = {
            username: req.body.username,
            admin: true,
            locked: 0
        };

        bcrypt.hash(password, 10, function(err, hash) {
            data.password = hash;

            connection.query('insert into users set ?', data, function(err, data) {
                if (err) return next(err);
                res.redirect('/users');
            });
        })
    });
};

exports.get = function(req, res, next) {
    var id = req.params.id;
    req.getConnection(function(err, connection) {
        connection.query('SELECT * FROM users WHERE id = ?', [id], function(err, rows) {
            if (err) return next(err);

            var user = rows [0];

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
    });
};

exports.update = function(req, res, next) {

    var id = req.params.id;

    var data = {
        admin: req.body.admin,
        locked: req.body.locked
    };

    req.getConnection(function(err, connection) {
        connection.query('UPDATE users SET ? WHERE id = ?', [data, id], function(err, rows) {
            if (err) next(err);
            res.redirect('/users');
        });
    });
};

exports.delete = function(req, res, next) {
    var id = req.params.id;
    req.getConnection(function(err, connection) {
        connection.query('DELETE FROM users WHERE id = ?', [id], function(err, rows) {
            if (err) return next(err);
            res.redirect('/users');
        });
    });
};
