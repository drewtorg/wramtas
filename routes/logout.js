var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  req.logout();
  res.sendStatus(200);
});

module.exports = router;