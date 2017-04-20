var express = require('express');
var MasterClass = require('../../../models/masterClass');
var router = express.Router();

// GET the master class
router.get('/', function(req, res) {
  MasterClass.findOne({}, function(err, doc) {
    res.json(doc);
  });
});

// POST upsert the master class
router.post('/', function(req, res) {
  MasterClass.findOneAndUpdate({}, req.body, {
      upsert: true,
      new: true
    },
    function(err, doc) {
      if (err) {
        console.log(err);
        res.status(500).end();
      }
      return res.json(doc);
    });
});

router.use('/survey', require('./survey'));

module.exports = router;