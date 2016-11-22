var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Scholarship = new Schema({
  prompt: {
    type: String,
    default: ''
  },
  uploads: [String]
});

module.exports = mongoose.model('Scholarship', Scholarship);
