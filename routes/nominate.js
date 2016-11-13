var apiKey = process.env.apiKey;
var domain = process.env.domain;
var mailgun = require('mailgun-js')({
  apiKey: apiKey,
  domain: domain
});
var express = require('express');
var router = express.Router();
var Application = require('../models/application');

router.post('/', function(req, res) {
  var application = new Application(req.body);
  application.save(function(err, app) {
    if (err) res.sendStatus(404);

    var data = {
      from: 'WRAMTAS <nominations@' + domain + '>',
      to: req.body.email,
      subject: 'WRAMTAS Executive Board Nomination',
      text: 'Dear ' + req.body.name + ', you have been nominated for the position of ' + req.body.position.title + ' on the WRAMTAS Executive Board.  Click this link to accept your nomination and begin the application process: http://wramtas.org/application?_id=' + app._id + '.  Applications for Executive Board positions are due on March 5th, 2017'
    };

    mailgun.messages().send(data, function(error, body) {
      res.status(200).end();
    });
  });
});

module.exports = router;
