app.service('dateService', function() {

  /* UI Date Format - used for the datepicker control
     dates:
     {
       date1:
       {
         opened: false,
         date: 213123123
       },
       ...
     }
  */
  this.newUIDates = function(dateNames) {
    var output = {};
    dateNames.forEach(function(name) {
      output[name] = {
        date: Date.now(),
        opened: false
      };
    });
    return output;
  };

  this.toUIDateFormat = function(dates) {
    var output = {};
    for (var prop in dates) {
      if (prop[0] !== '_' && Object.prototype.hasOwnProperty.call(dates, prop)) {
        output[prop] = {
          date: new Date(dates[prop]).getTime(),
          opened: false
        };
      }
    }
    return output;
  };

  /* Backend Date Format: - used for storing in the DB
     dates:
     {
       date1: 213123123,
       ...
     }
  */
  this.toBackendDateFormat = function(dates) {
    var output = {};
    for (var prop in dates) {
      if (prop[0] !== '_' && Object.prototype.hasOwnProperty.call(dates, prop)) {
        output[prop] = dates[prop].date;
      }
    }
    return output;
  };

  this.toggleOpened = function(date) {
    date.opened = !date.opened;
  };
});
