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



//POST favorited job to profile
app.post("/profile", isLoggedIn, function(req, res){
  //console.log("got form data", req.body);

  db.user.findById(req.user.id).then(function(user) {
    console.log('Found user', user.id);
    db.job.findOrCreate({
      where: {title: req.body.title},
      defaults: {
        company: req.body.company,
        summary: req.body.summary,
        link: req.body.link
      }
    }).spread(function(job, created) {
      user.addJob(job).then(function(user) {
        res.send(job);
        // req.flash('success', 'it worked');
        res.redirect('/profile');
      }).catch(function (err) {
        console.log("ADD JOB REJECTION:", err);
      });
    }).catch(function (err) {
      console.log("CREATE JOB REJECTION:", err);
    });

    // db.job.findOrCreate({
    //   where: {title: req.body.title},
      // defaults: {
      //   company: req.body.company,
      //   summary: req.body.summary,
      //   link: req.body.link
      // }
    // }).spread(function(job, created) {
    //   console.log('JOB THINGS', job.id, created);
    //   user.createJob(job).then(function(job) {
    //     req.flash('success', 'it worked');
    //     res.redirect('/profile');
    //   });
    // }).catch(function(error) {
    //   console.log(error)
    // });
  }).catch(function(error) {
    console.log(error);
  });

  // db.job.findOrCreate({
  //   where: {title: req.body.title},
  //
  //   defaults: {
  //     company: req.body.company,
  //     summary: req.body.summary,
  //     link: req.body.link
  //   }
  // }).spread(function(job, created){
  //   console.log("JOB ID:", job.id)
  //   db.user.findOrCreate({
  //     where: {
  //       email: req.user.email
  //     }
  //   }).spread(function(user, created){
  //     job.addUser(user).then(function(user) {
  //       job.getUsers().then(function(users) {
  //         console.log("users:", users);
  //         req.flash('success', 'it worked');
  //         res.redirect('/profile');
  //       });
  //     });
  //
  //   });
  // });
});

//Display all saved jobs for user
app.get('/profile', isLoggedIn, function(req, res) {
  db.user.findOne({where: {id: req.user.id}}).then(function(user) {
    user.getJobs().then(function(jobs) {
      res.render('profile', { jobs: jobs });
    });
  });
});

//deletes article and redirects to articles
app.delete('/profile/:id',function(req,res){
  console.log(req.params.id);
  db.user.findById(req.user.id).then(function(user){
    user.removeJob(req.params.id).then(function() {
      res.send({message:'success destroying'});
    });
  });
});


app.post('/results', function(req, res){
  console.log(req.body.search);

  ///indeed scraper
  var URL = 'https://www.indeed.com/jobs?q=' + req.body.search.replace(/ /g,"+") + '&l=Seattle,+WA&explvl=entry_level';

  var URL2 = 'https://www.monster.com/jobs/search/?q=' + req.body.search.replace(/ /g,"-") +'&where=seattle;';


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
