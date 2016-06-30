// 'use strict'

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

    var nonSecurePaths = ['/login', '/signup'];
    //check if the user don't need to be logged in
    if (_.contains(nonSecurePaths, req.path)) return next();

    //check if the user is logged in
    if (!req.session.user) {
        return res.redirect('/login');
    }

    //logged in - go ahead
    next();
});

app.use(function(req, res, next) {
    //
    if (!req.session.user) return next();

    var adminPaths = ['/products', '/categories', '/sales', '/purchases', '/users'];

    if (!req.session.admintab.admin) {
        if (_.contains(adminPaths, req.path)) {
            return res.redirect('/');
        }
    }
    next();
});

function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', {
        error: err
    });
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
    delete req.session.admintab;
    res.redirect('/login');
});

app.get('/', function(req, res) {
    res.render('home', req.session.admintab);
});

app.get('/aboutus', function(req, res) {
    res.render('aboutus', req.session.admintab);
});

app.get('/products', products.show);
app.get('/ourproducts', products.showOurProducts);
app.get('/products/add', products.showAdd);
app.post('/products/add', products.add);
app.get('/products/edit/:id', products.get);
app.post('/products/update/:id', products.update);
app.get('/products/delete/:id', products.delete);
app.get('/products/search/:search_val', products.search);

app.get('/categories', db_categories.show);
app.get('/categories/add', db_categories.showAdd);
app.post('/categories/add', db_categories.add);
app.get('/categories/edit/:id', db_categories.get);
app.post('/categories/update/:id', db_categories.update);
app.get('/categories/delete/:id', db_categories.delete);

app.get('/purchases', db_purchases.show);
app.get('/purchases/add', db_purchases.showAdd);
app.post('/purchases/add', db_purchases.add);
app.get('/purchases/edit/:id', db_purchases.get);
app.post('/purchases/update/:id', db_purchases.update);
app.get('/purchases/delete/:id', db_purchases.delete);
app.get('/purchases/search/:search_val', db_purchases.search);

app.get('/sales', db_sales.show);
app.get('/sales/add', db_sales.showAdd);
app.post('/sales/add', db_sales.add);
app.get('/sales/edit/:id', db_sales.get);
app.post('/sales/update/:id', db_sales.update);
app.get('/sales/delete/:id', db_sales.delete);
app.get('/sales/search/:search_val', db_sales.search);

app.get('/users', users.show);
app.get('/users/add', users.showAdd);
app.post('/users/add', users.add);
app.get('/users/edit/:id', users.get);
app.post('/users/update/:id', users.update);
app.get('/users/delete/:id', users.delete);

app.get('/getsummary', function(req, res) {
    res.render('getsummary', req.session.admintab);
});
app.post('/summary', summary.showPopular);

app.use(errorHandler);

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
