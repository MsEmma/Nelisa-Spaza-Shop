exports.show = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT * FROM users', function(err, results) {
            if (err) return next(err);
            res.render('users', {
                users: results,
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
            res.render('edit_user', {
                data: rows[0],
                admin: req.session.admintab
            });
        });
    });
};

exports.update = function(req, res, next) {

    var id = req.params.id;
    var password = req.body.password;
    var data = {
        username: req.body.username,
        admin: req.body.admin,
        locked: req.body.locked
    };

    bcrypt.hash(password, 10, function(err, hash) {
        data.password = hash;

        req.getConnection(function(err, connection) {
            connection.query('UPDATE users SET ? WHERE id = ?', [data, id], function(err, rows) {
                if (err) next(err);
                res.redirect('/users');
            });
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
