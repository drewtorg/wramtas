var express = require('express');
var Upload = require('../models/upload');

var router = express.Router();

router.post('/', function(req, res) {
  var upload = new Upload(req.body);
  upload.save(function(err, doc) {
    res.json(doc);
  });
});

router.get('/', function(req, res) {
  Upload.find({}, function(err, doc) {
    res.json(doc);
  });
});

module.exports = router;
