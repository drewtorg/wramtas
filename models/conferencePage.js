var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConferencePage = new Schema({
  html: String,
  pdfUrl: String
});

module.exports = mongoose.model('ConferencePage', ConferencePage);
