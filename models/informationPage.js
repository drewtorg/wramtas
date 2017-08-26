var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InformationPage = new Schema({
  html: String,
  pdfUrl: String,
  page: String
});

module.exports = mongoose.model('InformationPage', InformationPage);
