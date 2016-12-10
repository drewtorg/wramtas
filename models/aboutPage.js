var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AboutPage = new Schema({
  description: String,
  contactEmail: String,
  boardImage: String
});

module.exports = mongoose.model('AboutPage', AboutPage);
