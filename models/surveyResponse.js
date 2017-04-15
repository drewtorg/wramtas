var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SurveyResponse = new Schema({
  responses: [{
    question: String,
    inputType: String,
    answers: [String]
}]});

module.exports = mongoose.model('SurveyResponse', SurveyResponse);
