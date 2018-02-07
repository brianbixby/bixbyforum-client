'use strict';

(function(module) {
  const pageView = {};

  pageView.init = function(ctx, next) {
    $('.view').addClass('hidden').find('*').off();
    $('#signup').off();
    $('#newUserForm').off();
    $('#signup').on('click', function(e) {
      e.preventDefault();
      $('#sign-up-moodal').toggleClass('is-visible');
      $('#newUserForm').on('submit', app.pageView.newUserSubmit);
    });
    next();
  }

  pageView.newUserSubmit = e => {
    e.preventDefault();
    let user = new app.User({
        username: $('#username').val(),
    });
    console.log('new user view submit', user);
    user.insert();
  }

  module.pageView = pageView;
})(app);