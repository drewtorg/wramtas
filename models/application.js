var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Application = new Schema({
  name: String,
  revision: Number,
  approved: Boolean,
  university: String,
  amtaId: String,
  position: String,
  email: String,
  resume: String,
  video: String,
  bio: String
});

module.exports = mongoose.model('Application', Application);
