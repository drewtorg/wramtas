var express = require('express');
var Submission = require('../../models/submission');
var router = express.Router();

// GET returns one submission page
router.get('/:page', function(req, res) {
  Submission.findOne({
    page: req.params.page
  },
  function(err, doc) {
    res.json(doc);
  });
});

// POST create a new submission page
router.post('/', function(req, res) {
  var submission = new Submission(req.body);
  submission.save(function(err, doc) {
    res.json(doc);
  });
});

// PUT updates an existing submission page
router.put('/:_id', function(req, res) {
  Submission.findByIdAndUpdate(req.body._id, req.body, {
    new: true
  }, function(err, doc) {
    res.json(doc);
  });
});

// DELETE the submission page with the given id
router.delete('/:_id', function(req, res) {
  Submission.findByIdAndRemove(req.params._id, function(err) {
    if (!err) res.status(200).end();
  });
});

// PUT upserts the submission page
router.put('/:page', function(req, res) {
  Submission.findOneAndUpdate(
    {
      page: req.params.page
    },
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
router.post('/:page/prompt', function(req, res) {
  Submission.findOneAndUpdate(
    {
      page: req.params.page
    },
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
router.put('/:page/prompt/:_id', function(req, res) {
  Submission.findOneAndUpdate(
    {
      page: req.params.page,
      'prompts._id': req.params._id
    },
    {
      $set: {
        'prompts.$': req.body
      }
    },
    function(err, doc) {
      if (err) res.status(500).end();
      else res.json(doc.prompts.id(req.params._id));
    });
  }
);

// DELETE an existing prompt from the student proposal page
router.delete('/:page/prompt/:_id', function(req, res) {
  Submission.findOne(
    {
      page: req.params.page,
      'prompts._id': req.params._id
    },
    function(err, doc) {
      doc.prompts.id(req.params._id).remove();
      doc.save();
      res.status(200).end();
    });
  }
);

// POST add a new application
router.post('/:page/prompt/:_id/application', function(req, res) {
  Submission.findOneAndUpdate(
    {
      page: req.params.page,
      'prompts._id': req.params._id
    },
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
