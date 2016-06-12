var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

router.post('/', function(req, res, next) {
  Account.register(new Account({
    username: req.body.username
  }), req.body.password, function(err, account) {
    if (err) {
      res.redirect('/');
    }

    passport.authenticate('local')(req, res, function() {
      req.session.save(function(err) {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    });
  });
});

module.exports = router;
