var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Submission = new Schema({
  description: String,
  prompts: {
    description: {
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
    applications: [{
      name: String,
      amtaId: String,
      email: String,
      submissionPaths: [String]
    }]
  }
});

module.exports = mongoose.model('Submission', Submission);
