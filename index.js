require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
var session = require('express-session');
var passport = require('./config/ppConfig');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');
var app = express();
var db = require("./models");
var path = require('path');

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(path.join(__dirname, 'static')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecretpassword',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function(req, res, next) {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile');
});

//POST favorited job to profile
app.post("/favorites", function(req, res){
  console.log("got form data", req.body);
  db.job.create(req.body).then(function(job){
    res.send("Job saved");
  });
});


app.post('/results', function(req, res){
  console.log(req.body.search);

  ///indeed scraper
  var URL = 'https://www.indeed.com/jobs?q=' + req.body.search.replace(/ /g,"+") + '&l=Seattle,+WA&explvl=entry_level';

  request(URL, function(err, response, body) {
    var $ = cheerio.load(body);
    var jobs = $("#resultsCol .result");
    var results = [];

    jobs.each(function(index, job) {
      job = $(job);

      var title = job.find(".turnstileLink");
      var company = job.find(".company");
      var summary = job.find(".summary");
      var link = job.find("a.turnstileLink");

      results.push({title:title.text().trim(), company:company.text().trim(), summary:summary.text().trim(), link:link.attr('href').trim()});
    });
    res.render('results', {results:results});
  });
});

app.use('/auth', require('./controllers/auth'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
