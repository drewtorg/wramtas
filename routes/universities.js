var express = require('express');
var University = require('../models/university');

var router = express.Router();

/* GET all universities. */
router.get('/', function(req, res) {
  University.find().find(function(err, universities) {
    if (err) res.status(200).end();
    else
      res.json(universities);
  });
});

module.exports = router;
