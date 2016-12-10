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
var app = express();

// Load env from .env file in development
if (app.get('env') === 'development')
  require('dotenv').config();


// view engine setup
app.set('json spaces', 2);

app.use(favicon(path.join(__dirname, '/public/favicon.ico')));
app.use(logger('dev'));

// database setup
var MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI);

// Passport does not directly manage your session, it only uses the session.
// So you configure session attributes (e.g. life of your session) via express
var PASSPORT_SECRET = process.env.PASSPORT_SECRET

var sessionOpts = {
  saveUninitialized: true, // saved new sessions
  resave: false, // do not automatically write to the session store
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
  secret: PASSPORT_SECRET,
  cookie: {
    httpOnly: true,
    maxAge: 2419200000
  } // configure when sessions expires
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser(PASSPORT_SECRET));
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

// Setup admin account if not already set up
Account.findOne({}, function(err, doc) {
  if (!doc) {
    console.log('Attempting to set up admin account');
    Account.register(new Account({
      username: process.env.ADMIN_USERNAME,
      role: 'admin'
    }), process.env.ADMIN_PASSWORD, function(err, account) {
      if (err) {
        console.log('Could not create admin account!');
      } else {
        console.log('Created admin account');
      }
    });
  }
});

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

var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
  console.log('Ready on port %d', server.address().port);
});

module.exports = app;
