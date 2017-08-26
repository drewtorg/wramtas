var express = require('express');
var VideoPage = require('../../../models/videoPage');
var router = express.Router();

// GET the video page
router.get('/:page', function(req, res) {
  VideoPage.findOne({
    page: req.params.page
  }, function(err, doc) {
    if (err) res.status(500).end();
    return res.json(doc);
  });
});

// POST upsert the video page
router.post('/:page', function(req, res) {
  VideoPage.findOneAndUpdate({
      page: req.params.page
    },
    req.body, {
      upsert: true,
      new: true
    },
    function(err, doc) {
      if (err) res.status(500).end();
      return res.json(doc);
    });
});

router.use('/:page/survey', require('./survey'));
router.use('/:page/count', require('./count'));

module.exports = router;