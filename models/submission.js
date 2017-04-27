var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Submission = new Schema({
  description: String,
  type: String,
  prompts: [{
    description: {
      type: String,
      default: ''
    },
    dates: {
      openDate: {
        type: Date,
        default: Date.now()
      },
      closeDate: {
        type: Date,
        default: Date.now()
      },
    },
    applications: [{
      name: String,
      amtaId: String,
      email: String,
      uploadPaths: [String]
    }]
  }]
});

module.exports = mongoose.model('Submission', Submission);
