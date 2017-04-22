var express = require('express');
var ScholarshipPage = require('../../models/scholarshipPage');

var router = express.Router();

// GET the scholarship page information
router.get('/', function(req, res) {
  ScholarshipPage.findOne({}, function(err, doc) {
    res.json(doc);
  });
});

// POST upsert the scholarship page information
router.post('/', function(req, res) {
  ScholarshipPage.findOneAndUpdate({}, req.body, {
      upsert: true,
      new: true
    },
    function(err, doc) {
      return res.json(doc);
    });
});

module.exports = router;
