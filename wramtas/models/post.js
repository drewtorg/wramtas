// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var postSchema = new Schema({
  html: String,
  datePosted: Date,
  dateModified: Date
});

// the schema is useless so far
// we need to create a model using it
var post = mongoose.model('post', postSchema);

// make this available to our users in our Node applications
module.exports = post;
