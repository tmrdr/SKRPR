var express = require('express');
var passport = require('passport');
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../models');
var session = require('express-session');
var bodyParser = require('body-parser');

passport.serializeUser(function(user, callback) {
    callback(null, user.id);
});

passport.deserializeUser(function(id, callback) {
    db.user.findById(id).then(function(user) {
        callback(null, user);
    }).catch(callback);
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(email, password, callback) {
    db.user.find({
        where: {
            email: email
        }
    }).then(function(user) {
        console.log("this is user: ", user);
        if (!user || !user.validPassword(password)) {
            callback(null, false);
        } else {
            callback(null, user);
        }
    }).catch(callback);
}));

module.exports = passport;
