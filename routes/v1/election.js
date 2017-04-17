var express = require('express');
var Election = require('../../models/election');
var Application = require('../../models/application');
var router = express.Router();

// GET the current election
router.get('/', function(req, res) {
  Election.findOne(function(err, election) {
    res.json(election);
  });
});

// POST create a new election
router.post('/', function(req, res) {
  var election = new Election(req.body);
  election.save(function(err) {
    if (!err) res.status(200).end();
  });
});

// PUT updates an existing election
router.put('/', function(req, res) {
  console.log(req.body);
  Election.findOneAndUpdate({}, req.body, {
    new: true
  }, function(err, election) {
    res.json(election);
  });
});

// DELETE the current election and all applications
router.delete('/', function(req, res) {
  Election.remove({}, function() {
    Application.remove({}, function() {
      res.status(200).end();
    });
  });
});

module.exports = router;
