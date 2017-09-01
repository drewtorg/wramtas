var express = require('express');
var AboutPage = require('../../models/aboutPage');

var router = express.Router();

// GET the about information
router.get('/:page', function(req, res) {
  AboutPage.findOne({
    page: req.params.page
  }, function(err, doc) {
    res.json(doc);
  });
});

// DELETE the about information
router.delete('/:page', function(req, res) {
  AboutPage.findOneAndRemove({
    page: req.params.page
  }, function(err) {
    if (err) res.status(500).end();
    else res.status(204).end();
  });
});

// POST upsert the about information
router.post('/:page', function(req, res) {
  AboutPage.findOneAndUpdate({
    page: req.params.page
  }, req.body, {
      upsert: true,
      new: true
    },
    function(err, doc) {
      return res.json(doc);
    });
});

module.exports = router;
