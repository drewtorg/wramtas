var express = require('express');
var Application = require('../models/application');

var router = express.Router();

// GET a single application
router.get('/:_id', function(req, res) {
  Application.findById(req.params._id, function(err, application) {
    res.json(application);
  })
});

// PUT update an existing application
router.put('/:_id', function(req, res) {
  Application.findByIdAndUpdate(req.params._id, {
    new: true
  }, function(err, application) {
    if (!err)
      res.json(application);
    else
      res.sendStatus(404);
  })
});

module.exports = router;
