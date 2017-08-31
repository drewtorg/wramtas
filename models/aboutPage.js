var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AboutPage = new Schema({
  description: String,
  contactEmail: String,
  boardImage: String,
  page: String
});

module.exports = mongoose.model('AboutPage', AboutPage);
