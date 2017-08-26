var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VideoPage = new Schema({
  preHtml: String,
  html: String,
  url: String,
  dates: {
    openDate: {
      type: Date,
      default: Date.now()
    },
    closeDate: {
      type: Date,
      default: Date.now()
    }
  },
  survey: [{
    question: String,
    // potential inputTypes:
    //  text: single-line text input
    //  textarea: multi-line text input
    //  radio: radio buttons
    //  checkbox: checkboxes
    //  select: dropdown box
    inputType: String,
    validOptions: [String],
    responses: [String],
    tallies: [Number]
  }],
  ipAddresses: [String],
  page: String
});

module.exports = mongoose.model('VideoPage', VideoPage);
