var apiKey = process.env.MAILGUN_API_KEY;
var domain = process.env.MAILGUN_DOMAIN;
var mailgun = require('mailgun-js')({
  apiKey: apiKey,
  domain: domain
});
var express = require('express');
var router = express.Router();
var Application = require('../../models/application');
var Election = require('../../models/election');
var dateFormat = require('dateformat');

router.post('/', function(req, res) {
  var application = new Application(req.body);
  application.save(function(err, app) {
    if (err) res.sendStatus(404);

    Election.findOne(function(err, election) {
      var date = dateFormat(election.nominationEndDate, 'dddd, mmmm dS, yyyy, h:MM:ss TT');
      var data = {
        from: 'WRAMTAS <nominations@' + domain + '>',
        to: req.body.email,
        subject: 'WRAMTAS Executive Board Nomination',
        text: 'Dear ' + req.body.name + ', you have been nominated for the position of ' + req.body.position.title + ' on the WRAMTAS Executive Board.  Click this link to accept your nomination and begin the application process: http://www.wramtas.org/application?_id=' + app._id + '  Applications for Executive Board positions are due by ' + date + '.'
      };

      mailgun.messages().send(data, function(error, body) {
        res.status(200).end();
      });
    });
  });
});

module.exports = router;
