var express = require('express');
var Application = require('../../models/application');
var router = express.Router();

// PUT updates the vote count with a single ballot
router.put('/', function(req, res) {
  var ballot = req.body;
  for (var index in ballot) {
    if (Object.prototype.hasOwnProperty.call(ballot, index)) {
      var vote = ballot[index];
      // Update the candidate with another vote
      Application.findById(vote._id, function(err, found) {
        found.votes += 1;
        Application.findByIdAndUpdate(found._id, found, {
          new: true
        });
      });
    }
  }
  res.status(200).end();
});

module.exports = router;
