var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Upload = new Schema({
  url: String,
  filename: String,
  mimetype: String,
  size: Number
});

module.exports = mongoose.model('Upload', Upload);
