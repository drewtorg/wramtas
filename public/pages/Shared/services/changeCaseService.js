app.service('changeCaseService', function() {
  this.toTitleCase = function(str) {
    return str.replace(/-/g, ' ').toLowerCase().split(' ')
      .map(function(word) {
        return word.replace(word[0], word[0].toUpperCase());
      }).join(' ');
  };

  this.toKebabCase = function(str) {
    return str.toLowerCase().split(' ').join('-');
  };
});
