var express = require('express');
var Submission = require('../../models/submission');
var router = express.Router();

// GET returns one submission page
router.get('/', function(req, res) {
  // TODO: switch to 'find' when pages are dynamic
  Submission.findOne({}, function(err, doc) {
    res.json(doc);
  });
});

// POST create a new submission page
// router.post('/', function(req, res) {
//   var submission = new Submission(req.body);
//   submission.save(function(err, doc) {
//     res.json(doc);
//   });
// });

// PUT updates an existing submission page
// router.put('/:_id', function(req, res) {
//   Submission.findByIdAndUpdate(req.body._id, req.body, {
//     new: true
//   }, function(err, doc) {
//     res.json(doc);
//   });
// });

// DELETE the submission page with the given id
// router.delete('/:_id', function(req, res) {
//   Submission.findByIdAndRemove(req.params._id, function(err) {
//     if (!err) res.status(200).end();
//   });
// });

// PUT upserts the student presentation submission page
router.put('/', function(req, res) {
  Submission.findOneAndUpdate(
    {},
    {
      $set: {
        'description': req.body.description
      }
    },
    {
      new: true,
      upsert: true,
    },
    function(err, doc) {
      res.json(doc);
    });
  }
);

// POST a new prompt to the student proposal page
router.post('/prompt', function(req, res) {
  Submission.findOneAndUpdate(
    {},
    {
      $push: {
        'prompts': {}
      }
    },
    {
      new: true
    },
    function(err, doc) {
      res.json(doc.prompts[doc.prompts.length - 1]);
    });
  }
);

// PUT update an existing prompt on the student proposal page
router.put('/prompt/:_id', function(req, res) {
  Submission.findOneAndUpdate(
    {'prompts._id': req.params._id},
    {
      $set: {
        'prompts.$.description': req.body.description,
        'prompts.$.dates.openDate': req.body.dates.openDate,
        'prompts.$.dates.closeDate': req.body.dates.closeDate
      }
    },
    function(err, doc) {
      res.json(doc.prompts.id(req.params._id));
    });
  }
);

// DELETE an existing prompt from the student proposal page
router.delete('/prompt/:_id', function(req, res) {
  Submission.findOne(
    {'prompts._id': req.params._id},
    function(err, doc) {
      doc.prompts.id(req.params._id).remove();
      doc.save();
      res.status(200).end();
    });
  }
);

// POST add a new application
router.post('/prompt/:_id/application', function(req, res) {
  Submission.findOneAndUpdate(
    {'prompts._id': req.params._id},
    {
      $push: {
        'prompts.$.applications': req.body
      }
    },
    {
      new: true
    },
    function(err, doc) {
      var apps = doc.prompts.id(req.params._id).applications;
      res.json(apps[apps.length - 1]);
    });
});

module.exports = router;
