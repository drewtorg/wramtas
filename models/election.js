var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Election = new Schema({
  startDate: Date,
  endDate: Date
});

module.exports = mongoose.model('Election', Election);
