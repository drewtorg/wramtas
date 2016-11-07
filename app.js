/* eslint no-sync: "off" */
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var fs = require('fs');
require('dotenv').config();

var app = express();

// view engine setup
app.set('json spaces', 2);

app.use(favicon(path.join(__dirname, '/public/favicon.ico')));
app.use(logger('dev'));

// database setup
mongoose.connect('mongodb://localhost/wramtas');

// Passport does not directly manage your session, it only uses the session.
// So you configure session attributes (e.g. life of your session) via express
var sessionOpts = {
  saveUninitialized: true, // saved new sessions
  resave: false, // do not automatically write to the session store
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
  secret: 'keyboard cat',
  cookie: {
    httpOnly: true,
    maxAge: 2419200000
  } // configure when sessions expires
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser('keyboard cat'));
app.use(session(sessionOpts));
app.use(passport.initialize());
app.use(passport.session());

var routePath = './routes/';
fs.readdirSync(routePath).forEach(function(file) {
  var name = file.split('.js')[0];
  app.use('/' + name, require(routePath + name)); // eslint-disable-line global-require
});
app.use(express.static(path.join(__dirname, 'public')));
app.use('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/pages/index.html'));
});

// passport config
var Account = require('./models/account');
passport.use(Account.createStrategy());
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

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

var server = app.listen(3000, function() {
  console.log('Ready on port %d', server.address().port);
});

module.exports = app;
