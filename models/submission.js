var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Submission = new Schema({
  description: String,
  page: String,
  prompts: [{
    description: {
      type: String,
      default: ''
    },
    fields: [{
      label: String,
      inputType: String,
      validOptions: [String]
    }],
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
    applications: [Schema.Types.Mixed]
  }]
});

module.exports = mongoose.model('Submission', Submission);
