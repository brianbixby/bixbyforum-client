'use strict';
var app = app || {};

// local
const __API_URL__ = 'http://localhost:3737';
// staging
// const __API_URL__ = 'https://bixbyforum-server-staging.herokuapp.com';
// production
// const __API_URL__ = 'https://bixbyforum-server.herokuapp.com';

(function(module) {
  // const user = {};

  let currentUserId = localStorage.currentUserId || '';
  let currentUserName = localStorage.currentUserName || '';
  let currentUserNavatar = localStorage.currentUserNavatar || '';

  function User(obj) {
    for (var prop in obj) obj[prop] ? this[prop] = obj[prop] : this[prop] = null;
  }

  module.User = User;
})(app);