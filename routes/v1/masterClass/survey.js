var express = require('express');
var MasterClass = require('../../../models/masterClass');

var router = express.Router();

// POST submit a survey response
router.post('/', function(req, res) {
  MasterClass.findOne({}, function(err, masterClass) {
    var responses = req.body;
    for (var i = 0; i < responses.length; i += 1) {
      masterClass.survey[i].responses.push(responses[i]);
    }
    MasterClass.findOneAndUpdate({}, masterClass, function(err, doc) {
      if (err) res.status(500).end();
      res.json(doc);
    });
  });
});

module.exports = router;
