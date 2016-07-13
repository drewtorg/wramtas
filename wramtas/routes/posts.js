var express = require('express');
var mongoose = require('mongoose');
var postSchema = require('../schemas/post');

var router = express.Router();

var getIdFromRequest = function(req) {
  return req.url.split('?')[0].replace('/', '');
}

// GET all posts
// sort must happen on the server side in order to not mess with the $index and filtering nonsense
// alternative would be to do a total refresh on delete
router.get('/', function(req, res) {
  var Post = mongoose.model(req.query.page + '_post', postSchema);
  Post.find().sort('-datePosted').find(function(err, posts) {
    if (err) res.status(200).end();
    res.json(posts);
  });
});

// GET a single post
router.get('/*', function(req, res) {
  var id = getIdFromRequest(req);
  var Post = mongoose.model(req.query.page + '_post', postSchema);
  Post.findById(id, function(err, posts) {
    res.json(posts);
  });
});

// POST create new post
router.post('/', function(req, res) {
  var Post = mongoose.model(req.query.page + '_post', postSchema);
  var newPost = new Post({
    html: '',
    datePosted: Date.now(),
    dateModified: Date.now()
  });
  newPost.save(function(err, post) {
    if (err) {
      return err;
    }
    res.json(post);
  });
});

// PUT update existing post
router.put('/*', function(req, res) {
  req.body.dateModified = Date.now();
  var Post = mongoose.model(req.query.page + '_post', postSchema);
  Post.findByIdAndUpdate(req.body._id, req.body, {
    new: true
  }, function(err, post) {
    if (err) return err;
    res.json(post);
  });
});

// DELETE existing post
router.delete('/*', function(req, res) {
  var id = getIdFromRequest(req);
  var Post = mongoose.model(req.query.page + '_post', postSchema);
  Post.findByIdAndRemove(id, function(err) {
    if (err) return err;
    res.status(200).end();
  });
});

module.exports = router;
