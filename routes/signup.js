var bcrypt = require('bcrypt');

module.exports = function(req, res, next) {

    req.getConnection(function(err, connection) {
        if (err)
            return next(err);

        var password = req.body.password;
        var data = {
            username: req.body.username,
            role: 'user',
            locked: 0
        };

        bcrypt.hash(password, 10, function(err, hash) {
            data.password = hash;

            connection.query('insert into users set ?', data, function(err, data) {
                if (err) {
                    req.flash('warning', "Username already exists");
                    res.redirect('/signup');
                } else {
                    req.flash('success', "Thank you for registering, Now login");
                    res.redirect('/login');
                }
            });
        });
    });
};
