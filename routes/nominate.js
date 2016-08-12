var apiKey = process.env.apiKey;
var domain = process.env.domain;
var mailgun = require('mailgun-js')({
  apiKey: apiKey,
  domain: domain
});
var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
  var data = {
    from: 'Mailgun Sandbox <postmaster@' + domain + '>',
    to: req.body.email,
    subject: 'WRAMTAS Executive Board Nomination',
    text: 'Dear ' + req.body.name + ', you have been nominated for the position of ' + req.body.position.name + ' on the WRAMTAS Executive Board.  Click this link to accept your nomination and begin the application process: http://www.wramsat.org'
  };

  mailgun.messages().send(data, function(error, body) {
    res.sendStatus(200);
  });
});

module.exports = router;
