'use strict';
var app = app || {};

// local
const __API_URL__ = 'http://localhost:3737';
// staging
// const __API_URL__ = 'https://bixbyforum-server-staging.herokuapp.com';
// production
// const __API_URL__ = 'https://bixbyforum-server.herokuapp.com';

(function(module) {
  let currentUserId = localStorage.currentUserId || '';
  let currentUserName = localStorage.currentUserName || '';
  let currentUserPicture = localStorage.currentUserPicture || '';

  function User(obj) {
    for (var prop in obj) obj[prop] ? this[prop] = obj[prop] : this[prop] = null;
  }

  User.prototype.insert = function() {
    $.ajax({
      url: `${__API_URL__}/api/db/users`,
      method: 'POST',
      data: {username: this.username},
      success: results => {
        if (results.length){
          $('#sign-up-moodal').toggleClass('is-visible');
          $('#newUserForm').toggleClass('hidden');
          $('#username-errormsg-and-suggestions').addClass('hidden');
          $('#login-username-errormsg').addClass('hidden');
          localStorage.currentUserId = results[0].id;
          localStorage.currentUserName = results[0].user_name;
          localStorage.currentUserPicture = results[0].profile_picture;
          $('.loginSignupForms')[0].reset();
          if(localStorage.currentUserId) {
            $('.notLoggedIn').addClass('hidden');
            $('#loggedInUser').attr('href', `/user/${localStorage.currentUserName}`).text(`${localStorage.currentUserName}'s Profile`);
            $('.loggedIn').removeClass('hidden');
            localStorage.currentUserPicture ? $('.userContainer').removeClass('hidden') : $('.userContainer').addClass('hidden');
          }
        }
      },
      error: err => {
        User.prototype.suggestNames(this.username, err.responseJSON);
      }
    })
  };

  User.prototype.suggestNames = (unavailableName, unavailableNames) => {
    let nameSuggestions = [];
    let multiplier = 10
    while(nameSuggestions.length < 3) {
      let nameSuggestion = unavailableName + Math.floor(Math.random() * multiplier).toString();
      if(unavailableNames.indexOf(nameSuggestion) < 0 && nameSuggestions.indexOf(nameSuggestion) < 0) {
        nameSuggestions.push(nameSuggestion);
      }
      else {
        multiplier = multiplier*10;
      }
    }
    $('#username-suggestions a:eq(0)').text(nameSuggestions[0]);
    $('#username-suggestions a:eq(1)').text(nameSuggestions[1]);
    $('#username-suggestions a:eq(2)').text(nameSuggestions[2]);
    $('#username-errormsg-and-suggestions').removeClass('hidden');
    $('#username-suggestions a').on('click', function(e) {
      e.preventDefault();
      let user = new app.User({
        username: $(this).text(),
      });
      user.insert();
    })
  }

  User.prototype.login = function() {
    $.ajax({
      url: `${__API_URL__}/api/db/users/${this.username}`,
      method: 'GET',
      success: results => {
        if (results.length){
          $('#sign-up-moodal').toggleClass('is-visible');
          $('#userLoginForm').toggleClass('hidden');
          $('#login-username-errormsg').addClass('hidden');
          localStorage.currentUserId = results[0].id;
          localStorage.currentUserName = results[0].user_name;
          localStorage.currentUserPicture = results[0].profile_picture;
          $('#userLoginForm')[0].reset();
          if(localStorage.currentUserId) {
            $('.notLoggedIn').addClass('hidden');
            $('#loggedInUser').attr('href', `/user/${localStorage.currentUserName}`).text(`${localStorage.currentUserName}'s Profile`);
            $('.loggedIn').removeClass('hidden');
            localStorage.currentUserPicture ? $('.userContainer').removeClass('hidden') : $('.userContainer').addClass('hidden');
          }
        }
      },
      error: err => {
        if(err.responseText === 'User does not exist') {
          $('#login-username-suggestion a').text(this.username);
          $('#login-username-errormsg').removeClass('hidden');
          $('#login-username-suggestion a').on('click', function(e) {
            e.preventDefault();
            let user = new app.User({
              username: $(this).text(),
            });
            user.insert();
          })
        }
        else {
          errorView.init(err.responseText);
        }
      }
    });
  }




  module.User = User;
})(app);