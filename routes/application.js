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
  // Pull out the ids since that is all that is needed
  req.body.position = req.body.position._id;
  req.body.university = req.body.university._id;
  Application.findByIdAndUpdate(req.params._id, req.body, {
      new: true
    },
    function(err, application) {
      if (!err)
        res.json(application);
      else
        res.sendStatus(404);
    })
});

module.exports = router;
