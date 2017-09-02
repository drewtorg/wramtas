var express = require('express');
var VideoPage = require('../../../models/videoPage');

var router = express.Router();

var getPageFromRequest = function(req) {
  return req.baseUrl.split('/')[4].replace(/%20/g, ' ');
};

// POST count a new ip address
router.post('/', function(req, res) {
  var page = getPageFromRequest(req);
  VideoPage.findOne({
    page: page
  }, function(err, videoPage) {
    if (err) res.status(500).end();
    else {
      var ipAddresses = videoPage.ipAddresses;
      var ipAddr = req.connection.remoteAddress;
      if (!ipAddresses) ipAddresses = [];
      var hasIp = ipAddresses.find(function(ip) {
        return ip === ipAddr;
      });
      if (!hasIp) ipAddresses.push(ipAddr);
      videoPage.ipAddresses = ipAddresses;
      VideoPage.findOneAndUpdate({
        page: req.params.page
      }, videoPage, function(err, doc) {
        if (err) res.status(500).end();
        else res.json(doc);
      });
    }
  });
});

// POST clear all ip addresses
router.post('/clear', function(req, res) {
  var page = getPageFromRequest(req);
  VideoPage.findOne({
    page: page
  }, function(err, videoPage) {
    if (err) res.status(500).end();
    else {
      videoPage.ipAddresses = [];
      VideoPage.findOneAndUpdate({
        page: page
      }, videoPage, function(err, doc) {
        if (err) res.status(500).end();
        else res.json(doc);
      });
    }
  });
});

module.exports = router;
