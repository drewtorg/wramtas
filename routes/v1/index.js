var express = require('express');
var changeCase = require('change-case');
var fs = require('fs');
var router = express.Router();

var routePath = './routes/v1/';
fs.readdirSync(routePath).forEach(function(file) {
  var name = file.split('.js')[0];
  if (name !== 'index') {
    router.use('/' + changeCase.paramCase(name), require('./' + name)); // eslint-disable-line global-require
  }
});

module.exports = router;