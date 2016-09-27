var express = require('express');
var mongoose = require('mongoose');
var Application = require('../models/application');

var router = express.Router();

// GET a single application
router.get('/:_id', function(req, res) {});

// PUT update an existing application
router.put('/:_id', function(req, res) {});

module.exports = router;
