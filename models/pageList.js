var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// TRICKY: work around for recursive structure
var Page = new Schema();
Page.add({
  title: String,
  // Valid Page Types:
  //    about
  //    blog
  //    election
  //    information
  //    placeholder
  //    submission
  //    video
  pageType: String,
  href: String,
  subtabs: [Page]
});

var PageList = new Schema({
  pages: [Page]
});

module.exports = mongoose.model('PageList', PageList);
