var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Scholarship = new Schema({
  prompt: {
    type: String,
    default: ''
  },
  openDate: {
    type: Date,
    default: Date.now()
  },
  closeDate: {
    type: Date,
    default: Date.now()
  },
  submissions: [{
    name: String,
    amtaId: String,
    email: String,
    submissionPaths: [String]
  }]
});

module.exports = mongoose.model('Scholarship', Scholarship);
