var bcrypt = require('bcrypt');

module.exports = function(req, res, next) {

    var password = req.body.password;
    var data = {
        username: req.body.username,
        admin: false,
        locked: 0
    };
    var user = req.body.username;

    if (user.length < 4 || password.length < 4) {
        req.flash('warning', 'Username/Password too short, minimum length should be 4 letters long');
        return res.redirect("/signup");
    } else {
      req.getConnection(function(err, connection) {
          if (err)
              return next(err);

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
    }
};
