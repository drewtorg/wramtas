var express = require('express');
var Application = require('../models/application');
var apiKey = process.env.apiKey;
var domain = process.env.domain;
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

// POST approves the application for posting on the candidates page
router.post('/:id', function(req, res) {
  req.body.approved = true;
  Application.findByIdAndUpdate(req.params._id, req.body, {
      new: true
    },
    function(err, application) {
      res.json(application);
    });
});

// DELETE rejects an application by setting it back to un-submitted
//        and sending an email notification to the original submitter
router.delete('/:id', function(req, res) {
  req.body.submitted = false;
  var data = {
    from: 'Mailgun Sandbox <postmaster@' + domain + '>',
    to: req.body.email,
    subject: 'WRAMTAS Executive Board Nomination',
    text: 'Dear ' + req.body.name + ', your application for ' + req.body.position.name + ' on the WRAMTAS Executive Board has been rejected for the following reason: "' + req.body.reason + '".  Click this link to address the issues with your application and re-submit it: http://wramtas.org/application?_id=' + req.body._id + '.  We apologize for the inconvenience and hope you will re-submit your application promptly.'
  };

  mailgun.messages().send(data, function(error, body) {
    res.status(200).end();
  });
  // don't save off the reason for rejecting the application
  Reflect.deleteProperty(req.body, 'reason');
  Application.findByIdAndUpdate(req.params._id, req.body, {
      new: true
    },
    function(err, application) {
      res.json(application);
    });
});

module.exports = router;
