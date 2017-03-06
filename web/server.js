var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

app.listen(8082);
console.log("App listening on port 8082");

app.get('/o-nas', function(req, res) {
    res.sendfile('./public/about.html');
});

app.get('/koszyk', function(req, res) {
    res.sendfile('./public/cart.html');
});

app.get('/kategoria/:category', function(req, res) {
    res.sendfile('./public/category.html');
});