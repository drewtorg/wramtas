var express = require('express');
var multer = require('multer');
var upload = multer({
  dest: './public/images/'
}).any();

var router = express.Router();

router.post('/', function(req, res, next) {
  upload(req, res, function(err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded");
  });
});

router.get('/', function(req, res, next) {
  res.send("This is the one");
});

module.exports = router;
