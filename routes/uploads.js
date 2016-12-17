var express = require('express');
var Upload = require('../models/upload');

var router = express.Router();

router.post('/', function(req, res) {
  console.log('Saving a new upload')
  var upload = new Upload(req.body);
  console.log(req.body);
  upload.save(function(err, doc) {
    res.json(doc);
  });
});

router.get('/', function(req, res) {
  console.log('Getting all uploads')
  Upload.find({}, function(err, doc) {
    console.log(doc);
    res.json(doc);
  });
});

module.exports = router;
