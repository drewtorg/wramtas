var express = require('express');
var PageList = require('../../models/pageList');

var router = express.Router();

// GET all pages
router.get('/', function(req, res) {
  PageList.findOne({}, function(err, doc) {
      if (err) res.status(500).end();
      else return res.json(doc);
    });
});

// PUT update pages
router.put('/', function(req, res) {
  PageList.findOneAndUpdate({},
    req.body, {
      new: true
    },
    function(err, doc) {
      if (err) res.status(500).end();
      else return res.json(doc);
    });
});

module.exports = router;
