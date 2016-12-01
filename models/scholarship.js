var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Scholarship = new Schema({
  prompt: {
    type: String,
    default: ''
  },
  submissions: [{
    name: String,
    amtaId: String,
    submissionPaths: [String]
  }]
});

module.exports = mongoose.model('Scholarship', Scholarship);
