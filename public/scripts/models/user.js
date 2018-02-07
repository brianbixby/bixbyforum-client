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
    // console.log('user. prototype.insert');
    $.ajax({
      url: `${__API_URL__}/api/db/users`,
      method: 'POST',
      data: {username: this.username},
      success: results => {
        // console.log(this.username);
        // console.log(results);
        if (results.length){
          // console.log('success');
          $('#sign-up-moodal').toggleClass('is-visible');
          localStorage.currentUserId = results[0].id;
          localStorage.currentUserName = results[0].user_name;
          localStorage.currentUserPicture = results[0].profile_picture;
          if(localStorage.currentUserId) {
            $('.notLoggedIn').addClass('hidden');
            $('#loggedInUser').attr('href', `/user/${localStorage.currentUserName}`).text(`${localStorage.currentUserName}'s Profile`);
            $('.loggedIn').removeClass('hidden');
            localStorage.currentUserPicture ? $('.userContainer').removeClass('hidden') : $('.userContainer').addClass('hidden');
          }
        }
      },
      error: err => {
        // console.log(err);
        // console.log(err.responseJSON);
        User.prototype.suggestNames(this.username, err.responseJSON);
      }
    })
  };

  User.prototype.suggestNames = (unavailableName, unavailableNames) => {
    // console.log(unavailableName, unavailableNames);
    let nameSuggestions = [];
    let multiplier = 10
    while(nameSuggestions.length < 3) {
      let nameSuggestion = unavailableName + Math.floor(Math.random() * multiplier).toString();
      if(unavailableNames.indexOf(nameSuggestion) < 0 && nameSuggestions.indexOf(nameSuggestion) < 0) {
        // console.log(nameSuggestion);
        nameSuggestions.push(nameSuggestion);
      }
      else {
        multiplier = multiplier*10;
        // console.log(nameSuggestion);
      }
    }
    // console.log(nameSuggestions);
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




  module.User = User;
})(app);