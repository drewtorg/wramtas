var express = require('express');
var mongoose = require('mongoose');

var Post = require('../models/post');

var router = express.Router();

/* GET posts listing. */
router.get('/', function (req, res) {
    Post.find({}, function(err, posts){
        res.send(JSON.stringify(posts));
        console.log(posts);
    });
});

// var Post = require('./models/post');
// var test = new Post({
//     html: '<h1>Sup</h1><p>This works?</p>',
//     datePosted: Date.now(),
//     dateModified: Date.now()
// });
// test.save(function(err){
//     if (err) throw err;
//
//     console.log('Post saved successfully');
// })

module.exports = router;
