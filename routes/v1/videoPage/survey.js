var express = require('express');
var VideoPage = require('../../../models/videoPage');

var router = express.Router();

// POST submit a survey response
router.post('/', function(req, res) {
  VideoPage.findOne({
      page: req.params.page
    },
    function(err, videoPage) {
      var responses = req.body;
      for (var i = 0; i < responses.length; i += 1) {
        var inputType = videoPage.survey[i].inputType;
        if (inputType === 'text' || inputType === 'textarea') {
          videoPage.survey[i].responses.push(responses[i]);
        }
        else if (inputType === 'select' || inputType === 'radio') {
          var index = responses[i];
          videoPage.survey[i].tallies[index] += 1;
        }
        else if (inputType === 'checkbox') {
          var results = responses[i];
          for (var j = 0; j < results.length; j += 1) {
            if (results[j] === true) {
              videoPage.survey[i].tallies[j] += 1;
            }
          }
        }
      }
      VideoPage.findOneAndUpdate({}, videoPage, function(err, doc) {
        if (err) res.status(500).end();
        res.json(doc);
      });
    });
});

module.exports = router;
