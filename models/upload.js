var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Upload = new Schema({
  path: String,
  filename: String
});

module.exports = mongoose.model('Upload', Upload);
