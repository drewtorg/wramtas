// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a dynamic schema
var postSchema = new Schema({
  html: String,
  pdfUrl: String,
  datePosted: Date,
  dateModified: Date
});

// make this available to our users in our Node applications
module.exports = postSchema;
