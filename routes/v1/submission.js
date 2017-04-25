var express = require('express');
var Submission = require('../../models/submission');
var router = express.Router();

// GET returns all submissions
router.get('/', function(req, res) {
  Submission.find({}, function(err, doc) {
    res.json(doc);
  });
});

// POST add a new submission application
router.post('/:_id/application', function(req, res) {
  Submission.findById(req.params._id, function(err, doc) {
    doc.submissions.push(req.body);
    Submission.findByIdAndUpdate(req.params._id, doc, {
      new: true
    }, function(err, finalDoc) {
      res.json(finalDoc);
    });
  });
});

// POST create a new submission opportunity
router.post('/', function(req, res) {
  var submission = new Submission(req.body);
  submission.save(function(err, doc) {
    res.json(doc);
  });
});

// PUT updates an existing submission opportunity
router.put('/:_id', function(req, res) {
  Submission.findByIdAndUpdate(req.body._id, req.body, {
    new: true
  }, function(err, doc) {
    res.json(doc);
  });
});

// DELETE the submission with the given id
router.delete('/:_id', function(req, res) {
  Submission.findByIdAndRemove(req.params._id, function(err) {
    if (!err) res.status(200).end();
  });
});

module.exports = router;
