var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Application = new Schema({
  name: String,
  university: String,
  amtaId: String,
  position: String,
  email: String,
  bio: String,
  approved: {
    type: Boolean,
    default: false
  },
  submitted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Application', Application);
