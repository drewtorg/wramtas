var express = require('express');
// var ConferencePage = require('../models/conferencePage');

var router = express.Router();

// GET the conference information
// router.get('/', function(req, res) {
//   ConferencePage.findOne({}, function(err, doc) {
//     res.json(doc);
//   });
// });

// // POST upsert the conference information
// router.post('/', function(req, res) {
//   ConferencePage.findOneAndUpdate({}, req.body, {
//       upsert: true,
//       new: true
//     },
//     function(err, doc) {
//       return res.json(doc);
//     });
// });

module.exports = router;
