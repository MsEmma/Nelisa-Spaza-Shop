var fs = require('fs');
var handlebars = require('handlebars');

var source = "<h1> WEEK {{week}} STATISTICS </h1>" +
             "<li>The most popular product is: {{#content}}{{MostPopProd}}{{/content}}</li>"+
             "<li>The least popular product is: {{#content}}{{LeastPopProd}}{{/content}}</li>"+
             "<li>The most popular category is: {{#content}}{{MostPopCat}}{{/content}}</li>"+
             "<li>The least popular product is: {{#content}}{{LeastPopCat}}{{/content}}</li>"+
             "<li>The most profitable product is: {{#content}}{{MostProfProd}}{{/content}}</li>"+
             "<li>The most profitable category is: {{#content}}{{MostProfCat}}{{/content}}</li>";

var template = handlebars.compile(source);

var data ={week: "4", content: [{ MostPopProd: 'Coke 500ml', Sold: 42 },
                                { LeastPopProd: 'Iwisa Pap 5kg', Sold: 4 },
                                { MostPopCat: 'Dairy', Sold: 55 },
                                { LeastPopCat: 'Toiletries', Sold: 12 },
                                { MostProfProd: 'Amasi', Profit: 200 },
                                { MostProfCat: 'Dairy', Profit: 252.5 }]};

var result = template(data);

fs.writeFileSync('weekly_display.html', result);
