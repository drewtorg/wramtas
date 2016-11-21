var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Election = new Schema({
  nominationStartDate: Date,
  nominationEndDate: Date,
  votingStartDate: Date,
  votingEndDate: Date
});

module.exports = mongoose.model('Election', Election);
