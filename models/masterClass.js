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
    //  single-line text input
    //  multi-line text input
    //  radio buttons
    //  checkboxes
    //  dropdown
    inputType: String,
    validResponses: [String],
    responses: [String]
  }]
});

module.exports = mongoose.model('MasterClass', MasterClass);
