var express = require('express');
var MasterClass = require('../../../models/masterClass');

var router = express.Router();

// POST submit a survey response
router.post('/', function(req, res) {
  MasterClass.findOne({}, function(err, masterClass) {
    var survey = req.body;
    for (var i = 0; i < survey.length; i += 1) {
      masterClass.survey[i].responses.push(survey[i]);
    }
    MasterClass.findOneAndUpdate({}, masterClass, function(err, doc) {
      res.json(doc);
    });
  });
});

module.exports = router;
