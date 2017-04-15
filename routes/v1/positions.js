var express = require('express');
var Position = require('../../models/position');

var router = express.Router();

/* GET all positions. */
router.get('/', function(req, res) {
  Position.find().find(function(err, positions) {
    if (err) res.status(200).end();
    else
      res.json(positions);
  });
});

module.exports = router;
