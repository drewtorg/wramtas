var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Application = new Schema({
  name: String,
  university: String,
  amtaId: String,
  position: String,
  email: String,
  resume: String,
  video: String,
  bio: String,
  approved: Boolean,
  submitted: Boolean
});

module.exports = mongoose.model('Application', Application);
