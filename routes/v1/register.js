var express = require('express');
var passport = require('passport');
var Account = require('../../models/account');
var router = express.Router();

router.post('/', function(req, res, next) {
  // Leave out until register new users is desired
  // Account.register(new Account({
  //   username: req.body.username
  // }), req.body.password, function(err, account) {
  //   if (err) {
  //     res.json({
  //       error: err
  //     });
  //   }

  //   passport.authenticate('local')(req, res, function() {
  //     req.session.save(function(err) {
  //       if (err) {
  //         return next(err);
  //       }
  //       res.json(req.user);
  //     });
  //   });
  // });
  res.status(200).end();
});

module.exports = router;
