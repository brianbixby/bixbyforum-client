'use strict';
var app = app || {};

(function(module) {
  function Thread(obj) {
    for (var prop in obj) this[prop] = obj[prop];
  }

  module.Thread = Thread;

})(app);