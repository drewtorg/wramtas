var express = require('express');
var multer = require('multer');
var path = require('path');
var crypto = require('crypto');
// TODO: limit on file size and file type
var storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: function(req, file, cb) {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      if (err) return cb(err);
      cb(null, raw.toString('hex') + path.extname(req.body.flowFilename));
    })
  }
});
var upload = multer({
  storage: storage
}).any();

var router = express.Router();

router.post('/', function(req, res, next) {
  upload(req, res, function(err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.json(req.files[0]);
  });
});

module.exports = router;
