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

    // handlebars template for user profile
    User.prototype.toHtml = function() {
      var template = Handlebars.compile($('#user-profile-template').text());
      return template(this);
    }

    //3rd - updates edit profile form
    User.updateProfileTemplate = (ctx, next) => {
      $('#editUserProfile-user_name').val(ctx.currentUser[0].user_name);
      $('#editUserProfile-email').val(ctx.currentUser[0].email);
      $('#editUserProfile-first_name').val(ctx.currentUser[0].first_name);
      $('#editUserProfile-last_name').val(ctx.currentUser[0].last_name);
      $('#editUserProfile-profile_picture').val(ctx.currentUser[0].profile_picture);
      $('#editUserProfile-interests').val(ctx.currentUser[0].interests);
    }
  
    // 3rd - maps user from constructor to tamplate and appends it to html
    User.renderCurrent = (ctx, next) => {
        $('#userProfile').empty();
        ctx.currentUser.map(user => $('#userProfile').append(user.toHtml()));
        $('#editProfileButton').on('click', (e) => {
          e.preventDefault();
          page.show(`/user/${ctx.params.username}/edit`);
        });  
    }
  
    // 2ND - takes the individual result and maps it to  the new User constructor
    User.loadCurrent = (ctx, next) => {
        ctx.currentUser = ctx.results.map(userObject => new User(userObject));
        next();
    }
    // 1st - user api call
    User.prototype.fetch = (ctx, next) => {
      $.get(`${__API_URL__}/api/db/users/${ctx.params.username}`)
        .then(results => {
          ctx.results = results;
          console.log(ctx.results);
          next();
        });
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
          $('.login-username-errormsg').addClass('hidden');
          localStorage.currentUserId = results[0].id;
          localStorage.currentUserName = results[0].user_name;
          localStorage.currentUserPicture = results[0].profile_picture;
          $('.loginSignupForms')[0].reset();
          if($('#hamburgerToggle').css('display')=='block') {
            $('.flipping').toggleClass('flip');
            $('.hamburger').toggleClass('open');
            $('#hamburgerToggle').slideToggle(500);
            $('nav').toggleClass('darkNav');
            $('.userContainer').toggleClass('slideOut');
        }
          if(localStorage.currentUserId) {
            $('.notLoggedIn').addClass('hidden');
            $('#loggedInUser').attr('href', `/user/${localStorage.currentUserName}`).text(`${localStorage.currentUserName}'s Profile`);
            $('.loggedIn').removeClass('hidden');
            localStorage.currentUserPicture !== 'null' ? $('.userContainer').removeClass('hidden') : $('.userContainer').addClass('hidden');
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
          $('.login-username-errormsg').addClass('hidden');
          localStorage.currentUserId = results[0].id;
          localStorage.currentUserName = results[0].user_name;
          localStorage.currentUserPicture = results[0].profile_picture;
          $('#userLoginForm')[0].reset();
          if($('#hamburgerToggle').css('display')=='block') {
            $('.flipping').toggleClass('flip');
            $('.hamburger').toggleClass('open');
            $('#hamburgerToggle').slideToggle(500);
            $('nav').toggleClass('darkNav');
            $('.userContainer').toggleClass('slideOut');
        }
          if(localStorage.currentUserId) {
            $('.notLoggedIn').addClass('hidden');
            $('#loggedInUser').attr('href', `/user/${localStorage.currentUserName}`).text(`${localStorage.currentUserName}'s Profile`);
            $('.loggedIn').removeClass('hidden');
            localStorage.currentUserPicture !== 'null' ? $('.userContainer').removeClass('hidden') : $('.userContainer').addClass('hidden');
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

  User.prototype.delete = function() {
    $.ajax({
      url: `${__API_URL__}/api/db/users/${currentUserName}`,
      method: 'DELETE',
      success: () => {
        localStorage.clear();
        page.show('/');
      }
      //error: app.errorView.init,
    })
}

  User.currentUserCheck = function(ctx, next) {
    if(localStorage.currentUserId) {
      $('.notLoggedIn').addClass('hidden');
      $('#loggedInUser').text(`${localStorage.currentUserName}'s Profile`).on('click', (e) => {
        e.preventDefault();
        page.show(`/user/${localStorage.currentUserName}`);
      });  
      $('#navatarImageLink').on('click', (e) => {
        e.preventDefault();
        page.show(`/user/${localStorage.currentUserName}`);
      });
      $('.loggedIn').removeClass('hidden');
      $('#logoutButton').on('click', (e) => {
        e.preventDefault();
        currentUserId = null;
        currentUserName = null;
        currentUserPicture = 'null';
        localStorage.clear();
        page.show('/');
      });  
      if(localStorage.currentUserPicture !== 'null') {
        $('.userContainer').removeClass('hidden');
        $('#navatarImage').attr('src', localStorage.currentUserPicture);
      }
      else {
        $('.userContainer').addClass('hidden');
      }
    }
    else {
      $('.notLoggedIn').removeClass('hidden');
      $('.loggedIn').addClass('hidden');
    }
    next();
  }




  module.User = User;
})(app);