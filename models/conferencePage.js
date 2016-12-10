var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConferencePage = new Schema({
  html: String
});

module.exports = mongoose.model('ConferencePage', ConferencePage);
