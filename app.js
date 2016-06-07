var express = require('express'),
    exphbs = require('express-handlebars'),
    app = express(),
    fs = require('fs'),
    handlebars = require('handlebars'),
    mysql = require('mysql'),
    bodyParser = require('body-parser'),
    myConnection = require('express-myconnection'),
    session = require('express-session'),
    products = require('./routes/products'),
    db_categories = require('./routes/db_categories'),
    db_sales = require('./routes/db_sales'),
    db_purchases = require('./routes/db_purchases'),
    summary = require('./routes/summary');
// process_weekly_sales = require("./process_weekly_sales"),
// process_weekly_purchases = require("./process_weekly_purchases"),
// categories = require('./categories');

var dbOptions = {
    host: 'localhost',
    user: 'root',
    password: 'nelisa',
    port: 3306,
    database: 'spaza'
};

//configure the port number using and environment number
app.set('port', (process.env.PORT || 3000));

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', {
        error: err
    });
}

app.use(function(req, res, next) {
    // the user is not going to the login screen
    if (req.path != '/login') {
        //is the user not logged in?
        if (!req.session.username) {
            // redirects to the login screen
            return res.redirect('/login');
        }
    }
    next();
});

app.get('/login', function(req, res) {
    res.render('login');
});

app.post("/login", function(req, res) {

    req.session.username = req.body.username;

    if (req.session.username === "emma") {
        res.redirect('/')
    } else {
        delete req.session.username;
        res.render('login', {
            msg: "Incorrect Login"
        })
    }
});

app.get('/signup', function(req, res) {
    res.render('signup');
});

// app.post("/signup", function(req, res) {
//
//     req.session.username = req.body.username;
//     res.render('login', {msg: "Done Continue to Login"})
//
// });

app.get('/logout', function(req, res) {
    delete req.session.username;
    res.redirect('/login');
});

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/aboutus', function(req, res) {
    res.render('aboutus');
});

app.get('/products', products.show);
app.get('/products/add', products.showAdd);
app.post('/products/add', products.add);
app.get('/products/edit/:id', products.get);
app.post('/products/update/:id', products.update);
app.get('/products/delete/:id', products.delete);

app.get('/categories', db_categories.show);
app.get('/categories/add', db_categories.showAdd);
app.post('/categories/add', db_categories.add);
app.get('/categories/edit/:id', db_categories.get);
app.post('/categories/update/:id', db_categories.update);
app.get('/categories/delete/:id', db_categories.delete);

app.get('/sales', db_sales.show);
app.get('/sales/add', db_sales.showAdd);
app.post('/sales/add', db_sales.add);
app.get('/sales/edit/:id', db_sales.get);
app.post('/sales/update/:id', db_sales.update);
app.get('/sales/delete/:id', db_sales.delete);

app.get('/purchases', db_purchases.show);
app.get('/purchases/add', db_purchases.showAdd);
app.post('/purchases/add', db_purchases.add);
app.get('/purchases/edit/:id', db_purchases.get);
app.post('/purchases/update/:id', db_purchases.update);
app.get('/purchases/delete/:id', db_purchases.delete);

app.get('/getsummary', function(req, res) {
    res.render('getsummary');
});
app.post('/summary', summary.showPopular);

// app.get('/stats/:week', function(req, res) {
//
//     var week = req.params.week;
//     var filepath = './input/' + week + '.csv';
//
//     var sales = process_weekly_sales.getSalesList(filepath);
//     var weekly_sales = process_weekly_sales.getWeeklySales(sales);
//     var selling_prices = process_weekly_sales.getSellPrices(sales);
//     var most_popular = process_weekly_sales.getPopularProduct(weekly_sales);
//     var least_popular = process_weekly_sales.getLeastPopularProduct(weekly_sales);
//
//     var purchases = process_weekly_purchases.getPurchases('./input/purchases.csv');
//     var weekly_purchases = process_weekly_purchases.getWeeklyPurchases(purchases, week);
//     var cost_prices = process_weekly_purchases.getCostPrices(weekly_purchases);
//     var total_profit = process_weekly_purchases.getTotalProfit(cost_prices, selling_prices, weekly_sales);
//     var most_profitable_product = process_weekly_purchases.getMostProfitableProduct(total_profit);
//
//     var category_map = categories.getCategories('./input/categories.csv');
//     var category_sales = categories.getCatSales(category_map, weekly_sales);
//     var most_popular_cat = categories.getMostPopularCategory(category_sales);
//     var least_popular_cat = categories.getLeastPopularCategory(category_sales);
//     var cat_profit = categories.getCatProfit(category_map, total_profit);
//     var most_profitable_cat = categories.getMostProfitableCategory(cat_profit);
//
//     var result = {
//         Week: week.match(/\d+/),
//         pop: [most_popular, least_popular, most_popular_cat, least_popular_cat],
//         profit: [most_profitable_product, most_profitable_cat]
//     };
//
//     res.render('display', result);
//
// });

app.use(errorHandler);

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
