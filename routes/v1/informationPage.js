var express = require('express');
var InformationPage = require('../../models/informationPage');

var router = express.Router();

// GET the information page
router.get('/:page', function(req, res) {
  InformationPage.findOne({
      page: req.params.page
    },
    function(err, doc) {
      if (err) res.status(500).end();
      else return res.json(doc);
    });
});

// DELETE the information page
router.delete('/:page', function(req, res) {
  InformationPage.findOneAndRemove({
      page: req.params.page
    },
    function(err) {
      if (err) res.status(500).end();
      else return res.status(204).end();
    });
});

// POST upsert the information page
router.post('/:page', function(req, res) {
  InformationPage.findOneAndUpdate({
      page: req.params.page
    },
    req.body, {
      upsert: true,
      new: true
    },
    function(err, doc) {
      if (err) res.status(500).end();
      else return res.json(doc);
    });
});

module.exports = router;
