var express = require('express'),
    exphbs = require('express-handlebars'),
    app = express(),
    fs = require('fs'),
    handlebars = require('handlebars'),
    mysql = require('mysql'),
    bodyParser = require('body-parser'),
    myConnection = require('express-myconnection'),
    session = require('express-session'),
    flash = require('express-flash'),
    _ = require('underscore');

var dbOptions = {
    host: 'localhost',
    user: 'root',
    password: 'nelisa',
    port: 3306,
    database: 'spaza'
};

app.set('port', (process.env.PORT || 3000));

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use(express.static('public'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use(flash());

app.use(function(req, res, next) {

    var nonSecurePaths = ['/', '/login', '/signup'];

    if (_.contains(nonSecurePaths, req.path)) return next();

    if (!req.session.user) {
        return res.redirect('/login');
    }

    next();
});

function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', {
        error: err
    });
}

function enableUser(role) {
    return function(req, res, next) {
        if (req.session.user) {
            if (req.session.user.role === role)
                next();
            else if (role === 'both')
                next();
            else
                res.send(403);
        }
    }
}

var products = require('./routes/products'),
    db_categories = require('./routes/db_categories'),
    db_sales = require('./routes/db_sales'),
    db_purchases = require('./routes/db_purchases'),
    summary = require('./routes/summary'),
    signup = require('./routes/signup'),
    login = require('./routes/login'),
    users = require('./routes/users');


app.get('/login', function(req, res) {
    res.render('login');
});

app.post("/login", login);

app.get('/signup', function(req, res) {
    res.render('signup');
});

app.post("/signup", signup);

app.get('/logout', function(req, res) {
    delete req.session.user;
    res.redirect('/login');
});

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/aboutus',enableUser('both'), function(req, res) {
    res.render('aboutus');
});

app.get('/users', enableUser('admin'), users.show);

app.get('/products', enableUser('both'), products.show);
app.get('/products/add', enableUser('admin'), products.showAdd);
app.post('/products/add', enableUser('admin'), products.add);
app.get('/products/edit/:id', enableUser('admin'), products.get);
app.post('/products/update/:id', enableUser('admin'), products.update);
app.get('/products/delete/:id', enableUser('admin'), products.delete);

app.get('/categories', enableUser('admin'), db_categories.show);
app.get('/categories/add', enableUser('admin'), db_categories.showAdd);
app.post('/categories/add', enableUser('admin'), db_categories.add);
app.get('/categories/edit/:id', enableUser('admin'), db_categories.get);
app.post('/categories/update/:id', enableUser('admin'), db_categories.update);
app.get('/categories/delete/:id', enableUser('admin'), db_categories.delete);

app.get('/sales', enableUser('admin'), db_sales.show);
app.get('/sales/add', enableUser('admin'), db_sales.showAdd);
app.post('/sales/add', enableUser('admin'), db_sales.add);
app.get('/sales/edit/:id', enableUser('admin'), db_sales.get);
app.post('/sales/update/:id', enableUser('admin'), db_sales.update);
app.get('/sales/delete/:id', enableUser('admin'), db_sales.delete);

app.get('/purchases', enableUser('admin'), db_purchases.show);
app.get('/purchases/add', enableUser('admin'), db_purchases.showAdd);
app.post('/purchases/add', enableUser('admin'), db_purchases.add);
app.get('/purchases/edit/:id', enableUser('admin'), db_purchases.get);
app.post('/purchases/update/:id', enableUser('admin'), db_purchases.update);
app.get('/purchases/delete/:id', enableUser('admin'), db_purchases.delete);

app.get('/getsummary', enableUser('both'), function(req, res) {
    res.render('getsummary');
});
app.post('/summary', enableUser('both'), summary.showPopular);

app.use(errorHandler);

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
