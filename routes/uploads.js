var express = require('express');
var multer = require('multer');
// TODO: limit on file size and file type
var upload = multer({
  dest: './public/uploads/'
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
