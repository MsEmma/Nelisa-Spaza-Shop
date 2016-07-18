// 'use strict'

var express = require('express'),
    exphbs = require('express-handlebars'),
    app = express(),
    fs = require('fs'),
    handlebars = require('handlebars'),
    mysql = require('mysql'),
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    flash = require('express-flash'),
    _ = require('underscore'),
    connectionProvider = require('connection-provider'),
    Promise = require('bluebird');

var products = require('./routes/products'),
    categories = require('./routes/categories'),
    sales = require('./routes/sales'),
    purchases = require('./routes/purchases'),
    summary = require('./routes/summary'),
    signup = require('./routes/signup'),
    login = require('./routes/login'),
    users = require('./routes/users'),
    ProductsDataServices = require('./db_services/products-data-services'),
    CategoriesDataServices = require('./db_services/categories-data-services'),
    PurchasesDataServices = require('./db_services/purchases-data-services'),
    SalesDataServices = require('./db_services/sales-data-services'),
    UsersDataServices = require('./db_services/users-data-services');

var dbOptions = {
    host: 'localhost',
    user: 'root',
    password: 'nelisa',
    port: 3306,
    database: 'spaza'
};

// create object instances that have a database connection
var setupCallback = function(connection) {
    return {
        productsDataServices: new ProductsDataServices(connection),
        categoriesDataServices: new CategoriesDataServices(connection),
        purchasesDataServices: new PurchasesDataServices(connection),
        salesDataServices: new SalesDataServices(connection),
        usersDataServices: new UsersDataServices(connection)
    }
};

app.set('port', (process.env.PORT || 3000));

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));

app.use(connectionProvider(dbOptions, setupCallback));

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

    var adminPaths = ['products', 'categories', 'purchases', 'sales', 'users'];

    if (!req.session.admintab.admin) {
        if (_.contains(adminPaths, req.path.split("/")[1])) {
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

app.get('/about', function(req, res) {
    res.render('about', {
        user: req.session.admintab
    });
});

app.get('/products', products.show);
app.get('/ourproducts', products.showOurProducts);
app.get('/products/add', products.showAdd);
app.post('/products/add', products.add);
app.get('/products/edit/:id', products.get);
app.post('/products/update/:id', products.update);
app.get('/products/delete/:id', products.delete);
app.get('/products/search/:search_val', products.search);

app.get('/categories', categories.show);
app.get('/categories/add', categories.showAdd);
app.post('/categories/add', categories.add);
app.get('/categories/edit/:id', categories.get);
app.post('/categories/update/:id', categories.update);
app.get('/categories/delete/:id', categories.delete);

app.get('/purchases', purchases.show);
app.get('/purchases/add', purchases.showAdd);
app.post('/purchases/add', purchases.add);
app.get('/purchases/edit/:id', purchases.get);
app.post('/purchases/update/:id', purchases.update);
app.get('/purchases/delete/:id', purchases.delete);
app.get('/purchases/search/:search_val', purchases.search);

app.get('/sales', sales.show);
app.get('/sales/add', sales.showAdd);
app.post('/sales/add', sales.add);
app.get('/sales/edit/:id', sales.get);
app.post('/sales/update/:id', sales.update);
app.get('/sales/delete/:id', sales.delete);
app.get('/sales/search/:search_val', sales.search);

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
