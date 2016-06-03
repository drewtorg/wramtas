var express = require('express');
var mongoose = require('mongoose');

//
var Post = require('../models/post');

var router = express.Router();

// GET all posts
// sort must happen on the server side in order to not mess with the $index and filtering nonsense
// alternative would be to do a total refresh on delete
router.get('/', function(req, res) {
  Post.find().sort('-dateModified').find(function(err, posts) {
    res.json(posts);
  });
});

// GET a single post
router.get('/*', function(req, res) {
  var id = req.url.replace('/', '');
  Post.findById(id, function(err, posts) {
    res.json(posts);
  });
});

// POST create new post
router.post('/', function(req, res) {
  var newPost = new Post({
    html: ''
  });
  newPost.save(function(err, post) {
    if (err) return err;
    res.json(post);
  });
});

// PUT update existing post
router.put('/*', function(req, res) {
  req.body.dateModified = Date.now();
  Post.findByIdAndUpdate(req.body._id, req.body, function(err, post) {
    if (err) return err;
    res.json(post);
  });
});

// DELETE existing post
router.delete('/*', function(req, res) {
  var id = req.url.replace('/', '');
  Post.findByIdAndRemove(id, function(err) {
    if (err) return err;
    res.status(200).end();
  });
});

module.exports = router;
