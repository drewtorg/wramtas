var express = require('express');
var VideoPage = require('../../../models/videoPage');

var router = express.Router();

// POST count a new ip address
router.post('/', function(req, res) {
  VideoPage.findOne({
    page: req.params.pages
  }, function(err, videoPage) {
    var ipAddresses = videoPage.ipAddresses;
    var ipAddr = req.connection.remoteAddress;
    if (!ipAddresses) ipAddresses = [];
    var hasIp = ipAddresses.find(function(ip) {
      return ip === ipAddr;
    });
    if (!hasIp) ipAddresses.push(ipAddr);
    videoPage.ipAddresses = ipAddresses;
    VideoPage.findOneAndUpdate({}, videoPage, function(err, doc) {
      if (err) res.status(500).end();
      res.json(doc);
    });
  });
});

// POST clear all ip addresses
router.post('/clear', function(req, res) {
  VideoPage.findOne({
    page: req.params.page
  }, function(err, videoPage) {
    videoPage.ipAddresses = [];
    VideoPage.findOneAndUpdate({}, videoPage, function(err, doc) {
      if (err) res.status(500).end();
      res.json(doc);
    });
  });
});

module.exports = router;
