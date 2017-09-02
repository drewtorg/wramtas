var express = require('express');
var VideoPage = require('../../../models/videoPage');

var router = express.Router();

var getPageFromRequest = function(req) {
  return req.baseUrl.split('/')[4].replace(/%20/g, ' ');
};

// POST submit a survey response
router.post('/', function(req, res) {
  var page = getPageFromRequest(req);

  VideoPage.findOne({
      page: page
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
      VideoPage.findOneAndUpdate({
        page: page
      }, videoPage, function(err, doc) {
        if (err) res.status(500).end();
        else res.json(doc);
      });
    });
});

module.exports = router;
