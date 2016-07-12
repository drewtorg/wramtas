var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

router.post('/', function(req, res, next) {
  Account.register(new Account({
    username: req.body.username,
    role: 'user'
  }), req.body.password, function(err, account) {
    if (err) {
      res.json({
        error: err
      });
    }

    passport.authenticate('local')(req, res, function() {
      req.session.save(function(err) {
        if (err) {
          return next(err);
        }
        res.json(req.session);
      });
    });
  });
});

module.exports = router;
