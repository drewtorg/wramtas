var express = require('express');
var MasterClass = require('../../../models/masterClass');

var router = express.Router();

// POST submit a survey response
router.post('/', function(req, res) {
  MasterClass.findOne({}, function(err, masterClass) {
    var responses = req.body;
    for (var i = 0; i < responses.length; i += 1) {
      var inputType = masterClass.survey[i].inputType;
      if (inputType === 'text' || inputType === 'textarea') {
        masterClass.survey[i].responses.push(responses[i]);
      }
      else if (inputType === 'select' || inputType === 'radio') {
        var index = responses[i];
        masterClass.survey[i].tallies[index] += 1;
      }
      else if (inputType === 'checkbox') {
        var results = responses[i];
        for (var j = 0; j < results.length; j += 1) {
          if (results[j] === true) {
            masterClass.survey[i].tallies[j] += 1;
          }
        }
      }
    }
    MasterClass.findOneAndUpdate({}, masterClass, function(err, doc) {
      if (err) res.status(500).end();
      res.json(doc);
    });
  });
});

module.exports = router;
