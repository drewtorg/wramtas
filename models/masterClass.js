var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MasterClass = new Schema({
  html: String,
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
  }]
});

module.exports = mongoose.model('MasterClass', MasterClass);
