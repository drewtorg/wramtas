var express = require('express');
var MasterClass = require('../../models/masterClass');

var router = express.Router();

// GET the master class
router.get('/', function(req, res) {
  MasterClass.findOne({}, function(err, doc) {
    res.json(doc);
  });
});

// POST upsert the master class
router.post('/', function(req, res) {
  console.log(req.body);
  MasterClass.findOneAndUpdate({}, req.body, {
      upsert: true,
      new: true
    },
    function(err, doc) {
      return res.json(doc);
    });
});

module.exports = router;
