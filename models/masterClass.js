var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MasterClass = new Schema({
  html: String,
  openDate: {
    type: Date,
    default: Date.now()
  },
  closeDate: {
    type: Date,
    default: Date.now()
  },
  survey: [{
    question: String,
    // potential inputTypes:
    //  text input
    //  radio buttons
    //  checkboxes
    //  dropdown
    inputType: String,
    validAnswers: [String]
  }]
});

module.exports = mongoose.model('MasterClass', MasterClass);
