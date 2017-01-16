var express = require('express');
var Application = require('../models/application');
var apiKey = process.env.MAILGUN_API_KEY;
var domain = process.env.MAILGUN_DOMAIN;
var mailgun = require('mailgun-js')({
  apiKey: apiKey,
  domain: domain
});

var router = express.Router();

// GET all applications
router.get('/', function(req, res) {
  Application.find(function(err, applications) {
    res.json(applications);
  });
});

// GET a single application
router.get('/:_id', function(req, res) {
  Application.findById(req.params._id, function(err, application) {
    res.json(application);
  });
});

// PUT update an existing application
router.put('/:_id', function(req, res) {
  // Pull out the ids since that is all that is needed
  req.body.position = req.body.position._id;
  req.body.university = req.body.university._id;
  Application.findByIdAndUpdate(req.params._id, req.body, {
      new: true
    },
    function(err, application) {
      if (!err)
        res.json(application);
      else
        res.sendStatus(404);
    });
});

// POST approves or rejects the application for posting on the candidates page
router.post('/:_id', function(req, res) {
  if (req.body.approved === false) {
    var data = {
      from: 'WRAMTAS <nominations@' + domain + '>',
      to: req.body.email,
      subject: 'WRAMTAS Executive Board Application',
      text: 'Dear ' + req.body.name + ', your application for ' + req.body.positionName + ' on the WRAMTAS Executive Board has been rejected for the following reason: "' + req.body.reason + '".  Click this link to address the issues with your application and re-submit it: http://www.wramtas.org/application?_id=' + req.body._id + '.  We apologize for the inconvenience and hope you will re-submit your application promptly.'
    };

    mailgun.messages().send(data, function(error, body) {});
    // don't save off the reason for rejecting the application
    delete req.body.reason;
    delete req.body.positionName;
  }
  Application.findByIdAndUpdate(req.params._id, req.body, {
      new: true
    },
    function(err, application) {
      res.json(application);
    });
});

module.exports = router;
