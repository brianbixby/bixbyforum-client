'use strict';
var app = app || {};

(function(module) {
  function Comment(obj) {
    for (var prop in obj) this[prop] = obj[prop];
  }

  module.Comment = Comment;

})(app);