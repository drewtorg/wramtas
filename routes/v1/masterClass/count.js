var express = require('express');
var MasterClass = require('../../../models/masterClass');

var router = express.Router();

// POST count a new ip address
router.post('/', function(req, res) {
  MasterClass.findOne({}, function(err, masterClass) {
    var ipAddresses = masterClass.ipAddresses;
    var ipAddr = req.connection.remoteAddress;
    if (!ipAddresses) ipAddresses = [];
    var hasIp = ipAddresses.find(function(ip) {
      return ip === ipAddr;
    });
    if (!hasIp) ipAddresses.push(ipAddr);
    masterClass.ipAddresses = ipAddresses;
    MasterClass.findOneAndUpdate({}, masterClass, function(err, doc) {
      if (err) res.status(500).end();
      res.json(doc);
    });
  });
});

// POST clear all ip addresses
router.post('/clear', function(req, res) {
  MasterClass.findOne({}, function(err, masterClass) {
    masterClass.ipAddresses = [];
    MasterClass.findOneAndUpdate({}, masterClass, function(err, doc) {
      if (err) res.status(500).end();
      res.json(doc);
    });
  });
});

module.exports = router;
