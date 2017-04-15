var express = require('express');
var mongoose = require('mongoose');
var bioSchema = require('../../schemas/bio');

var router = express.Router();

var getIdFromRequest = function(req) {
  return req.url.split('?')[0].replace('/', '');
}

// GET all bios
router.get('/', function(req, res) {
  var Bio = mongoose.model(req.query.type + '_bios', bioSchema);
  Bio.find().sort('-createdAt').find(function(err, bios) {
    if (err) res.status(200).end();
    else
      res.json(bios);
  });
});

// GET a single bio
router.get('/*', function(req, res) {
  var id = getIdFromRequest(req);
  var Bio = mongoose.model(req.query.type + '_bios', bioSchema);
  Bio.findById(id, function(err, bios) {
    res.json(bios);
  });
});

// POST create new bio
router.post('/', function(req, res) {
  var Bio = mongoose.model(req.query.type + '_bios', bioSchema);
  var newBio = new Bio({
    name: '',
    title: '',
    about: '',
    email: ''
  });
  newBio.save(function(err, bio) {
    if (err) return err;
    res.json(bio);
  });
});

// PUT update existing bio
router.put('/*', function(req, res) {
  var Bio = mongoose.model(req.query.type + '_bios', bioSchema);
  Bio.findByIdAndUpdate(req.body._id, req.body, {
    new: true
  }, function(err, bio) {
    if (err) return err;
    res.json(bio);
  });
});

// DELETE existing bio
router.delete('/*', function(req, res) {
  var id = getIdFromRequest(req);
  var Bio = mongoose.model(req.query.type + '_bios', bioSchema);
  Bio.findByIdAndRemove(id, function(err) {
    if (err) return err;
    res.status(200).end();
  });
});

module.exports = router;