var express = require('express');
var Scholarship = require('../../models/scholarship');
var router = express.Router();

// GET returns all scholarships
router.get('/', function(req, res) {
  Scholarship.find({}, function(err, doc) {
    res.json(doc);
  });
});

// POST add a new scholarship application
router.post('/:_id/app', function(req, res) {
  Scholarship.findById(req.params._id, function(err, doc) {
    doc.submissions.push(req.body);
    Scholarship.findByIdAndUpdate(req.params._id, doc, {
      new: true
    }, function(err, finalDoc) {
      res.json(finalDoc);
    });
  });
});

// POST create a new scholarship opportunity
router.post('/', function(req, res) {
  var scholarship = new Scholarship(req.body);
  scholarship.save(function(err, doc) {
    res.json(doc);
  });
});

// PUT updates an existing scholarship opportunity
router.put('/:_id', function(req, res) {
  Scholarship.findByIdAndUpdate(req.body._id, req.body, {
    new: true
  }, function(err, doc) {
    res.json(doc);
  });
});

// DELETE the scholarship with the given id
router.delete('/:_id', function(req, res) {
  Scholarship.findByIdAndRemove(req.params._id, function(err, doc) {
    res.status(200).end();
  });
});

module.exports = router;
