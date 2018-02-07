'use strict';
var app = app || {};

(function(module) {
  function Forum(obj) {
    for (var prop in obj) this[prop] = obj[prop];
  }

  module.Forum = Forum;

})(app);