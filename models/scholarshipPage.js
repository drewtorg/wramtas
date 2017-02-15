var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ScholarshipPage = new Schema({
  html: String
});

module.exports = mongoose.model('ScholarshipPage', ScholarshipPage);
