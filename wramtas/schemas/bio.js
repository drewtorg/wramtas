// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a dynamic schema
var bioSchema = new Schema({
  name: String,
  title: String,
  about: String,
  image: String,
  email: String
});

// make this available to our users in our Node applications
module.exports = bioSchema;
