var express = require('express');
var router = express.Router();
var ElectionInfo = require('../../models/electionInfo');

// GET the single ElectionInfo
router.get('/', function(req, res) {
  ElectionInfo.findOne({}, function(err, doc) {
    res.json(doc);
  });
});

// POST upsert ElectionInfo
router.post('/', function(req, res) {
  ElectionInfo.findOneAndUpdate({}, req.body, {
      upsert: true,
      new: true
    },
    function(err, doc) {
      return res.json(doc);
    });
});

module.exports = router;
