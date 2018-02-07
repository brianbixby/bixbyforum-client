'use strict';
var app = app || {};

(function(module) {
  function Subforum(obj) {
    for (var prop in obj) this[prop] = obj[prop];
  }

  module.Subforum = Subforum;

})(app);