var express = require('express');
var AboutPage = require('../../models/aboutPage');

var router = express.Router();

// GET the about information
router.get('/', function(req, res) {
  AboutPage.findOne({}, function(err, doc) {
    res.json(doc);
  });
});

// POST upsert the about information
router.post('/', function(req, res) {
  AboutPage.findOneAndUpdate({}, req.body, {
      upsert: true,
      new: true
    },
    function(err, doc) {
      return res.json(doc);
    });
});

module.exports = router;
