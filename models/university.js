var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var University = new Schema({
  name: String,
  link: String
});

module.exports = mongoose.model('University', University);
