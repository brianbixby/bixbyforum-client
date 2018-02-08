'use strict';

(function(module) {
  const pageView = {};

  pageView.init = function(ctx, next) {
    $('.view').find('*').off();
    $('.removeEventListeners').off();
    $('.signUpLoginButtons').on('click', function(e) {
      e.preventDefault();
      $(`#${$(this).data('modal')}`).toggleClass('is-visible');
      $('.modal-close').toggleClass('hidden');
      $(`#${$(this).data('form')}`).toggleClass('hidden').on('submit', eval($(this).data('submit')));
    });
    next();
  }

  pageView.newUserSubmit = e => {
    e.preventDefault();
    let user = new app.User({
        username: $('#usernameSignup').val(),
    });
    console.log('new user view submit', user);
    user.insert();
  }

  pageView.userLogin = e => {
    e.preventDefault();
    let user = new app.User({
      username:  $('#usernameLogin').val(),
    });
    console.log(user);
    user.login();
  }

  module.pageView = pageView;
})(app);