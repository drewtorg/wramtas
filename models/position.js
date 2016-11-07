var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Position = new Schema({
  name: String
});

module.exports = mongoose.model('Position', Position);
