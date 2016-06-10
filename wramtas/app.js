﻿
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var users = require('./routes/users');
var posts = require('./routes/posts');
var login = require('./routes/login');
var logout = require('./routes/logout');
var register = require('./routes/register');
var ping = require('./routes/ping');

var app = express();

// view engine setup
app.set('json spaces', 2);

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', users);
app.use('/posts', posts);
app.use('/register', register);
app.use('/login', login);
app.use('/logout', logout);
app.use('/ping', ping);
app.use('/*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// passport config
var Account = require('./models/account');
passport.use(Account.createStrategy());
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// database setup
mongoose.connect('mongodb://localhost/wramtas');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var server = app.listen(80, function() {
  console.log('Ready on port %d', server.address().port);
});

module.exports = app;
