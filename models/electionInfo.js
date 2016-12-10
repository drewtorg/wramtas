var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ElectionInfo = new Schema({
  html: String
});

module.exports = mongoose.model('ElectionInfo', ElectionInfo);
